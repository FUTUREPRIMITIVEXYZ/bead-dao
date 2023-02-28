import Image from "next/image";
import { Card } from "./card";
import { Balance } from "./balance";

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
  return (
    <div
      className={`${className} flex justify-between items-center w-full p-3 rounded-xl bg-white border-solid ${
        isUser ? "border-black border-4" : "border-address-text border-[1px]"
      }`}
    >
      <div>{name}</div>
      <Balance balance={balance} />
    </div>
  );
};

interface Props {
  address?: `0x${string}`;
}

export const Board: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  address,
}) => {
  const leaderBoard = [
    {
      name: "megaliz.eth",
      balance: 93,
      address: "0x1234",
    },
    {
      name: "gammaray.eth",
      balance: 88,
      address: "0xF897f6250Ea36e3D9b87Bc9728d6e6Bf3136B079",
    },
    {
      name: "0x123...325",
      balance: 47,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 30,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 30,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 15,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 15,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 15,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 15,
      address: "0x1234",
    },
    {
      name: "0x123...325",
      balance: 15,
      address: "0x1234",
    },
  ];

  return (
    <Card className={`${className} my-0 mx-auto `}>
      <div className="flex flex-col space-y-4 items-start justify-center h-full">
        <h1 className="w-full text-center font-bold text-2xl">
          Governance Board
        </h1>
        <div className="flex flex-col space-y-2 items-center justify-center w-full overflow-scroll h-full">
          {leaderBoard.map((row, i) => (
            <Row
              key={i}
              name={row.name}
              balance={row.balance}
              isUser={row.address === address}
            />
          ))}
        </div>
      </div>
      <div className="bottom-10 mx-auto left-[50%] translate-x-[-50%] fixed py-3 px-6 bg-black text-white text-xl font-bold rounded-full">
        View Proposal
      </div>
    </Card>
  );
};
