"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import left from "@/assets/chevron-left.svg";
import right from "@/assets/chevron-right.svg";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import after1 from "@/assets/virtual-after.jpg";
import before1 from "@/assets/virtual-before.jpg";
import after2 from "@/assets/enhen-after.jpg";
import before2 from "@/assets/enhen-before.jpg";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import { useRouter } from "next/navigation";

export const StyledSwiperSlide = styled(SwiperSlide)`
  width: 600px;
  height: 603px;

  @media screen and (max-width: 1024px) {
    width: 520px;
    height: 535px;
  }

  @media screen and (max-width: 768px) {
    width: 329px;
    height: 500px;
  }
`;

const data = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: "Help buyers fall in love with your listings by turning vacant rooms into stylish spaces.",
    slug: "virtual-staging-renovation/virtual-staging",
    after: after1,
    before: before1,
  },
  {
    title: "Image Enhancement",
    categories: "Photo Editing",
    desc: "Create competitive advantage by enhancing real estate image",
    slug: "photo-editing/object-removal",
    after: after2,
    before: before2,
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    desc: "Create a real estate video to gain prospects' attention and sell their listings faster.",
    slug: "video-editing/real-estate-video-editing",
    after: after2,
    before: before2,
  },
];

const HomeSection2 = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  const { mutate: genOIDMutation } = useMutation(["OID"], (title: string) => generateOrderId(), {
    onSuccess: (data: any, variables: string) => {
      const oid = data?.id;
      const title = variables;
      const encodedTitle = encodeURIComponent(title);

      router.replace(`/dashboard/order/create-order?service=${encodedTitle}&oid=${oid}`);
    },
    onError: (error) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = (title: string) => {
    genOIDMutation(title);
  };

  return (
    <div className="sm:px-4 lg:pl-[64px] xl:pl-[108px] pb-[64px] pt-12 md:pt-0 ">
      <h1 className="text-[#495057] text-[18px] mb-4 block md:hidden">My services</h1>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={2.2}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2.2,
          },
        }}
        spaceBetween={24}
        noSwipingSelector=".no-swipe"
        allowTouchMove={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper2 !pl-[4px] !mr-[-4px]"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="pb-[4px]">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <div className="relative max-w-[1540px]">
                <div className="relative w-full aspect-[600/345] overflow-hidden no-swipe">
                  <CompareSlider beforeImage={item.before?.src} afterImage={item.after?.src} />
                </div>
              </div>

              <div className="p-4 md:p-6 lg:p-9 gap-9 md:gap-10 lg:gap-12 flex flex-col">
                <div>
                  <h1 className="text-primary text-[12px] uppercase">{item.categories}</h1>
                  <Link
                    href={`/services/${item.slug}`}
                    className="font-medium text-[24px] md:text-[28px] lg:text-[32px] mt-2 mb-4"
                  >
                    {item.title}
                  </Link>
                  <h3 className="text-[#0000008F]">{item.desc}</h3>
                </div>

                <div>
                  <h1 className="text-[#000000CC] text-[14px] block md:hidden mb-4">
                    Starting from <span className="text-primary">$16</span>
                  </h1>

                  <div className="flex gap-4 items-center">
                    <div
                      onClick={() => handleNewOrder(item.title)}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-primary cursor-pointer hover:opacity-80 border border-[1px] border-solid border-primary"
                    >
                      Place an order
                    </div>
                    <Link
                      href={`/services/${item.slug}`}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-lg border-[1px] border-[#DEE2E6] font-medium text-[#343A40] cursor-pointer hover:opacity-80"
                    >
                      Learn more
                    </Link>
                    <h1 className="text-[#000000CC] text-[14px] hidden md:block">
                      Starting from <span className="text-primary">$16</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex justify-between sm:pr-0 lg:pr-[64px] xl:pr-[108px]">
        <div className="btn-primary h-12 w-full xs:w-[139px]">
          <Link href={"/services"}>All services</Link>
        </div>

        <div className="gap-4 hidden xs:flex">
          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button className={`w-full h-full flex justify-center items-center `} onClick={handlePrev}>
              <Image src={left} alt="Previous" width={24} height={24} />
            </button>
          </div>

          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button className={`w-full h-full flex justify-center items-center `} onClick={handleNext}>
              <Image src={right} alt="Next" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection2;
