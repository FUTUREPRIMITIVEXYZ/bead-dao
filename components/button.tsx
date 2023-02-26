interface Props {}

export const Button: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  onClick = () => {},
}) => {
  return (
    <div
      className={`${className} box rounded-full py-2 px-4 bg-black shadow-3xl cursor-pointer hover:animate-bounce hover:duration-75`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
