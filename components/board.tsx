import Image from "next/image";
import { Card } from "./card";
import { Balance } from "./balance";
import { useEffect, useState } from "react";

import { useEnsName } from "wagmi";

interface RowProps {
  address: `0x{string}`;
  balance: number;
  isUser: boolean;
}

const Row: React.FC<RowProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  address,
  balance,
  isUser,
}) => {
  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });

  const displayName =
    ensName ?? `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div
      className={`${className} flex justify-between items-center w-full p-3 rounded-xl bg-white border-solid ${
        isUser ? "border-black border-4" : "border-address-text border-[1px]"
      }`}
    >
      <div>{displayName}</div>
      <Balance balance={balance} />
    </div>
  );
};

interface Member {
  account: `0x{string}`;
  balance: number;
  tokenId: string;
}

interface Props {
  address?: `0x${string}`;
  data: Member[];
}

export const Board: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  address,
  data,
}) => {
  return (
    <Card className={`${className} my-0 mx-auto `}>
      <div className="flex flex-col space-y-4 items-start justify-center h-full">
        <h1 className="w-full text-center font-bold text-2xl">
          Governance Board
        </h1>
        <div className="flex flex-col space-y-2 items-center justify-center w-full min-h-full">
          {data?.map((row, i) => (
            <Row
              key={i}
              address={row.account}
              balance={row.balance}
              isUser={row.account === address}
            />
          ))}
        </div>
      </div>
      <a href="https://demo.snapshot.org/#/ilovebeadz.eth">
        <div className="bottom-10 mx-auto left-[50%] translate-x-[-50%] fixed py-3 px-6 bg-black text-white text-xl font-bold rounded-full">
          View Proposals
        </div>
      </a>
    </Card>
  );
};
