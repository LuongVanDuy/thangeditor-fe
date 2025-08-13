"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import poster1 from "@/assets/poster-1.png";
import poster2 from "@/assets/poster-2.png";
import { jsonServiceData } from "@/lib/constants";

const HeroSection = () => {
  const router = useRouter();
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

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const handlePlayPause1 = () => {
    if (!videoRef1.current) return;
    if (isPlaying1) videoRef1.current.pause();
    else videoRef1.current.play();
    setIsPlaying1(!isPlaying1);
  };

  const handlePlayPause2 = () => {
    if (!videoRef2.current) return;
    if (isPlaying2) videoRef2.current.pause();
    else videoRef2.current.play();
    setIsPlaying2(!isPlaying2);
  };

  const service = jsonServiceData.find((item) => item.id === 3);

  if (!service) {
    return <div className="p-6 text-center">Service not found</div>;
  }

  return (
    <section className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-20 ">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px]">
        <div className="block md:hidden">
          <div className="relative aspect-[580/415] rounded-xl overflow-hidden">
            <video
              ref={videoRef1}
              src="/videos/Cinematic.mp4"
              poster={poster1.src}
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center transition" onClick={handlePlayPause1}>
              {!isPlaying1 && (
                <div className="border border-white/40 bg-white/30 p-[10px] rounded-full backdrop-blur-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 3L19 12L5 21V3Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
            <div className="absolute bottom-2 right-2 bg-white/50 text-bkack text-[12px] leading-[12px] px-2 py-0.5 rounded">
              01:20
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-primary text-[14px] font-medium">{service?.category}</p>
            <h1 className="text-[#212529] fonr-medium text-[32px] md:text-[40px] lg:text-[48px]">{service?.title}</h1>
          </div>

          <p className="text-[#495057] text-[16px]">{service?.description}</p>

          <div className="flex gap-2">
            <div onClick={handleNewOrder} className="btn-primary w-[163px]">
              Place an order
            </div>
            <div className="btn-secondary">Pricing</div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="relative aspect-[580/415] rounded-xl overflow-hidden">
            <video
              ref={videoRef1}
              src="/videos/Cinematic.mp4"
              poster={poster1.src}
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center transition" onClick={handlePlayPause1}>
              {!isPlaying1 && (
                <div className="border border-white/40 bg-white/30 p-[10px] rounded-full backdrop-blur-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 3L19 12L5 21V3Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
            <div className="absolute bottom-2 right-2 bg-white/50 text-bkack text-[12px] leading-[12px] px-2 py-0.5 rounded">
              01:20
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px]">
        <div className="block md:hidden">
          <div className="relative aspect-[580/415] rounded-xl overflow-hidden">
            <video
              ref={videoRef2}
              src="/videos/2038DaturaSt.mp4"
              poster={poster2.src}
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center transition" onClick={handlePlayPause2}>
              {!isPlaying2 && (
                <div className="border border-white/40 bg-white/30 p-[10px] rounded-full backdrop-blur-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 3L19 12L5 21V3Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
            <div className="absolute bottom-2 right-2 bg-white/50 text-bkack text-[12px] leading-[12px] px-2 py-0.5 rounded">
              01:20
            </div>
          </div>{" "}
        </div>

        <div className="hidden md:block">
          <div className="relative aspect-[580/415] rounded-xl overflow-hidden">
            <video
              ref={videoRef2}
              src="/videos/2038DaturaSt.mp4"
              poster={poster2.src}
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center transition" onClick={handlePlayPause2}>
              {!isPlaying2 && (
                <div className="border border-white/40 bg-white/30 p-[10px] rounded-full backdrop-blur-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 3L19 12L5 21V3Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
            <div className="absolute bottom-2 right-2 bg-white/50 text-bkack text-[12px] leading-[12px] px-2 py-0.5 rounded">
              01:20
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[#212529] font-medium text-[20px] md:text-[32px] lg:text-[36px]">
            What are Video Editing services?
          </h2>

          <div className="flex flex-col gap-4 text-[#495057] text-[16px]">
            <div className="flex flex-col gap-3">
              <p className="text-[#495057] text-[16px]">
                In today&apos;s market, real estate videos have become a powerful tool for businesses and agents to
                attract attention and drive sales.
              </p>

              <p className="text-[#495057] text-[16px]">
                They allow potential buyers or renters to experience a property in an authentic and engaging way before
                making a decision. By presenting a space with warmth, real estate videos create a natural emotional
                connection that still photos simply cannot match.
              </p>
            </div>
          </div>

          <div onClick={handleNewOrder} className="btn-primary w-[163px]">
            Place an order
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
