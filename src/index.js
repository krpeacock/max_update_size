import { Actor, HttpAgent } from "@dfinity/agent";
import fetch from "isomorphic-fetch";

// Imports and re-exports candid interface
import { idlFactory } from "./max_size_backend.did.js";
export { idlFactory } from "./max_size_backend.did.js";

// temporary canister id from playground
export const canisterId = "zydb5-siaaa-aaaab-qacba-cai";

export const createActor = (canisterId, options = {}) => {
  const agent =
    options.agent ||
    new HttpAgent({
      ...options.agentOptions,
      host: "https://ic0.app",
      fetch,
      retryTimes: 0,
    });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const max_size_backend = createActor(canisterId);

const test_max_size = async (size) => {
  const blob = new Uint8Array(size);
  const response = await max_size_backend.store(blob);
  console.log(response);
};

// loop through max size from 1kb to 4mb until it fails
const test_max_size_loop = async () => {
  let size = 1024;
  while (true) {
    try {
      await test_max_size(size);
      console.log("Success: " + size);
      size *= 2;
    } catch (e) {
      console.log("Failed: " + size);
      break;
    }
  }
};
// test_max_size_loop();

// mainnet limit is 2096970
test_max_size(2096970); //?
test_max_size(2096971); //?

// local limit is 3669834
// test_max_size(3669834); //?
// test_max_size(3669835); //?
