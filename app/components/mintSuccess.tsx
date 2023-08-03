import Image from "next/image";
import { TelegramIcon } from "./telegramIcon";
import Link from "next/link";
import { TwitIconFilled } from "./twitIconFilled";

interface Props {}

export const MintSuccess: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col items-center justify-center space-y-4`}
    >
      <h1 className="font-bold text-2xl text-center w-[260px]">
        {"Welcome to the BEAD DAO!"}
      </h1>
      <Image
        src="/liz-nft.png"
        height={200}
        width={348}
        alt="beaded lizard image"
        objectFit="cover"
      />
      <p className="text-center w-[260px]">
        Collect BEADZ, grow your governance stake and meet fellow lizard people!
      </p>
      <Link href="/">
        <div className="py-3 px-8 my-7 font-bold text-xl text-white bg-black rounded-full cursor-pointer">
          How to Play
        </div>
      </Link>
      <div className="flex justify-center items-center">
        <a
          className="cursor-pointer"
          href="https://t.me/beaddao"
          target="_blank"
          rel="noreferrer"
        >
          <TelegramIcon />
        </a>
        <a
          className="cursor-pointer"
          href="https://twitter.com/ilovebeadz"
          target="_blank"
          rel="noreferrer"
        >
          <TwitIconFilled />
        </a>
      </div>
    </div>
  );
};
