interface Props {}

export const NavLink: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ className, children, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} relative rounded-[16px] py-3 px-4 min-w-[355px] w-full`}
    >
      <div className="absolute rounded-[16px] inset-0 h-full w-full bg-link  backdrop-blur-md"></div>
      <div className="z-10 relative">{children}</div>
    </div>
  );
};
