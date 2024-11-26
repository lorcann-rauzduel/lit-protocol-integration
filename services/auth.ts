import { ethers } from "ethers";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
} from "@lit-protocol/auth-helpers";
import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client";

export const createAuthSignature = async (
  privateKey: string,
  params: any,
  latestBlockhash: string,
  litNodeClient: LitNodeClientNodeJs
) => {
  const wallet = new ethers.Wallet(privateKey);

  const siweMessage = await createSiweMessageWithRecaps({
    uri: params.uri,
    expiration: params.expiration,
    resources: params.resourceAbilityRequests,
    walletAddress: wallet.address,
    nonce: latestBlockhash,
    litNodeClient,
  });

  return await generateAuthSig({
    signer: wallet,
    toSign: siweMessage,
  });
};
