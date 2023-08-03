import { Background } from '@/components/background'
import Image from 'next/image'
import MembersImg from 'public/members-img.png'

interface GalleryProps {}

function Gallery({}: GalleryProps) {
  return (
    <Background>
      <div className="w-[100%] h-[100vh] pt-[1rem] overflow-scroll flex flex-col items-center mt-10">
        <Image src={MembersImg} alt="members gallery" width={650} height={undefined} />
      </div>
    </Background>
  )
}
export default Gallery
