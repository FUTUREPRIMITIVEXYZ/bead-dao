import useSWR from "swr";
import { Alchemy, Network, Contract } from "alchemy-sdk";

type UseTokenboundAccountProps = {
  tokenContract: string;
  tokenId: string;
};

function useTokenBoundAccount({
  tokenContract,
  tokenId,
}: UseTokenboundAccountProps) {
  return useSWR(`/api/account/${tokenContract}/${tokenId}`, (url) =>
    fetch(url).then((res) => res.json())
  );
}

export default useTokenBoundAccount;
