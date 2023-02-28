import { Alchemy, Network } from "alchemy-sdk";

export default new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});
