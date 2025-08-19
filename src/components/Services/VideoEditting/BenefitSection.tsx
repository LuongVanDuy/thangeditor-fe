"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/eyeService.svg";
import icon3 from "@/assets/cameraService.svg";
import icon4 from "@/assets/smile.svg";
import Image from "next/image";

const cardData = [
  {
    img: icon1,
    title: "Drive Sales Faster",
    desc: "Increase sales with our professional real estate video editing services and position your property for a higher selling price.",
  },
  {
    img: icon2,
    title: "Grab Powerful Attention",
    desc: "Research shows that dynamic videos outperform still images in attracting and retaining homebuyers.",
  },
  {
    img: icon3,
    title: "Generate High-Quality Leads",
    desc: "Don't be shy about posting your real estate videos online. We'll create engaging edits that will attract potential buyers online.",
  },
  {
    img: icon4,
    title: "Make an Emotional Connection",
    desc: "Showcase your property in a warm and authentic way, bringing viewers to life and immersing them in the property.",
  },
];

const BenefitSection = () => {
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

  return (
    <section className="bg-brandSoft">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Why choose Video Editing Services?
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-start md:justify-center items-center">
                <div className="h-[48px] w-[48px] border-[4px] border-green-200 rounded-full flex justify-center items-center">
                  <div className="h-full w-full bg-brand rounded-full flex justify-center items-center">
                    <Image src={item.img} alt={item.title} height={24} width={24} />
                  </div>
                </div>
              </div>
              <div className="text-start md:text-center mt-5">
                <h3 className="text-[#212529] font-medium sm:text-[18px] md:text-[20px] mb-2">{item.title}</h3>
                <p className="text-[#495057]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div onClick={handleNewOrder} className="btn-primary w-full xs:w-[163px] mx-auto">
          Place an order
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
