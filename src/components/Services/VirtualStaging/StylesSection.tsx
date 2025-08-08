"use client";
import React, { useRef, useState } from "react";

import style1 from "@/assets/style-select.png";
import style2 from "@/assets/style-2.png";
import style3 from "@/assets/style-3.png";
import style4 from "@/assets/style-4.png";
import left from "@/assets/black-chevron-left.svg";
import right from "@/assets/black-chevron-right.svg";
import eye from "@/assets/eye.svg";
import after1 from "@/assets/virtual-after.jpg";
import before1 from "@/assets/virtual-before.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";

const data = [
  { img: style1, style: "Contemporary" },
  { img: style2, style: "Industrial" },
  { img: style4, style: "Japandi" },
  { img: style3, style: "Coastal" },
  { img: style1, style: "Japandi" },
  { img: style1, style: "Japandi" },
  { img: style1, style: "Japandi" },
];

const StylesSection = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <div className="text-center">
          <div className="mb-5">
            <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium">Design Styles</h2>
          </div>
          <div className="text-[#495057] text-[16px]">
            Mix and match styles to appeal to any client or buyer with vamedia&apos;s massive furniture catalog of over
            12,000 pieces
          </div>
        </div>
      </div>

      <div className="pb-12 md:pb-[64px]">
        <Swiper
          ref={swiperRef}
          slidesPerView={"auto"}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
          className="mySwiper7"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-2xl bg-cover bg-center overflow-hidden relative cursor-pointer">
                <div className="relative w-full aspect-[600/400] overflow-hidden no-swipe">
                  <CompareSlider beforeImage={before1?.src} afterImage={after1?.src} />
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="uppercase rounded-2xl px-3 py-1 text-white bg-primary border-primary border-[1px] font-medium text-[12px]">
                    {item.style}
                  </div>
                  <div className="h-[28px] w-[28px] rounded-full flex items-center justify-center bg-primary border-primary border-[1px]">
                    <Image src={eye} alt="icon" width={16} height={16} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="gap-4 flex justify-center mt-6">
          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button className="w-full h-full flex justify-center items-center" onClick={handlePrev}>
              <Image src={left} alt="Previous" width={24} height={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 items-center">
            {data.map((_, index) => (
              <div
                key={index}
                onClick={() => swiperRef?.current?.swiper.slideTo(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  index === activeIndex ? "bg-[#212529]" : "bg-[#DEE2E6]"
                }`}
              ></div>
            ))}
          </div>

          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button className="w-full h-full flex justify-center items-center" onClick={handleNext}>
              <Image src={right} alt="Next" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StylesSection;
