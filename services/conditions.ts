import { AccessControlConditions } from "@lit-protocol/types";
import { parseEther } from "ethers";
import { Chain, ExtendedAccessControlParams } from "@/types";

export const createGenericCondition = (
  params: ExtendedAccessControlParams
): AccessControlConditions => {
  const {
    chain,
    contractAddress = "",
    standardContractType = "",
    method,
    parameters,
    comparator,
    value,
    valueProcessor = (v) => v,
  } = params;

  return [
    {
      contractAddress,
      standardContractType,
      chain,
      method,
      parameters,
      returnValueTest: {
        comparator,
        value: valueProcessor(value),
      },
    },
  ];
};

// Helpers pour créer des conditions spécifiques
export const createBalanceConditions = (
  chain: Chain,
  minBalance: string = "0.006"
): AccessControlConditions => {
  return createGenericCondition({
    chain,
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    comparator: ">=",
    value: minBalance,
    valueProcessor: (value) => parseEther(value).toString(),
  });
};

export const createNFTConditions = (
  chain: Chain,
  contractAddress: string
): AccessControlConditions => {
  if (!contractAddress) {
    throw new Error("Contract address is required for NFT conditions");
  }

  return createGenericCondition({
    chain,
    contractAddress,
    standardContractType: "ERC721",
    method: "balanceOf",
    parameters: [":userAddress"],
    comparator: ">",
    value: "0",
  });
};

export const createTokenConditions = (
  chain: Chain,
  contractAddress: string,
  minBalance: string = "1"
): AccessControlConditions => {
  if (!contractAddress) {
    throw new Error("Contract address is required for token conditions");
  }

  return createGenericCondition({
    chain,
    contractAddress,
    standardContractType: "ERC20",
    method: "balanceOf",
    parameters: [":userAddress"],
    comparator: ">=",
    value: minBalance,
  });
};
