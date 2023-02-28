import useSWR from "swr";
import { Alchemy, Network } from "alchemy-sdk";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ethers } from "ethers";

interface UseOwnerNftParam {
  address?: string;
}

const contracts = ["0x945FA980dCAdD72d8f6196c8c9e68226cde5f8B9"];

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});

function useGetNfts({ address }: UseOwnerNftParam) {
  return useSWR(!address ? null : `${address}/nfts`, async () => {
    const nfts = await alchemy.nft.getNftsForOwner(address as string, {
      contractAddresses: contracts,
    });

    return nfts.ownedNfts.map((nft) => {
      return {
        name: nft.title,
        image: nft.media[0]?.gateway,
        address: nft.contract.address,
        format: nft.media[0]?.format || "jpeg",
        tokenId: nft.tokenId,
        contract: nft.contract.address,
      };
    });
  });
}

export default useGetNfts;
