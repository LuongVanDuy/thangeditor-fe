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
    title: "Property Video Editing",
    price: 30,
    unit: "per video",
    desc: "Share your property video footages and allow us to stitch them together to create a high-quality real estate video that can help your clients virtually walk through the property.",
    img: img2,
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
