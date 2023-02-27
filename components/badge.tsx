interface Props {}

export const Badge: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={`${className} py-2 px-4 bg-badge rounded-full`}>
      {children}
    </div>
  );
};
