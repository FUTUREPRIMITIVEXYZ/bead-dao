import useSWR from "swr";
import { Alchemy, Network } from "alchemy-sdk";
import { alchemyProvider } from "wagmi/providers/alchemy";

interface UseOwnerNftParam {
  address?: string;
}

// const contracts = ["0x8ee9a60cb5c0e7db414031856cb9e0f1f05988d1"];

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

function useGetNfts({ address }: UseOwnerNftParam) {
  console.log({ address });
  return useSWR(!address ? null : `${address}/nfts`, async () => {
    const nfts = await alchemy.nft.getNftsForOwner(address as string, {
      // contractAddresses: contracts,
    });

    return nfts.ownedNfts.map((nft) => ({
      name: nft.title,
      image: nft.media[0]?.gateway,
      address: nft.contract.address,
    }));
  });
}

export default useGetNfts;
