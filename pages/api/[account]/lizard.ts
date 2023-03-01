import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import supabase from "../../../utils/supabase";
import alchemy from "../../../utils/alchemy";

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

const lizardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { account } = req.query;
  if (!account) {
    return res.status(400).json({ error: "account is required" });
  }

  const accountToFetch = Array.isArray(account) ? account[0] : account;

  const nfts = await alchemy.nft.getNftsForOwner(accountToFetch, {
    contractAddresses: [process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!],
  });

  const lizard = nfts.ownedNfts[0];

  const registry = "0xc49B4a8368B545DECeE584258343bE469E65EAc6";

  const accountRegistry = new ethers.Contract(
    registry,
    ["function account(address, uint256) returns (address)"],
    provider
  );

  const tba = await accountRegistry.callStatic.account(
    ethers.utils.getAddress(lizard.contract.address),
    lizard.tokenId
  );

  console.log(tba);

  const beadz = await alchemy.nft.getNftsForOwner(tba, {
    contractAddresses: [process.env.NEXT_PUBLIC_BEADZ_NFT_ADDRESS!],
  });

  return res.json({ beadCount: beadz.ownedNfts[0].balance });
};

export default lizardHandler;
