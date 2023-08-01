import Image from "next/image";
import Link from "next/link";

interface Props {}

export const How: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  return (
    <div className="max-w-[344px] flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl mb-3">Tap Lizards to Mint!</h1>
      <div className="border-4 border-solid border-black rounded-2xl h-[322px] w-[322px] m-0 overflow-hidden">
        <Image
          alt="how to mint gif."
          height={322}
          width={322}
          objectFit="cover"
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY3ZGRmNTU1YjAxNjM2ODQzY2Y2MzU4YmZhMjEwOGFlYzNhZTE3NCZjdD1z/QtX9VvsqoJ9nNpRVGF/giphy.gif"
        />
        {/* <video
          className="object-cover"
          src="/taplizz.webm"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
        /> */}
      </div>
      <div className="flex flex-col justify-center items-start max-w-[310px] space-y-4 my-4">
        <p>
          Find someone with a bead lizard at ETHDenver and tap your phone on its
          &nbsp;<b>Halo Chip</b>&nbsp; to collect &nbsp;<b>BEAD Tokens!</b>
          &nbsp;
        </p>
      </div>
      <div className="border-4 border-solid border-black rounded-2xl h-[322px] w-[322px] m-0 overflow-hidden">
        <Image
          className="object-cover"
          src="/tap.png"
          alt="chip picture"
          height={1280}
          width={1280}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[322px] space-y-4 my-4">
        <p>
          You can only tap the same Halo Chip &nbsp;<b>once per hour</b>, so get
          social and find new lizard people to collect from!
        </p>
      </div>
      <div className="border-4 border-solid border-black rounded-2xl h-[320px] w-[320px] m-0 overflow-hidden">
        <Image
          className="object-cover"
          src="/haloplace.png"
          alt="chip picture"
          height={1280}
          width={1280}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[322px] space-y-4 my-4">
        <p>
          Make sure you have internet connection to tap. Tap the &nbsp;
          <b>Halo Chip</b>&nbsp; near the top of the phone for the best
          connection. For Android users, turn on NFC in your device settings.
        </p>
      </div>
      <div className="border-4 border-solid border-black rounded-2xl h-[320px] w-[320px] m-0 overflow-hidden">
        <Image
          className="object-cover"
          src="/beaddao.png"
          alt="chip picture"
          height={1280}
          width={1280}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[322px] space-y-4 my-4">
        <p>
          Collect BEADZ to increase your governance in the BEAD DAO! The more
          people you meet, the more impact you can have.
        </p>
      </div>
      <Link href="/governance">
        <div className="rounded-full text-white bg-black font-bold text-xl py-3 px-6 my-4 mx-auto">
          Governance Board
        </div>
      </Link>
      <h1 className="font-bold text-2xl my-3">Win Prizes for BEADZ</h1>
      <div className="border-4 border-solid border-black rounded-2xl h-[320px] w-[320px] m-0 overflow-hidden">
        <Image
          className="object-cover"
          src="/prizes.png"
          alt="chip picture"
          height={1280}
          width={1280}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center items-start max-w-[322px] space-y-4 my-4">
        <p>
          Be the first to collect a certain number of BEADZ to win awesome retro
          prizes!
        </p>
      </div>
    </div>
  );
};
