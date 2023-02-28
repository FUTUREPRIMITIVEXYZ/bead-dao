import Image from "next/image";
import { Card } from "./card";
import WalletIcon from "./walletIcon";
import { OpenSeaIcon } from "./openseaIcon";
import { EtherscanIcon } from "./etherscanIcon";
import { TwitterIcon } from "./twitterIcon";
import { Bead } from "./bead";

const Balance = ({ balance }: { balance: number }) => {
  return (
    <div className="absolute z-50 flex justify-center items-center space-x-1 top-[10px] right-[10px] bg-white/[0.5] px-2 py-2 rounded-lg font-bold">
      <div>{balance}</div>
      <Bead />
    </div>
  );
};

export interface Nft {
  image: string;
  name: string;
  address: string;
  format?: string;
  contract: string;
  tokenId: string;
}

interface Props {
  nft: Nft;
  ownedBy: string;
  balance: number;
}

export const NftViewer: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ className, nft, ownedBy, balance }) => {
  return (
    <Card className={className}>
      <div className="flex flex-col space-y-4 items-start justify-center">
        <Balance balance={balance} />
        {!nft.format ? (
          <Image
            className="bg-contain h-full w-full border-2 border-solid border-black rounded-2xl overflow-hidden"
            height={348}
            width={348}
            alt="beaded lizard image"
            src={"/liz-nft.png"}
          />
        ) : (
          <>
            {nft.format === "mp4" || nft.format === "webm" ? (
              <div className="h-[348px] w-[348px]">
                <video className="object-cover" src={nft.image} autoPlay loop />
              </div>
            ) : (
              <Image
                className="bg-contain h-full w-full border-2 border-solid border-black rounded-2xl overflow-hidden"
                height={348}
                width={348}
                alt="beaded lizard image"
                src={nft.image || "/liz-nft.png"}
              />
            )}
          </>
        )}
        <div className="mb-4 flex items-center space-x-2 justify-start font-bold text-address-color-secondary">
          <WalletIcon height={25} width={24} />
          <span className="whitespace-nowrap">Owned by</span>
          <a href={"/"} className="cursor-pointer">
            {/* {addressToFetch && ( */}
            <span className="rounded-3xl bg-address py-1 px-4 cursor-pointer">
              {ownedBy}
            </span>
            {/* )} */}
          </a>
        </div>
        <h1 className="text-3xl font-bold">{nft.name}</h1>
        {/* <AddressBar
                text={
                  data
                    ? `${data[0].address.slice(0, 4)}...${data[0].address.slice(
                        -4
                      )}`
                    : "no data"
                }
                link={`https://etherscan.io/address/${addressToFetch}`}
              /> */}
        <div className="flex items-center justify-start space-x-4">
          <a
            href={`https://https://testnets.opensea.io/assets/ethereum/${nft.contract}/${nft.tokenId}`}
            target="_blank"
            rel="noreferrer"
          >
            <OpenSeaIcon />
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${nft.contract || ""}`}
            target="_blank"
            rel="noreferrer"
          >
            <EtherscanIcon />
          </a>
        </div>
      </div>
    </Card>
  );
};
