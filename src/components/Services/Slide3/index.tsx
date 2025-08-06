import React, { useRef } from "react";
import Image from "next/image";
import Card from "../Card";
import Link from "next/link";
import { Swiper as SwiperType } from "swiper";
import left from "@/assets/chevron-left.svg";
import right from "@/assets/chevron-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./styles.css";

const data = [
  {
    title: "Real Estate Video Editing",
    categories: "Video Editing",
    desc: "Create a real estate video to gain prospects' attention and sell their listings faster.",
    slug: "real-estate-video-editing",
  },
];

const Slide3 = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between sm:pr-4 lg:pr-[64px] xl:pr-[108px]">
        <div className="sm:text-[20px] md:text-[32px] font-medium">
          <Link href={"/video-editing"}>Video Editing</Link>
        </div>

        <div className="gap-4 hidden xs:flex">
          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm opacity-80">
            <button
              type="button"
              aria-label="Prev"
              className={`w-full h-full flex justify-center items-center `}
              onClick={handlePrev}
            >
              <Image src={left} alt="Previous" width={24} height={24} />
            </button>
          </div>

          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm opacity-80">
            <button
              type="button"
              aria-label="Next"
              className={`w-full h-full flex justify-center items-center `}
              onClick={handleNext}
            >
              <Image src={right} alt="Next" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        className="mySwiper3-3"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              title={item.title}
              categories={item.categories}
              desc={item.desc}
              slug={item.slug}
              style="w-[329px] h-[500px] md:h-[510px] lg:h-[592px] md:w-[520px] lg:w-[600px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide3;
