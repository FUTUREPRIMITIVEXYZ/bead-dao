interface Props {
  viewBox?: string;
  height?: number;
  width?: number;
  fill?: string;
}

export const GraphViewIcon: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ className, width, height, viewBox, fill }) => {
  return (
    <div className={className}>
      <svg
        width={width ? width : "21"}
        height={height ? height : "22"}
        viewBox={viewBox ? viewBox : "0 0 21 22"}
        fill={fill ? fill : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.47749 0.665039H0.0566406V8.08589H7.47749V5.30307H9.3327V18.2896H13.0431V21.0724H20.464V13.6515H13.0431V16.4343H11.1879V5.30307H13.0431V8.08589H20.464V0.665039H13.0431V3.44786H7.47749V0.665039ZM18.6088 2.52025H14.8983V6.23067H18.6088V2.52025ZM14.8983 15.5067H18.6088V19.2172H14.8983V15.5067Z"
          fill={fill ? fill : "black"}
        />
      </svg>
    </div>
  );
};
