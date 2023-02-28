import Image from "next/image";

interface Props {}

export const How: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  return (
    <div className="max-w-[344px] flex flex-col justify-center items-center">
      <div className="border-4 border-solid border-black rounded-2xl h-[322px] w-[322px] m-0 overflow-hidden">
        <Image
          alt="how to mint gif."
          height={322}
          width={322}
          objectFit="cover"
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTlmM2VjMDY5NGMzYjI0M2NhOTRkZjIwNTE5MzZhNzg0M2I4YzRkMCZjdD1n/eXGdPytWhNARxFCXrD/giphy.gif"
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
      <div className="flex flex-col justify-center items-start max-w-[322px] space-y-4 my-4">
        <h1 className="font-bold text-2xl">Tap Lizards to Mint!</h1>
        <p>
          Find someone with a bead lizard at ETHDenver and tap your phone on its
          Halo Chip to collect Bead Lizard NFTs! You can only tap the same
          <span className="font-bold mx-1">Halo Chip</span> once per hour, so
          get social and find new lizard people to collect from!
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
        <h1 className="font-bold text-2xl">
          Halo Chips are attached to physical bead lizards
        </h1>
        <p>
          {
            "If you don't have a physical bead lizard you can still collect lizards by tapping other people's Halo Chips, but you won't be able to distribute lizards yourself."
          }
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
          Tap the <span className="font-bold mx-1">Halo Chip</span> near the top
          of the phone for the best connection.
        </p>
      </div>
    </div>
  );
};
