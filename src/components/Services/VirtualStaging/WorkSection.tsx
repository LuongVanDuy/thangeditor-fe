"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import img1 from "@/assets/Widget.svg";
import img2 from "@/assets/Widget2.svg";
import img3 from "@/assets/Widget3.svg";

const WorkSection = () => {
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
    <section className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
        How Does Virtual Staging Work?
      </h2>

      <div className="flex flex-col lg:flex-row justify-center items-stretch">
        <div className="flex-1 border-[1px] border-brand bg-brandSoft px-4 pt-6 md:pt-12 md:px-9 sm:rounded-t-2xl lg:rounded-bl-2xl lg:rounded-t-none gap-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <p className="uppercase text-brand font-medium text-[14px]">Step 1</p>
            <h3 className="text-[#212529] font-medium text-[20px] md:text-[24px]">Choose a style</h3>
            <p className="text-[#343A40] text-[14px] md:text-[16px]">
              Different homes need different styling: choose from multiple options to find the best fit for your
              listing.
            </p>
          </div>
          <div className="mx-auto mt-auto w-[95%]">
            <Image src={img1} alt="widget" className="w-full h-auto" />
          </div>
        </div>

        <div className="flex-1 border-[1px] border-brand bg-brand px-4 pt-6 md:pt-12 md:px-9 gap-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <p className="uppercase text-white font-medium text-[14px]">Step 2</p>
            <h3 className="text-white font-medium text-[20px] md:text-[24px]">Upload photos</h3>
            <p className="text-white text-[14px] md:text-[16px]">
              Whether adding professional photos or images you took yourself, use the easy upload feature to submit.
            </p>
          </div>
          <div className="mx-auto mt-auto w-[95%]">
            <Image src={img2} alt="widget" className="w-full h-auto" />
          </div>
        </div>

        <div className="flex-1 border-[1px] border-brand bg-brandSoft px-4 pt-6 md:pt-12 md:px-9 sm:rounded-b-2xl lg:rounded-tr-2xl lg:rounded-b-none gap-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <p className="uppercase text-brand font-medium text-[14px]">Step 3</p>
            <h3 className="text-[#212529] font-medium text-[20px] md:text-[24px]">Get them delivered!</h3>
            <p className="text-[#343A40] text-[14px] md:text-[16px]">
              Within 24–48 hours, your images will arrive in both your inbox and your Fixelphoto dashboard.
            </p>
          </div>
          <div className="mx-auto mt-auto w-[95%]">
            <Image src={img3} alt="widget" className="w-full h-auto" />
          </div>
        </div>
      </div>

      <div onClick={handleNewOrder} className="btn-primary w-full xs:w-[163px] mx-auto">
        Place an order
      </div>
    </section>
  );
};

export default WorkSection;
