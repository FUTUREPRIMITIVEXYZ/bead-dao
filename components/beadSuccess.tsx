import Image from "next/image";

interface Props {}

export const BeadSuccess: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col items-center justify-center space-y-4`}
    >
      <div className="border-4 border-solid border-black rounded-2xl h-[322px] w-[322px] m-0 overflow-hidden">
        <Image
          alt="how to mint gif."
          height={322}
          width={322}
          objectFit="cover"
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTI4MGEwZTMxMTQ3MGE5YTZmOGMzZjZiNDkzY2RiYjdjMTQ5NTM3MSZjdD1n/vHublFw0x9L44N36Ju/giphy.gif"
        />
      </div>

      <h1 className="font-bold">Congratulations on minting a bead!</h1>
    </div>
  );
};
