"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";

import img1 from "@/assets/Widget.svg";
import img2 from "@/assets/Widget2.svg";
import img3 from "@/assets/Widget3.svg";

const Third = () => {
  const router = useRouter();
  const { mutate: genOIDMutation, isLoading: isGenering } = useMutation(["OID"], () => generateOrderId(), {
    onSuccess: (data: any) => {
      const oid = data?.id;
      router.push(`/dashboard/order/create-order?oid=${oid}`);
    },
    onError: (error: any) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = () => {
    genOIDMutation();
  };
  return (
    <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
        How to order virtual staging
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-stretch">
        {/* 1 */}
        <div className="flex-1 border-[1px] border-[#FFF046] bg-[#FFFEEA] px-4 pt-6 md:pt-12 md:px-9 sm:rounded-t-2xl lg:rounded-bl-2xl lg:rounded-t-none gap-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase text-primary font-medium text-[14px]">Step 1</h1>
            <h2 className="text-[#212529] font-medium text-[20px] md:text-[24px]">Submit your photo</h2>
            <h3 className="text-[#343A40] text-[14px] md:text-[16px]">
              Please submit your image link and select style from the order screen
            </h3>
          </div>
          <div className="mx-auto mt-auto">
            <Image src={img1} alt="widget" className="w-[325px] h-auto" />
          </div>
        </div>

        {/* 2 */}
        <div className="flex-1 border-[1px] border-primary bg-primary px-4 pt-6 md:pt-12 md:px-9 gap-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase text-[#fff] font-medium text-[14px]">Step 2</h1>
            <h2 className="text-[#fff] font-medium text-[20px] md:text-[24px]">Edited by Vamedi</h2>
            <h3 className="text-[#fff] text-[14px] md:text-[16px]">Vamedi will do the best editing of your images.</h3>
          </div>
          <div className="mx-auto mt-auto">
            <Image src={img2} alt="widget" className="w-[325px] h-auto" />
          </div>
        </div>

        {/* 3 */}
        <div className="flex-1 border-[1px] border-[#FFF046] bg-[#FFFEEA] px-4 pt-6 md:pt-12 md:px-9 sm:rounded-b-2xl lg:rounded-tr-2xl lg:rounded-b-none gap-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase text-primary font-medium text-[14px]">Step 3</h1>
            <h2 className="text-[#212529] font-medium text-[20px] md:text-[24px]">Get them delivered!</h2>
            <h3 className="text-[#343A40] text-[14px] md:text-[16px]">
              We will resend the edited images within 12-48 hours in the Vamedi dashboard
            </h3>
          </div>
          <div className="mx-auto mt-auto">
            <Image src={img3} alt="widget" className="w-[325px] h-auto" />
          </div>
        </div>
      </div>

      <div onClick={handleNewOrder} className="btn-primary w-full xs:w-[163px] mx-auto">
        Place an order
      </div>
    </div>
  );
};

export default Third;
