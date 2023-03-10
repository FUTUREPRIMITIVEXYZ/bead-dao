interface Props {
  opacity?: string;
}

export const Card: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  opacity,
}) => {
  return (
    <div
      className={`${className} relative rounded-3xl p-6 m-3 min-w-[348px] min-h-[348px] max-w-[396px]`}
    >
      <div
        className={`absolute rounded-3xl inset-0 h-full w-full bg-white ${
          opacity ? opacity : `opacity-70`
        } backdrop-blur-md`}
      ></div>
      <div className="z-10 relative">{children}</div>
    </div>
  );
};
