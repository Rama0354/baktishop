"use client";
import Image from "next/image";
// import Swiper core and required modules
import { Navigation, Autoplay, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function SliderContainer() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Autoplay, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
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
        <div className="relative w-full h-56 sm:h-72 lg:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-1.jpg"}
            width={100}
            height={100}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 425px) 50vw,75vw"
            alt="banner"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-56 sm:h-72 lg:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-2.jpg"}
            width={100}
            height={100}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 425px) 50vw,75vw"
            alt="banner"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relaive w-full h-56 sm:h-72 lg:h-[480px] flex items-center overflow-hidden">
          <Image
            src={"/assets/img/banner-3.jpg"}
            width={100}
            height={100}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 425px) 50vw,75vw"
            alt="banner"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
