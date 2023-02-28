import { NextApiRequest, NextApiResponse } from "next";
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
import { ethers } from "ethers";

import LizardForwarder from "../../public/LizardForwarder.json";

type MintRequest = {
  from: string;
  to: string;
  nonce: string;
  data: string;
  signature: string;
};

const mintHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { from, to, nonce, data, signature } = req.body as MintRequest;

  const relayerCredentials = {
    apiKey: process.env.RELAYER_API_KEY!,
    apiSecret: process.env.RELAYER_API_SECRET!,
  };
  const provider = new DefenderRelayProvider(relayerCredentials);
  const signer = new DefenderRelaySigner(relayerCredentials, provider, {
    speed: "fast",
  });

  const forwarder = new ethers.Contract(
    process.env.NEXT_PUBLIC_LIZARD_FORWARDER_ADDRESS!,
    LizardForwarder.abi,
    signer
  );

  console.log(LizardForwarder);

  console.log(from, to, nonce, data, signature);

  try {
    const tx = await forwarder.execute({ from, to, nonce, data }, signature);

    return res.json({
      txHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Bork" });
  }
};

export default mintHandler;
