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
import { Chain, EncryptedData } from "@/types";

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
  const latestBlockhash = await litClient.getLatestBlockhash();
  const authNeededCallback = async (params: any): Promise<any> => {
    const siweMessage = await createSiweMessageWithRecaps({
      uri: params.uri,
      expiration: params.expiration,
      resources: params.resourceAbilityRequests,
      walletAddress: wallet.address,
      nonce: latestBlockhash,
      litNodeClient: litClient,
    });

    return await generateAuthSig({
      signer: wallet,
      toSign: siweMessage,
    });
  };

  const litResource = new LitAccessControlConditionResource("*");
  const sessionSigs = await litClient.getSessionSigs({
    chain,
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
      chain,
    },
    litClient
  );
};
