"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/eyeService.svg";
import icon3 from "@/assets/cameraService.svg";
import icon4 from "@/assets/smile.svg";
import { generateOrderId } from "@/lib/api/order.api";
import Image from "next/image";

const cardData = [
  {
    img: icon1,
    title: "Get higher sale price",
    desc: "With our professional staging services see your listings attract more buyers and fetch higher selling prices",
  },
  {
    img: icon2,
    title: "All eyes on you",
    desc: "It is statistically proven that home buyers tend to choose listings with professional photos and they sell faster.",
  },
  {
    img: icon3,
    title: "Go from no to pro",
    desc: "Go online. Go virtual. Let your imaging and our staging do the rest. Go and grab the attention of your buyers.",
  },
  {
    img: icon4,
    title: "Drab to fab",
    desc: "Transform your ordinary listing, into a property that your potential buyers can envision as their dream home.",
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
    <section className="bg-[#FFFEEA]">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">What are the Benefits?</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-start md:justify-center items-center">
                <div className="h-[48px] w-[48px] border-[4px] border-third rounded-full flex justify-center items-center">
                  <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
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

export default BenefitSection;
