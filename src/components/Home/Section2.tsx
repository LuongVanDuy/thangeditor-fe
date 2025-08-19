"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import left from "@/assets/chevron-left.svg";
import right from "@/assets/chevron-right.svg";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import { useRouter } from "next/navigation";
import { jsonServiceData } from "@/lib/constants";

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

const HomeSection2 = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  const { mutate: genOIDMutation } = useMutation({
    mutationFn: (title: string) => generateOrderId(),
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
      <h2 className="text-[#495057] text-[18px] mb-4 block md:hidden">My services</h2>
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
        {jsonServiceData.map((item, index) => (
          <SwiperSlide key={index} className="pb-[4px]">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <div className="relative max-w-[1540px]">
                <div className="relative w-full aspect-[600/345] overflow-hidden no-swipe">
                  {item?.images?.[0] &&
                    (() => {
                      const firstImg = item.images[0];

                      let beforeSrc = null;
                      let afterSrc = null;

                      if (firstImg.beforeUrl) {
                        beforeSrc = require(`@/assets/${firstImg.beforeUrl.split("/").pop()}`).default.src;
                      }

                      if (firstImg.afterUrl) {
                        afterSrc = require(`@/assets/${firstImg.afterUrl.split("/").pop()}`).default.src;
                      }

                      if (item.id === 3) {
                        return beforeSrc ? (
                          <img src={beforeSrc} alt="Before" className="w-full h-full object-cover" />
                        ) : null;
                      }

                      if (beforeSrc && afterSrc) {
                        return <CompareSlider beforeImage={beforeSrc} afterImage={afterSrc} />;
                      } else if (beforeSrc) {
                        return <img src={beforeSrc} alt="Before" className="w-full h-full object-cover" />;
                      }

                      return null;
                    })()}
                </div>
              </div>

              <div className="p-4 md:p-6 lg:p-9 gap-9 md:gap-10 lg:gap-12 flex flex-col">
                <div>
                  <p className="text-brand text-[12px] uppercase">{item.category}</p>
                  <Link
                    href={`/services/${item.slug}`}
                    className="font-medium text-[24px] md:text-[28px] lg:text-[32px] mt-2 mb-4"
                  >
                    {item.title}
                  </Link>
                  <h3 className="text-[#0000008F]">{item.desc}</h3>
                </div>

                <div>
                  <h3 className="text-[#000000CC] text-[14px] block md:hidden mb-4">
                    Starting from <span className="text-brand">${item.price}</span>
                  </h3>

                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => handleNewOrder(item.title)}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-brand cursor-pointer hover:opacity-80  border-[1.5px] border-solid border-brand"
                    >
                      Place an order
                    </button>
                    <Link
                      href={`/services/${item.slug}`}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-lg border-[1px] border-[#DEE2E6] font-medium text-[#343A40] cursor-pointer hover:opacity-80"
                    >
                      Learn more
                    </Link>
                    <div className="text-[#000000CC] text-[14px] hidden md:block">
                      Starting from <span className="text-brand">${item.price}</span>
                    </div>
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
            <button
              type="button"
              aria-label="Previous slide"
              className={`w-full h-full flex justify-center items-center `}
              onClick={handlePrev}
            >
              <Image src={left} alt="Previous" width={24} height={24} />
            </button>
          </div>

          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button
              type="button"
              aria-label="Next slide"
              className={`w-full h-full flex justify-center items-center `}
              onClick={handleNext}
            >
              <Image src={right} alt="Next" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection2;
