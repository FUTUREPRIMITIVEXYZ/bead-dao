import useSWR from "swr";
import { DirectedGraph } from "graphology";
import { Alchemy, Network, Contract } from "alchemy-sdk";

type UseTokenboundGraphProps = {
  address?: string;
};

function useTokenBoundGraph({ address }: UseTokenboundGraphProps) {
  return useSWR(`${address}/graph`, async () => {
    if (!address) return;

    const alchemy = new Alchemy({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_GOERLI,
    });

    const provider = await alchemy.config.getProvider();

    const accountRegistry = new Contract(
      "0xc49B4a8368B545DECeE584258343bE469E65EAc6",
      ["function account(address, uint256) returns (address)"],
      provider
    );

    const graph = new DirectedGraph();

    const populateGraph = async (address: string) => {
      const tokens = await alchemy.nft.getNftsForOwner(address);

      const promises = [];

      for (const token of tokens.ownedNfts) {
        const account = await accountRegistry.callStatic.account(
          token.contract.address,
          token.tokenId
        );

        graph.mergeNode(address);
        graph.mergeNode(account, {
          tokenContract: token.contract.address,
          tokenId: token.tokenId,
        });
        graph.addEdge(address, account);

        promises.push(populateGraph(account));
      }

      await Promise.all(promises);

      return graph;
    };

    await populateGraph(address);

    return graph;
  });
}

export default useTokenBoundGraph;
