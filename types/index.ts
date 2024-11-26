import { AccessControlConditions } from "@lit-protocol/types";
import { SUPPORTED_CHAINS } from "@/config/lit";

export type Chain = (typeof SUPPORTED_CHAINS)[number];

export type EncryptedData = {
  ciphertext: string;
  dataToEncryptHash: string;
  accessControlConditions: AccessControlConditions;
};

export type ExtendedAccessControlParams = {
  chain: Chain;
  contractAddress?: string;
  standardContractType?:
    | ""
    | "ERC20"
    | "ERC721"
    | "ERC721MetadataName"
    | "ERC1155"
    | "CASK"
    | "Creaton"
    | "POAP"
    | "timestamp"
    | "MolochDAOv2.1"
    | "ProofOfHumanity"
    | "SIWE"
    | "PKPPermissions"
    | "LitAction";
  method: string;
  parameters: string[];
  comparator: "contains" | "=" | ">" | ">=" | "<" | "<=";
  value: string;
  valueProcessor?: (value: string) => string; // Pour transformer la valeur si nécessaire
};
