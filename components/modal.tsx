import React from "react";

interface Props {
  onClose?: () => void;
}

export const Modal: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  onClose,
}) => {
  return (
    <div className="">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="h-full max-w-[400px] relative w-auto my-6 mx-auto top-[10%]">
          <div className="p-3 pt-2 md:p-4 md:pt-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="">
              <button
                className="absolute translate-y-[-60px] translate-x-[-10px] h-[40px] w-[40px] drop-shadow-xl p-2 bg-white rounded-full inline-flex justify-center items-center ml-auto border-0 text-black"
                onClick={() => onClose && onClose()}
              >
                <div className="text-black text-2xl block outline-none focus:outline-none">
                  ×
                </div>
              </button>
            </div>
            <div className="p-4 pt-4">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
