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
        <div className="w-full max-h-56 sm:max-h-72 md:max-h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-1.jpg"}
            width={400}
            height={200}
            alt="banner"
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full max-h-56 sm:max-h-72 md:max-h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-2.jpg"}
            width={800}
            height={400}
            alt="banner"
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full max-h-56 sm:max-h-72 md:max-h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-3.jpg"}
            width={400}
            height={200}
            alt="banner"
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full max-h-56 sm:max-h-72 md:max-h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-4.jpg"}
            width={400}
            height={200}
            alt="banner"
            className="w-full object-cover"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
