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
        <div className="h-full max-w-[400px] relative w-auto my-6 mx-auto top-[15%]">
          <div className="p-3 pt-2 md:p-4 md:pt-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="">
              <button
                className="absolute translate-y-[-60px] translate-x-[-10px] h-[40px] w-[40px] drop-shadow-xl p-2 bg-white rounded-full inline-flex justify-center items-center ml-auto border-0 text-black"
                onClick={() => onClose && onClose()}
              >
                <div className="text-black text-2xl block outline-none focus:outline-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 9.63333L2.28333 15.35C2.06944 15.5639 1.79722 15.6708 1.46666 15.6708C1.13611 15.6708 0.863884 15.5639 0.649995 15.35C0.436107 15.1361 0.329163 14.8639 0.329163 14.5333C0.329163 14.2028 0.436107 13.9306 0.649995 13.7167L6.36666 8L0.649995 2.28333C0.436107 2.06944 0.329163 1.79722 0.329163 1.46666C0.329163 1.13611 0.436107 0.863884 0.649995 0.649995C0.863884 0.436107 1.13611 0.329163 1.46666 0.329163C1.79722 0.329163 2.06944 0.436107 2.28333 0.649995L8 6.36666L13.7167 0.649995C13.9306 0.436107 14.2028 0.329163 14.5333 0.329163C14.8639 0.329163 15.1361 0.436107 15.35 0.649995C15.5639 0.863884 15.6708 1.13611 15.6708 1.46666C15.6708 1.79722 15.5639 2.06944 15.35 2.28333L9.63333 8L15.35 13.7167C15.5639 13.9306 15.6708 14.2028 15.6708 14.5333C15.6708 14.8639 15.5639 15.1361 15.35 15.35C15.1361 15.5639 14.8639 15.6708 14.5333 15.6708C14.2028 15.6708 13.9306 15.5639 13.7167 15.35L8 9.63333Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </button>
            </div>
            <div className="p-4 pt-4">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
