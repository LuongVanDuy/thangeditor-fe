"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import help from "@/assets/help-circle.svg";
import star from "@/assets/star.svg";
import checked from "@/assets/Checked.svg";
import { generateOrderId } from "@/lib/api/order.api";
import CompareImg from "@/components/Form/Compare";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import hdr1 from "@/assets/hdr-5.jpg";
import hdr2 from "@/assets/hdr-6.jpg";
import hdr3 from "@/assets/hdr-7.jpg";
import hdr4 from "@/assets/hdr-8.jpg";

const DifferenceSection = () => {
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
    <section className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
      <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">See the difference</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px] px-0 xl:px-8">
        <div className="block md:hidden">
          <div className="rounded-2xl relative max-w-[1540px]">
            <div className="relative w-full aspect-[510/382] overflow-hidden no-swipe rounded-2xl">
              <CompareSlider beforeImage={hdr1.src} afterImage={hdr2.src} />;
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-row md:flex-col gap-6 items-center md:items-baseline">
            <div className="h-[48px] w-[48px] border-[4px] border-green-200 rounded-full flex flex-shrink-0 justify-center items-center">
              <div className="h-full w-full bg-brand rounded-full flex justify-center items-center">
                <Image src={help} alt="icon" height={24} width={24} />
              </div>
            </div>
            <h2 className="text-[#212529] font-medium text-[20px] md:text-[32px]">HDR </h2>
          </div>

          <p className="text-[#495057] text-[16px]">
            HDR photography is perfect for real estate because it captures every detail with balanced light and dark,
            bringing each room and exterior to life. Highlighting outstanding features, giving buyers a true look at the
            property. Accuracy in detail helps the property stand out and attract great interest.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="rounded-2xl relative max-w-[1540px]">
            <div className="relative w-full aspect-[510/382] overflow-hidden no-swipe rounded-2xl">
              <CompareSlider beforeImage={hdr1.src} afterImage={hdr2.src} />;
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px] px-0 xl:px-8">
        <div className="">
          <div className="rounded-2xl relative max-w-[1540px]">
            <div className="relative w-full aspect-[510/382] overflow-hidden no-swipe rounded-2xl">
              <CompareSlider beforeImage={hdr3.src} afterImage={hdr4.src} />;
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-row md:flex-col gap-6 items-center md:items-baseline">
            <div className="h-[48px] w-[48px] border-[4px] border-green-200 rounded-full flex flex-shrink-0 justify-center items-center">
              <div className="h-full w-full bg-brand rounded-full flex justify-center items-center">
                <Image src={star} alt="icon" height={24} width={24} />
              </div>
            </div>
            <h2 className="text-[#212529] fonr-medium text-[20px] md:text-[32px]">Flambient</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="text-[#495057] text-[16px]">
                Flambient photography combines flash and ambient light to create bright, balanced images with sharp
                details and true-to-life colors. This method avoids overexposed windows, eliminates noise, and reduces
                shadows. The outcome is inviting, high-quality photos that showcase properties at their best.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div onClick={handleNewOrder} className="btn-primary w-full xs:w-[163px] mx-auto">
        Place an order
      </div>
    </section>
  );
};

export default DifferenceSection;
