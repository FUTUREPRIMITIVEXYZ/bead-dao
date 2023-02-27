interface Props {}

export const TelegramIcon: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div className={className}>
      <svg
        width="64"
        height="63"
        viewBox="0 0 64 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_114_495)">
          <path
            d="M32.216 6.44318C25.572 6.44318 19.1943 9.08471 14.5 13.7821C9.80096 18.4813 7.16048 24.8544 7.15918 31.5C7.15918 38.1428 9.80189 44.5205 14.5 49.2179C19.1943 53.9153 25.572 56.5568 32.216 56.5568C38.86 56.5568 45.2377 53.9153 49.932 49.2179C54.6301 44.5205 57.2728 38.1428 57.2728 31.5C57.2728 24.8572 54.6301 18.4795 49.932 13.7821C45.2377 9.08471 38.86 6.44318 32.216 6.44318Z"
            fill="url(#paint0_linear_114_495)"
          />
        </g>
        <path
          d="M18.5013 31.2354C25.8069 28.0532 30.6773 25.9551 33.1125 24.9414C40.0736 22.047 41.5183 21.5443 42.4619 21.5272C42.6694 21.5239 43.1314 21.5752 43.4328 21.8189C43.6834 22.0245 43.7539 22.3024 43.7891 22.4976C43.8204 22.6926 43.8635 23.137 43.8283 23.4838C43.4524 27.4459 41.8198 37.0607 40.9898 41.4985C40.6413 43.3762 39.9484 44.0058 39.2789 44.0672C37.8224 44.2011 36.7184 43.1057 35.3089 42.1821C33.1047 40.7362 31.8597 39.8365 29.7181 38.4259C27.2438 36.7957 28.849 35.8995 30.2584 34.4352C30.6264 34.0519 37.0394 28.2204 37.1608 27.6914C37.1764 27.6253 37.1921 27.3786 37.0433 27.2486C36.8985 27.1182 36.6831 27.1629 36.5265 27.1981C36.3034 27.2482 32.7837 29.5769 25.9557 34.1839C24.9573 34.8706 24.0529 35.2053 23.2386 35.1877C22.3459 35.1685 20.6233 34.6819 19.343 34.2661C17.777 33.756 16.5281 33.4862 16.6377 32.6198C16.6925 32.1688 17.315 31.7072 18.5013 31.2354Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_d_114_495"
            x="-4.29537"
            y="-3.57955"
            width="73.0227"
            height="73.0227"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
              result="effect1_dropShadow_114_495"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_114_495"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_114_495"
            x1="2512.84"
            y1="6.44318"
            x2="2512.84"
            y2="5017.81"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2AABEE" />
            <stop offset="1" stopColor="#229ED9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
