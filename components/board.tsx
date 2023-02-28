import Image from "next/image";
import { Card } from "./card";

interface RowProps {
  name: string;
  balance: number;
}

const Row: React.FC<RowProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  name,
  balance,
}) => {
  return (
    <div
      className={`${className} flex justify-between items-center w-full max-w-[286px] p-3 rounded-xl bg-white border-[1px] border-solid border-address-text`}
    >
      <div>{name}</div>
      <div>balance</div>
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
    },
    {
      name: "gammaray.eth",
      balance: 88,
    },
    {
      name: "0x123...325",
      balance: 47,
    },
    {
      name: "0x123...325",
      balance: 30,
    },
    {
      name: "0x123...325",
      balance: 30,
    },
    {
      name: "0x123...325",
      balance: 15,
    },
  ];

  return (
    <Card className={className}>
      <div className="flex flex-col space-y-4 items-start justify-center">
        <h1 className="w-full text-center font-bold text-2xl">
          Lizard Leader Board
        </h1>
        <div>
          {leaderBoard.map((row, i) => (
            <Row key={i} name={row.name} balance={row.balance} />
          ))}
        </div>
      </div>
    </Card>
  );
};
