"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import zap from "@/assets/zap.svg";
import img1 from "@/assets/Video1.png";
import img2 from "@/assets/Video2.png";
import img3 from "@/assets/Video3.png";

import poster1 from "@/assets/poster-1.png";

const videoEditingPackages = [
  {
    icon: zap,
    title: "Real Estate Reels: Mobile-friendly videos",
    price: 60,
    unit: "per video",
    desc: "Stylish, fast-paced vertical reels crafted for social media. Boost your marketing with affordable, eye-catching visuals perfect for scrolling feeds.",
    note: "*Additional charges apply: $10 per 5GB over 20GB and $20 per additional 30 seconds. Contact us for videos over 50GB.",
    img: img1,
  },
  {
    icon: zap,
    title: "Property Video Editing",
    price: 80,
    unit: "per video",
    desc: "Share your property video footages and allow us to stitch them together to create a high-quality real estate video that can help your clients virtually walk through the property.",
    note: "*Additional charges apply: $10 per 5GB over 20GB and $20 for every 30 sec exceeding 3 min. Contact us for videos over 50GB or 5 min.",
    img: img2,
  },
  {
    icon: zap,
    title: "Drone Video Editing",
    price: 60,
    unit: "per video",
    desc: "Send your raw aerial drone footage and let our drone video editors stitch them up and turn the video into a real estate marketing masterpiece.",
    note: "*Additional charges apply: $10 per 5GB over 20GB and $20 per additional 30 seconds. Contact us for videos over 50GB.",
    img: img3,
  },
];

const PricingSection = () => {
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

  const videoRef = useRef<any>([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlayPause = (idx: any) => {
    const video = videoRef.current[idx];
    if (!video) return;

    if (playingIndex === idx) {
      video.pause();
      setPlayingIndex(null);
    } else {
      // Pause video đang chơi nếu có
      if (playingIndex !== null && videoRef.current[playingIndex]) {
        videoRef.current[playingIndex].pause();
      }
      video.play();
      setPlayingIndex(idx);
    }
  };

  return (
    <section className="bg-[#FDC101]">
      <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Real Estate Video Editing Services at the Best Prices
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {videoEditingPackages.map((pkg, idx) => (
            <div key={idx} className="flex flex-col h-full">
              <div className="w-auto xs:w-[386px] border border-b-0 border-[#f4f4f4] bg-white p-6 md:p-8 rounded-t-2xl gap-6 flex flex-col flex-1">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <div className="h-[40px] w-[40px] border-[4px] border-third rounded-full flex justify-center items-center mb-5">
                      <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                        <Image src={pkg.icon} alt="icon" height={20} width={20} />
                      </div>
                    </div>
                    <h2 className="text-primary uppercase text-[12px] font-medium">{pkg.title}</h2>
                  </div>

                  <h3 className="text-[#6C757D] text-[18px]">
                    <span className="text-[#212529] font-medium text-[36px]">${pkg.price}</span> {pkg.unit}
                  </h3>

                  <p className="text-[#6c757d] text-[16px]">{pkg.desc}</p>
                  <p className="text-[#495057] text-[14px] mb-[48px] md:mb-[56px]">{pkg.note}</p>
                </div>

                <div className="-m-6 md:-m-8 mt-auto">
                  <div className="relative aspect-[580/415] rounded-xl overflow-hidden">
                    <video
                      ref={(el: any) => (videoRef.current[idx] = el)}
                      src="/videos/video-editor_hero.mp4"
                      poster={poster1.src}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute inset-0 flex items-center justify-center transition"
                      onClick={() => handlePlayPause(idx)}
                    >
                      {playingIndex !== idx && (
                        <div className="border border-white/40 bg-white/30 p-[10px] rounded-full backdrop-blur-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                          <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M5 3L19 12L5 21V3Z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </button>
                    <div className="absolute bottom-2 right-2 bg-white/50 text-black text-[12px] leading-[12px] px-2 py-0.5 rounded">
                      01:20
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-b-2xl">
                <div onClick={handleNewOrder} className="btn-primary">
                  Place an order
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
