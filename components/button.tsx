interface Props {}

export const Button: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  onClick = () => {},
}) => {
  return (
    <div
      className={`${className} box inline-block rounded-full py-2 px-4 bg-black drop-shadow-2xl cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
