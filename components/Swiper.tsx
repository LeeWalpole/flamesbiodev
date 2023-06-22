"use client"

// Import Swiper React components
// import Swiper core and required modules
import { useEffect, useRef } from "react"
import Image from "next/image"
import { A11y, Navigation, Pagination, Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Function to shuffle the array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

interface SwiperProps {
  images: string[]
  imageClassName: string
  shuffle?: boolean
}

const SwiperComponent: React.FC<SwiperProps> = ({
  images,
  imageClassName,
  shuffle = false,
}) => {
  const shuffledImages = shuffle ? shuffleArray(images) : images

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      navigation
    >
      {shuffledImages.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            width={150}
            height={150}
            src={image}
            alt={`Slide ${index + 1}`}
            className={imageClassName}
          />
        </SwiperSlide>
      ))}
      <span className="absolute bottom-0 left-0 z-[1] h-16 w-full bg-gradient-to-t from-background via-transparent to-transparent"></span>
    </Swiper>
  )
}

export default SwiperComponent
