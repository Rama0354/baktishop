"use client";
import Image from "next/image";
// import Swiper core and required modules
import { Autoplay, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AspectRatio } from "./ui/aspect-ratio";

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
        <Image
          src={"/assets/img/banner-1.jpg"}
          width={260}
          height={120}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          className="h-full w-full"
          alt="banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/assets/img/banner-2.jpg"}
          width={260}
          height={120}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          className="h-full w-full"
          alt="banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/assets/img/banner-3.jpg"}
          width={260}
          height={120}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          className="h-full w-full"
          alt="banner"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/assets/img/banner-4.jpg"}
          width={260}
          height={120}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          className="h-full w-full"
          alt="banner"
        />
      </SwiperSlide>
    </Swiper>
  );
}
