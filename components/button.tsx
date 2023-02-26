interface Props {}

export const Button: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`${className} py-2 px-4 bg-black text-white rounded-full border-4 border-solid shadow-2xl border-gradient-to-r from-red-500 via-yellow-500 to-green-500`}
    >
      {children}
    </div>
  );
};
