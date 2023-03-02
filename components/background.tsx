import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Badge } from "./badge";
import Link from "next/link";
import { useAccount } from "wagmi";

import { Button } from "./button";
import { useState } from "react";

interface Props {
  display?: string;
}

export const Background: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, display }) => {
  const [clientAddress, setClientAddress] = useState<string>();
  useAccount({
    onConnect: ({ address }) => setClientAddress(address),
  });

  return (
    <div
      className={`${className} w-full h-[100vh] overflow-scroll bg-main bg-cover bg-center bg-no-repeat`}
      // className={`${className} w-full ${height} bg-main bg-cover bg-center bg-no-repeat`}
    >
      <div
        className={`h-full w-full ${
          display || "flex flex-col items-center justify-start"
        } py-4 pb-20`}
        // className={`h-full w-full flex flex-col items-center ${justifyContent} py-4 pb-20`}
      >
        <div
          className={`w-full flex items-center justify-between px-4 md:px-4`}
        >
          <Badge className="cursor-pointer">
            <Link href="/">
              <div className="font-medium font-xl">beadDAO®</div>
            </Link>
          </Badge>
          <div className="flex flex-row">
            {clientAddress && (
              <Link href={`/account/${clientAddress}`}>
                <Button className="mr-2">
                  <div className="px-2 py-1 whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
                    Your Lizard
                  </div>
                </Button>
              </Link>
            )}
            {!clientAddress && (
              <ConnectButton
                accountStatus="avatar"
                chainStatus="name"
                showBalance={false}
              />
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
