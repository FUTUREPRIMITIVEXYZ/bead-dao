import { Bead } from "./bead";

export const Balance = ({ balance }: { balance: number }) => {
  return (
    <div className="inline-flex justify-center items-center space-x-1 bg-white/[0.9] px-2 py-2 rounded-lg font-bold">
      <div>{balance}</div>
      <Bead />
    </div>
  );
};
