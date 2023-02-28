import { NextApiRequest, NextApiResponse } from "next";
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
import { ethers } from "ethers";

import LizardForwarder from "../../public/LizardForwarder.json";

type MintRequest = {
  lizard: string;
  signatureBlockNumber: number;
  lizardSignature: string;
  lizardProof: string[];
  recipient: string;
};

const mintHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    lizard,
    signatureBlockNumber,
    lizardSignature,
    lizardProof,
    recipient,
  } = req.body as MintRequest;

  console.log(req.body, process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS);

  const relayerCredentials = {
    apiKey: process.env.RELAYER_API_KEY!,
    apiSecret: process.env.RELAYER_API_SECRET!,
  };
  const provider = new DefenderRelayProvider(relayerCredentials);
  const signer = new DefenderRelaySigner(relayerCredentials, provider, {
    speed: "fast",
  });

  const lizardContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
    [
      "function mint(address lizard, uint256 signatureBlockNumber, bytes lizardSignature, bytes32[] lizardProof, address recipient)",
    ],
    signer
  );

  try {
    const tx = await lizardContract.mint(
      lizard,
      signatureBlockNumber,
      lizardSignature,
      lizardProof,
      recipient
    );

    return res.json({
      txHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default mintHandler;
