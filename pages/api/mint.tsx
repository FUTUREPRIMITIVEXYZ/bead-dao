import { NextApiRequest, NextApiResponse } from "next";
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
import { BigNumber, ethers } from "ethers";
import supabase from "../../utils/supabase";
import alchemy from "../../utils/alchemy";

type MintRequest = {
  lizard: string;
  signatureBlockNumber: number;
  lizardSignature: string;
  lizardProof: string[];
  recipient: string;
  recipientToken: string;
};

const mintHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    lizard,
    signatureBlockNumber,
    lizardSignature,
    lizardProof,
    recipient,
  } = req.body as MintRequest;

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
      "function balanceOf(address owner) returns (uint256)",
      "function mint(address lizard, uint256 signatureBlockNumber, bytes lizardSignature, bytes32[] lizardProof, address recipient, uint256 recipientToken)",
    ],
    signer
  );

  const balance = await lizardContract.callStatic.balanceOf(recipient);
  let recipientToken = "0";

  if (balance > 0) {
    const nfts = await alchemy.nft.getNftsForOwner(recipient, {
      contractAddresses: [lizardContract.address],
    });
    const lizard = nfts.ownedNfts[0];
    recipientToken = lizard.tokenId;
  }

  try {
    const tx = await lizardContract.mint(
      lizard,
      signatureBlockNumber,
      lizardSignature,
      lizardProof,
      recipient,
      recipientToken
    );

    return res.json({
      txHash: tx.hash,
      firstLizard: balance === "0",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default mintHandler;
