import Image from "next/image";
import React from "react";

interface Props {
  onClose?: () => void;
}

export const BeadLoading: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({}) => {
  return (
    <div className="">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-[400px] relative w-auto my-6 mx-auto">
          <Image
            height={322}
            width={322}
            alt="bead loading gif."
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzUwMDRlYjQ3ZjYwOWE1ZjAwZjZhMWJhZWFlMWE3NzQ0ODkzOWRiYiZjdD1z/AwcuWQAIndUjAVyeLv/giphy.gif"
          />
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
