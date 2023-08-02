'use client'
import { ConnectKitButton } from 'connectkit'
import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

import Link from 'next/link'

import { useAccount } from 'wagmi'

import { Button } from './button'

const header = cva('replace this text with styles shared by all variants', {
  variants: {
    variant: {
      variant1: [''],
      variant2: [''],
    },
    defaultVariants: {
      variant: 'variant1',
    },
  },
})

interface Props extends VariantProps<typeof header> {
  className?: string
}

export function Header({ variant, className, ...rest }: Props) {
  const { address } = useAccount()
  return (
    <nav
      className={clsx(
        'flex p-5 w-full justify-end items-center text-white absolute top-0 left-0 right-0',
        header({ variant }),
        className
      )}
      {...rest}
    >
      <div className={`w-full flex items-center justify-between px-4 md:px-4`}>
        <Link href="/">
          <div className="flex flex-row cursor-pointer">
            <svg
              className="mr-2"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_163_718)">
                <circle
                  cx="17"
                  cy="17"
                  r="15.435"
                  fill="white"
                  stroke="black"
                  stroke-width="3.13"
                />
                <path
                  d="M15.2 24V18.7059H18.8V24H23.3V16.9412H26L17 9L8 16.9412H10.7V24H15.2Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_163_718">
                  <rect width="34" height="34" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              width="122"
              height="34"
              viewBox="0 0 122 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_163_715)">
                <path
                  d="M106.245 1.51506H15.7502C7.82699 1.51506 1.40393 8.44667 1.40393 16.9973C1.40393 25.5478 7.82699 32.4794 15.7502 32.4794H106.245C114.168 32.4794 120.591 25.5478 120.591 16.9973C120.591 8.44667 114.168 1.51506 106.245 1.51506Z"
                  fill="#FCFAFA"
                  stroke="black"
                  stroke-width="3.03562"
                  stroke-miterlimit="10"
                />
                <path
                  d="M19.1999 25.0594C21.9104 25.0594 23.7594 22.8531 23.7594 19.3652C23.7594 16.0034 21.8264 13.6711 19.1159 13.6711C17.6241 13.6711 16.6995 14.3645 16.1112 15.268H16.0482V9.72092H13.1906V24.7442H15.9431V23.3994H15.9852C16.6155 24.408 17.6871 25.0594 19.1999 25.0594ZM18.5696 22.664C16.9727 22.664 15.9852 21.4033 15.9852 19.4283C15.9852 17.4322 16.6575 15.9824 18.4645 15.9824C20.0614 15.9824 20.8598 17.3691 20.8598 19.3652C20.8598 21.4454 20.0404 22.664 18.5696 22.664ZM30.1555 25.0594C32.929 25.0594 34.6309 23.4415 35.0302 21.5294H32.2146C31.8994 22.3489 31.2481 22.8531 30.1345 22.8531C28.5166 22.8531 27.5921 21.8236 27.382 20.1637H35.1982C35.1982 16.3185 33.3492 13.6711 29.8823 13.6711C26.7306 13.6711 24.5664 16.1505 24.5664 19.3442C24.5664 22.559 26.5835 25.0594 30.1555 25.0594ZM29.9243 15.8773C31.2271 15.8773 32.1306 16.8228 32.2146 18.1886H27.424C27.6761 16.7808 28.4115 15.8773 29.9243 15.8773ZM43.3076 24.7442H46.0601V24.6391C45.8079 24.45 45.6819 23.9668 45.6819 23.1473V17.6633C45.6819 15.1419 44.3791 13.6921 41.1434 13.6921C37.9916 13.6921 36.5839 15.352 36.4998 17.2431H39.0422C39.1263 16.2135 39.7776 15.7302 41.1224 15.7302C42.32 15.7302 42.9293 16.2345 42.9293 17.0119C42.9293 17.8314 42.1099 17.9785 40.3239 18.2306C37.9286 18.5668 35.9955 19.3232 35.9955 21.6975C35.9955 23.8407 37.5504 24.9963 39.7566 24.9963C41.6056 24.9963 42.383 24.366 42.9293 23.5465H42.9714C43.0344 24.0298 43.1395 24.5341 43.3076 24.7442ZM40.45 23.0002C39.4414 23.0002 38.7691 22.643 38.7691 21.6345C38.7691 20.6259 39.5045 20.2897 40.9963 19.9535C41.7107 19.7855 42.4881 19.6174 42.9924 19.3232V20.9411C42.9924 21.9917 42.0889 23.0002 40.45 23.0002ZM51.5328 25.0594C53.0456 25.0594 54.1172 24.366 54.7475 23.3364H54.7895V24.7442H57.5421V9.72092H54.6845V15.268H54.6215C54.0331 14.3645 53.0876 13.6711 51.5748 13.6711C48.8853 13.6711 46.9732 16.0034 46.9732 19.3652C46.9732 22.8531 48.8223 25.0594 51.5328 25.0594ZM52.1631 22.664C50.6923 22.664 49.8728 21.4454 49.8728 19.3652C49.8728 17.3691 50.6713 15.9824 52.2471 15.9824C54.0752 15.9824 54.7475 17.3691 54.7475 19.4283C54.7475 21.4033 53.865 22.664 52.1631 22.664ZM59.6307 24.7442H65.2408C67.1319 24.7442 68.5817 24.2189 69.6953 23.2944C71.2711 21.9707 72.0906 19.8275 72.0906 17.3901C72.0906 12.9567 69.5062 9.72092 65.493 9.72092H59.6307V24.7442ZM62.6774 22.1177V12.3264H65.1148C67.6992 12.3264 69.0019 14.4065 69.0019 17.3901C69.0019 20.3738 67.8883 22.1177 65.0307 22.1177H62.6774ZM71.814 24.7442H74.9027L75.8902 21.5504H81.3112L82.3198 24.7442H85.4925L80.1976 9.72092H77.0459L71.814 24.7442ZM77.9494 14.8898C78.2015 14.0913 78.5797 12.5785 78.5797 12.5785H78.6217C78.6217 12.5785 78.9789 14.0913 79.2311 14.8898L80.5758 19.2181H76.6046L77.9494 14.8898ZM92.5133 25.0804C96.9468 25.0804 99.7413 21.7605 99.7413 17.2641C99.7413 12.7676 96.9468 9.42676 92.5133 9.42676C88.0799 9.42676 85.2643 12.7676 85.2643 17.2641C85.2643 21.7605 88.0799 25.0804 92.5133 25.0804ZM92.5343 22.58C89.7818 22.58 88.374 20.2477 88.374 17.2641C88.374 14.2594 89.7818 11.9271 92.5343 11.9271C95.2868 11.9271 96.6316 14.2594 96.6316 17.2641C96.6316 20.2477 95.2868 22.58 92.5343 22.58ZM105.82 19.6174C108.636 19.6174 110.842 17.4532 110.842 14.5326C110.842 11.612 108.636 9.44777 105.82 9.44777C103.004 9.44777 100.798 11.612 100.798 14.5326C100.798 17.4532 103.004 19.6174 105.82 19.6174ZM105.82 18.8399C103.467 18.8399 101.723 17.0119 101.723 14.5326C101.723 12.0742 103.467 10.2462 105.82 10.2462C108.194 10.2462 109.917 12.0742 109.917 14.5326C109.917 17.0119 108.194 18.8399 105.82 18.8399ZM103.677 17.18H105.127V15.2259H105.841C106.366 15.2259 106.639 15.4571 106.682 15.9403C106.745 16.4656 106.766 17.096 106.913 17.18H108.341V17.075C108.131 16.9699 108.215 16.3396 108.089 15.6672C107.984 15.1629 107.795 14.8477 107.291 14.7007V14.6586C107.9 14.4485 108.215 13.9863 108.215 13.3769C108.215 12.3684 107.333 11.8011 106.282 11.8011H103.677V17.18ZM105.127 12.9567H106.03C106.555 12.9567 106.787 13.1668 106.787 13.566C106.787 13.9653 106.534 14.1754 106.03 14.1754H105.127V12.9567Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_163_715">
                  <rect width="122" height="34" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </Link>

        {
          address ?
          <Link href={`/account/${address}`}>
            <Button className="mr-2">
              <div className="px-1 whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
                My Lizard
              </div>
            </Button>
          </Link>
          :
          <ConnectKitButton />
        }
      </div>
    </nav>
  )
}
