import { Bead } from "./bead";

export const Balance = ({ balance }: { balance: number }) => {
  return (
    <div className="flex justify-center items-center space-x-1 bg-white/[0.5] px-2 py-2 rounded-lg font-bold">
      <div>{balance}</div>
      <Bead />
    </div>
  );
};
