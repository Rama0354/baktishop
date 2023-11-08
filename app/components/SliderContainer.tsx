"use client";
import Image from "next/image";
// import Swiper core and required modules
import { Navigation, Autoplay, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function SliderContainer() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Autoplay, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      scrollbar={{ draggable: true }}

      //   onSwiper={(swiper) => console.log(swiper)}
      //   onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div className="relative w-full h-56 sm:h-72 md:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-1.jpg"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="banner"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-56 sm:h-72 md:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-2.jpg"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="banner"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relaive w-full h-56 sm:h-72 md:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-3.jpg"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="banner"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-56 sm:h-72 md:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-4.jpg"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="banner"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
