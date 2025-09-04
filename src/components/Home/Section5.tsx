"use client";

import React, { useRef } from "react";
import before1 from "@/assets/virtual-staging-home-1.jpg";
import after1 from "@/assets/virtual-staging-home-2.jpg";
import before2 from "@/assets/a1.jpg";
import after2 from "@/assets/a1-after.jpg";
import before3 from "@/assets/a2.jpg";
import after3 from "@/assets/a2-after.jpg";
import before4 from "@/assets/photo-editing-5.jpg";
import after4 from "@/assets/photo-editing-6.jpg";
import before5 from "@/assets/photo-editing-3.jpg";
import after5 from "@/assets/photo-editing-4.jpg";
import before6 from "@/assets/a3.jpg";
import after6 from "@/assets/a3-after.jpg";

import left from "@/assets/black-chevron-left.svg";
import right from "@/assets/black-chevron-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import SwiperCore from "swiper";

const data = [
  {
    beforeImage: before1.src,
    afterImage: after1.src,
  },
  {
    beforeImage: before2.src,
    afterImage: after2.src,
  },
  {
    beforeImage: before3.src,
    afterImage: after3.src,
  },
  {
    beforeImage: before4.src,
    afterImage: after4.src,
  },
  {
    beforeImage: before5.src,
    afterImage: after5.src,
  },
  {
    beforeImage: before6.src,
    afterImage: after6.src,
  },
  {
    beforeImage: before1.src,
    afterImage: after1.src,
  },
  {
    beforeImage: before2.src,
    afterImage: after2.src,
  },
  {
    beforeImage: before3.src,
    afterImage: after3.src,
  },
  {
    beforeImage: before4.src,
    afterImage: after4.src,
  },
  {
    beforeImage: before5.src,
    afterImage: after5.src,
  },
  {
    beforeImage: before6.src,
    afterImage: after6.src,
  },
];

const HomeSection5 = () => {
  const swiperRef = useRef<SwiperCore>();

  const handlePrev = () => {
    swiperRef?.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.slideNext();
  };

  return (
    <section className="bg-[#FBFBFB]">
      <div className=" py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Take a look at our featured projects
        </h1>
        <div>
          <div className="flex justify-center">
            <Swiper
              modules={[Navigation]}
              navigation={false}
              spaceBetween={24}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={true}
              allowTouchMove={false}
              simulateTouch={false}
              className="mySwiper7"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="rounded-2xl bg-cover bg-center overflow-hidden relative cursor-pointer">
                    <div className="relative w-full aspect-[600/400] overflow-hidden no-swipe">
                      <CompareSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="gap-4 flex justify-center mt-6">
            <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
              <button
                type="button"
                aria-label="Previous"
                className="w-full h-full flex justify-center items-center"
                onClick={handlePrev}
              >
                <Image src={left} alt="Previous" width={24} height={24} />
              </button>
            </div>

            <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
              <button
                type="button"
                aria-label="Next"
                className="w-full h-full flex justify-center items-center"
                onClick={handleNext}
              >
                <Image src={right} alt="Next" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection5;
