import Image from "next/image";
import { Card } from "./card";
import { Balance } from "./balance";
import { useEffect, useState } from "react";
import { fetchEnsName } from "@wagmi/core";

interface RowProps {
  name: string;
  balance: number;
  isUser: boolean;
}

const Row: React.FC<RowProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  name,
  balance,
  isUser,
}) => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    async function getEnsName() {
      if (name) {
        const ensName = await fetchEnsName({
          address: name as `0x${string}`,
        });

        if (ensName) {
          setDisplayName(name);
        } else {
          setDisplayName(`${name.slice(0, 4)}...${name.slice(-4)}`);
        }
      }
    }

    getEnsName();
  }, [name]);

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
  account: string;
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
        <div className="flex flex-col space-y-2 items-center justify-center w-full overflow-scroll h-full">
          {(data || []).map((row, i) => (
            <Row
              key={i}
              name={row.account}
              balance={row.balance}
              isUser={row.account === address}
            />
          ))}
        </div>
      </div>
      <a href="https://demo.snapshot.org/#/ilovebeadz.eth/proposal/0xca2b10ef47bf1589958db8be6eafd7ae936f33b9ae4df7e0eea4387f64be636d">
        <div className="bottom-10 mx-auto left-[50%] translate-x-[-50%] fixed py-3 px-6 bg-black text-white text-xl font-bold rounded-full">
          View Proposal
        </div>
      </a>
    </Card>
  );
};
