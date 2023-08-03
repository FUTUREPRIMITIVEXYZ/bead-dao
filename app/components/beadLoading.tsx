import Image from 'next/image'
import React from 'react'

interface Props {
  onClose?: () => void
}

export const BeadLoading: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({}) => {
  return (
    <div className="">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="max-w-[400px] relative w-auto my-6 mx-auto">
          <Image
            height={322}
            width={322}
            alt="bead loading gif."
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZkNWIxZDMxNTM0MTBmNGU2NTU4NzhjYTE4ZDhiMDg2NTk2MTAzZSZjdD1z/yYmPdb7UNlih5LlpL8/giphy.gif"
          />
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-80"></div>
    </div>
  )
}
