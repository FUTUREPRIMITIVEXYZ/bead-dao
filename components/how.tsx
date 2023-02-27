import Image from "next/image";

interface Props {}

export const How: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  return (
    <div>
      <div className="border-4 border-solid border-black rounded-2xl h-[322px] w-[322px]">
        <Image
          className="object-cover"
          src="/taplizgif.gif"
          alt="how to mint gif."
          height={1280}
          width={1280}
          objectFit="cover"
        />
      </div>
    </div>
  );
};
