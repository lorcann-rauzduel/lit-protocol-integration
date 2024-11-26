import { Chain, EncryptedData } from "@/types";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
  LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
import { LIT_ABILITY } from "@lit-protocol/constants";
import { decryptToString, encryptString } from "@lit-protocol/encryption";
import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client";
import { AccessControlConditions } from "@lit-protocol/types";
import { Wallet } from "ethers";

export const encrypt = async (
  litClient: LitNodeClientNodeJs,
  message: string,
  accessControlConditions: AccessControlConditions
): Promise<EncryptedData> => {
  if (!litClient) {
    throw new Error("LitNodeClient not initialized");
  }

  const { ciphertext, dataToEncryptHash } = await encryptString(
    {
      accessControlConditions,
      dataToEncrypt: message,
    },
    litClient
  );

  return {
    ciphertext,
    dataToEncryptHash,
    accessControlConditions,
  };
};

export const decrypt = async (
  litClient: LitNodeClientNodeJs,
  encryptedData: EncryptedData,
  chain: Chain,
  wallet: Wallet
): Promise<string> => {
  if (!litClient) {
    throw new Error("LitNodeClient not initialized");
  }

  // Get the latest blockhash
  const latestBlockhash = await litClient.getLatestBlockhash();

  // Define the authNeededCallback function
  const authNeededCallback = async (params: any) => {
    if (!params.uri) {
      throw new Error("uri is required");
    }
    if (!params.expiration) {
      throw new Error("expiration is required");
    }

    if (!params.resourceAbilityRequests) {
      throw new Error("resourceAbilityRequests is required");
    }

    // Create the SIWE message
    const toSign = await createSiweMessageWithRecaps({
      uri: params.uri,
      expiration: params.expiration,
      resources: params.resourceAbilityRequests,
      walletAddress: wallet.address,
      nonce: latestBlockhash,
      litNodeClient: litClient,
    });

    // Generate the authSig
    const authSig = await generateAuthSig({
      signer: wallet,
      toSign,
    });

    return authSig;
  };

  // Define the Lit resource
  const litResource = new LitAccessControlConditionResource("*");

  // Get the session signatures
  const sessionSigs = await litClient.getSessionSigs({
    chain: "ethereum",
    resourceAbilityRequests: [
      {
        resource: litResource,
        ability: LIT_ABILITY.AccessControlConditionDecryption,
      },
    ],
    authNeededCallback,
  });

  return await decryptToString(
    {
      ...encryptedData,
      sessionSigs,
      chain: "ethereum",
    },
    litClient
  );
};
