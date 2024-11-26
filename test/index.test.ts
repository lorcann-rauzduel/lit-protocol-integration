import { createBalanceConditions } from "@/services/conditions";
import { decrypt, encrypt } from "@/services/encryption";
import { disconnectLitClient, initializeLitClient } from "@/services/lit";
import { expect } from "chai";
import { config } from "dotenv";
import { ethers } from "ethers";
config();

describe("Encryption/Decryption Flow", () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error(
      "PRIVATE_KEY is not set. Create a .env file and set the PRIVATE_KEY variable."
    );
  }
  let litClient: any;
  const testMessage = "Your message here";
  const testPrivateKey = process.env.PRIVATE_KEY;

  before(async () => {
    litClient = await initializeLitClient();
  });

  after(async () => {
    if (litClient) {
      await disconnectLitClient(litClient);
    }
  });

  it("should initialize lit client", async () => {
    expect(litClient).to.exist;
  });

  it("should encrypt and decrypt message successfully with valid balance conditions", async () => {
    const wallet = new ethers.Wallet(testPrivateKey);
    const balanceConditions = createBalanceConditions("ethereum", "0.006");
    const encrypted = await encrypt(litClient, testMessage, balanceConditions);
    const decrypted = await decrypt(litClient, encrypted, "ethereum", wallet);
    expect(decrypted).to.equal(testMessage);
  });

  it("should not decrypt message with invalid balance conditions", async () => {
    const wallet = new ethers.Wallet(testPrivateKey);
    const invalidConditions = createBalanceConditions("ethereum", "1");
    const encrypted = await encrypt(litClient, testMessage, invalidConditions);

    try {
      await decrypt(litClient, encrypted, "ethereum", wallet);
      expect.fail("Decryption should have failed");
    } catch (error: any) {
      expect(error).to.exist;
      expect(error.message).to.include(
        "NodeAccessControlConditionsReturnedNotAuthorized"
      );
      expect(error.message).to.include("not permitted to access this content");
    }
  });
});
