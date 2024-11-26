import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client";
import { DEFAULT_LIT_CONFIG } from "@/config/lit";

export const initializeLitClient = async (): Promise<LitNodeClientNodeJs> => {
  const client = new LitNodeClientNodeJs({
    litNetwork: DEFAULT_LIT_CONFIG.network,
    debug: DEFAULT_LIT_CONFIG.debug,
  });
  await client.connect();
  return client;
};

export const disconnectLitClient = async (
  client: LitNodeClientNodeJs
): Promise<void> => {
  if (client) {
    await client.disconnect();
  }
};
