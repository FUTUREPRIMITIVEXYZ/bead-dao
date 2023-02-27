interface Props {}

export const TwitIconFilled: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div className={className}>
      <svg
        width="74"
        height="74"
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_103_641)">
          <path
            d="M36.5433 12.5909C30.279 12.5909 24.2657 15.0815 19.8397 19.5104C15.4092 23.9411 12.9196 29.95 12.9183 36.2159C12.9183 42.4791 15.41 48.4924 19.8397 52.9213C24.2657 57.3503 30.279 59.8409 36.5433 59.8409C42.8077 59.8409 48.821 57.3503 53.2469 52.9213C57.6766 48.4924 60.1683 42.4791 60.1683 36.2159C60.1683 29.9527 57.6766 23.9394 53.2469 19.5104C48.821 15.0815 42.8077 12.5909 36.5433 12.5909Z"
            fill="url(#paint0_linear_103_641)"
          />
          <path
            d="M37.4545 10.6818C23.6173 10.6818 12.3977 21.9015 12.3977 35.7386C12.3977 49.5758 23.6173 60.7955 37.4545 60.7955C51.2917 60.7955 62.5113 49.5758 62.5113 35.7386C62.5113 21.9015 51.2917 10.6818 37.4545 10.6818ZM49.4963 29.5695C49.5131 29.8324 49.5131 30.1065 49.5131 30.3749C49.5131 38.5855 43.2601 48.0433 31.8335 48.0433C28.3099 48.0433 25.0436 47.0198 22.2918 45.258C22.7952 45.3139 23.2762 45.3363 23.7907 45.3363C26.6991 45.3363 29.3726 44.3519 31.5035 42.6852C28.7741 42.6293 26.481 40.8395 25.698 38.3786C26.6544 38.5184 27.5157 38.5184 28.5001 38.2667C27.0947 37.9812 25.8315 37.2179 24.9251 36.1066C24.0187 34.9952 23.525 33.6044 23.5279 32.1703V32.092C24.35 32.5562 25.3176 32.8414 26.33 32.8806C25.4789 32.3134 24.781 31.545 24.2981 30.6435C23.8151 29.7421 23.5621 28.7353 23.5614 27.7126C23.5614 26.5549 23.8634 25.4978 24.406 24.5805C25.9659 26.5008 27.9124 28.0714 30.1191 29.1901C32.3257 30.3089 34.7431 30.9507 37.214 31.074C36.3359 26.8513 39.4904 23.434 43.2825 23.434C45.0722 23.434 46.683 24.1834 47.8184 25.3915C49.2223 25.1286 50.5646 24.6029 51.7615 23.8982C51.2973 25.3356 50.3241 26.5493 49.0321 27.3155C50.285 27.1813 51.4931 26.8345 52.6117 26.3479C51.7671 27.5896 50.71 28.6914 49.4963 29.5695Z"
            fill="#4B9AE4"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_103_641"
            x="-5.7386"
            y="-6.02273"
            width="85.9091"
            height="85.9091"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.43182" />
            <feGaussianBlur stdDeviation="5.72727" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.31687 0 0 0 0 0.31687 0 0 0 0 0.31687 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_103_641"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_103_641"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_103_641"
            x1="2375.42"
            y1="12.5909"
            x2="2375.42"
            y2="4737.59"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="#229ED9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};