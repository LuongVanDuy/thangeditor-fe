"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/clock.svg";
import icon3 from "@/assets/circle-slash-2.svg";
import icon4 from "@/assets/userService.svg";
import icon5 from "@/assets/credit-card.svg";
import icon6 from "@/assets/image-up.svg";
import Image from "next/image";

const features = [
  {
    img: icon1,
    title: "Sell Your Property Faster",
    desc: "Help buyers visualize their dream home before they even walk in. Our virtual staging service helps make your space more appealing.",
  },
  {
    img: icon2,
    title: "Get a Higher Selling Price",
    desc: "Showcase your property's full potential, help you command a higher price, and attract serious buyers.",
  },
  {
    img: icon3,
    title: "Increase Listing Appeal",
    desc: "Turn empty rooms into cozy, inviting spaces that attract attention online and inspire in-person visits.",
  },
  {
    img: icon4,
    title: "Cost-Effective Staging",
    desc: "Skip the expensive costs of traditional staging. Get the same great results at a fraction of the price.",
  },
  {
    img: icon5,
    title: "Create a Competitive Edge",
    desc: "Stand out in a crowded marketplace with modern, authentic imagery that leaves a lasting impression.",
  },
  {
    img: icon6,
    title: "Endless Design Possibilities",
    desc: "From modern luxury to classic elegance, customize each space to suit your ideal buyer's taste.",
  },
];

const BenefitsSection = () => {
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
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Benefits of Virtually staged property
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div key={index}>
              <div className="flex justify-start md:justify-center items-center">
                <div className="h-[48px] w-[48px] border-[4px] border-green-200 rounded-full flex justify-center items-center">
                  <div className="h-full w-full bg-brand rounded-full flex justify-center items-center">
                    <Image src={item.img} alt="icon" height={24} width={24} />
                  </div>
                </div>
              </div>
              <div className="text-start md:text-center mt-5">
                <h1 className="text-[#212529] font-medium sm:text-[18px] md:text-[20px] mb-2">{item.title}</h1>
                <h2 className="text-[#495057]">{item.desc}</h2>
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

export default BenefitsSection;
