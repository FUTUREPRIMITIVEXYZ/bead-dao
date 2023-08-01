interface Props {
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};
}

export const RefreshIcon: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ handleClick, className }) => {
  return (
    <div className={className}>
      <div
        className="inline-block cursor-pointer bg-white rounded-md shadow-lg p-2 border-[1px] border-solid border-link-box-text md:border-none"
        onClick={(e) => {
          handleClick && handleClick(e);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.3185 7.25873V3.5589C15.3185 3.24417 14.9408 3.0903 14.724 3.31411L13.479 4.55904C12.2131 3.29313 10.4087 2.56575 8.43634 2.7406C5.50585 3.00637 3.09292 5.36335 2.77119 8.29384C2.35155 12.0846 5.31002 15.3018 9.02384 15.3018C12.2341 15.3018 14.8848 12.8959 15.2695 9.79056C15.3185 9.37092 14.9897 9.00723 14.5701 9.00723C14.2204 9.00723 13.9266 9.26601 13.8847 9.60872C13.5839 12.0496 11.4787 13.938 8.9539 13.903C6.35912 13.8681 4.17 11.6789 4.12803 9.07717C4.08607 6.34951 6.30317 4.11143 9.02384 4.11143C10.3737 4.11143 11.5976 4.66395 12.4859 5.5452L11.0241 7.00695C10.8003 7.23075 10.9542 7.60843 11.2689 7.60843H14.9688C15.1646 7.60843 15.3185 7.45456 15.3185 7.25873Z"
            fill="#5F6368"
          />
        </svg>
      </div>
    </div>
  );
};
