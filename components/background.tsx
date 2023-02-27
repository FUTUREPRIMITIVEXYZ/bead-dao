import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Badge } from "./badge";

interface Props {
  height?: string;
}

export const Background: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, height = "h-full" }) => {
  return (
    <div className={`w-full ${height} bg-main bg-contain`}>
      <div
        className={`h-full w-full flex flex-col items-center justify-start py-4 pb-20`}
        // className={`h-full w-full flex flex-col items-center ${justifyContent} py-4 pb-20`}
      >
        <div
          className={`w-full flex items-center justify-between px-4 md:px-4`}
        >
          <Badge>bead DAO</Badge>
          <ConnectButton
            accountStatus="avatar"
            chainStatus="name"
            showBalance={false}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
