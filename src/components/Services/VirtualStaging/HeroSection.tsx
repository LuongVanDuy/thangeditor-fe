"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import left from "@/assets/white-chevron-left.svg";
import right from "@/assets/white-chevron-right.svg";
import { jsonServiceData } from "@/lib/constants";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const HeroSection = () => {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const { mutate: genOIDMutation, isPending: isGenering } = useMutation({
    mutationFn: () => generateOrderId(),
    onSuccess: (data: any) => {
      const oid = data?.id;
      if (oid) {
        router.push(`/dashboard/order/create-order?oid=${oid}`);
      }
    },
    onError: (error: any) => {
      console.error("Failed to generate order ID:", error);
    },
  });
  const handleNewOrder = () => {
    genOIDMutation();
  };

  const service = jsonServiceData.find((item) => item.id === 1);

  if (!service) {
    return <div className="p-6 text-center">Service not found</div>;
  }

  return (
    <section className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <div className="text-center">
        <div className="mb-4">
          <p className="text-brand font-medium text-[14px] mb-2 uppercase">{service?.category}</p>
          <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-medium">{service?.title}</h1>
        </div>

        <div className="mb-9 md:mb-12 max-w-[900px] mx-auto">
          <h2 className="text-[18px] mb-2">{service?.tagline}</h2>
          <p className="text-[16px] text-[#495057]">{service?.description}</p>
        </div>

        <button onClick={handleNewOrder} className="btn-primary h-[58px] w-[193px] mx-auto">
          Place an order
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:items-center md:gap-12 lg:gap-[64px]">
        <div
          className="hidden md:flex h-11 w-11 cursor-pointer rounded-full bg-black items-center justify-center flex-shrink-0"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Image src={left} alt="left" />
        </div>

        <div className="rounded-2xl relative w-full max-w-[1240px]">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="rounded-xl overflow-hidden shadow-xl"
            noSwipingSelector=".no-swipe"
            allowTouchMove={true}
          >
            {(service?.images ?? []).map((img, index) => {
              const beforeSrc = require(`@/assets/${img.beforeUrl.split("/").pop()}`).default.src;
              const afterSrc = require(`@/assets/${img.afterUrl.split("/").pop()}`).default.src;

              return (
                <SwiperSlide key={index}>
                  <div className="relative w-full aspect-[600/345] md:aspect-[1020/589] no-swipe">
                    <CompareSlider beforeImage={beforeSrc} afterImage={afterSrc} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div
          className="hidden md:flex h-11 w-11 cursor-pointer rounded-full bg-black items-center justify-center flex-shrink-0"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Image src={right} alt="right" />
        </div>

        <div className="flex md:hidden gap-4 mt-4">
          <div
            className="h-11 w-11 cursor-pointer rounded-full bg-black flex items-center justify-center flex-shrink-0"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image src={left} alt="left" />
          </div>
          <div
            className="h-11 w-11 cursor-pointer rounded-full bg-black flex items-center justify-center flex-shrink-0"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image src={right} alt="right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
