"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function ResponsiveCarousel({
  data,
}: {
  data: {
    product_id: number;
    variant_id: number | null;
    image_url: string;
  }[];
}) {
  // State and Ref initialization
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);

  // useEffect to get the initial carousel size
  useEffect(() => {
    let elem = carouselRef.current as unknown as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }
  }, []);

  return (
    <div>
      {/* Carousel container */}
      <div className="w-80 h-60 rounded-md overflow-hidden relative">
        {/* Image container */}
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="w-full h-full absolute flex transition-all duration-300"
        >
          {/* Map through data to render images */}
          {data.map((v, i) => (
            <div key={i} className="relative shrink-0 w-full h-full">
              <Image
                className="pointer-events-none"
                alt={`carousel-image-${i}`}
                fill
                src={v.image_url || "https://random.imagecdn.app/500/500"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-3">
        <Button
          disabled={currentImg === 0}
          onClick={() => setCurrentImg((prev) => prev - 1)}
          className={cn({ "opacity-50": currentImg === 0 })}
          variant={"ghost"}
        >
          {"<"}
        </Button>
        <div className="w-min flex transition-all duration-300 items-center px-1 gap-1">
          {/* Map through data to render images */}
          {data.map((v, i) => (
            <Button
              onClick={() => setCurrentImg(i)}
              key={i}
              size={"icon"}
              variant={`${currentImg === i ? "default" : "ghost"}`}
            >
              <Image
                alt={`carousel-image-${i}`}
                width={100}
                height={100}
                src={v.image_url || "https://random.imagecdn.app/500/500"}
              />
            </Button>
          ))}
        </div>
        <Button
          disabled={currentImg === data.length - 1}
          onClick={() => setCurrentImg((prev) => prev + 1)}
          className={cn({ "opacity-50": currentImg === data.length - 1 })}
          variant={"ghost"}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
