"use client";

import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import { generateOrderId } from "@/lib/api/order.api";
import { jsonServiceData } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

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

  const service = jsonServiceData.find((item) => item.id === 2);

  if (!service) {
    return <div className="p-6 text-center">Service not found</div>;
  }

  return (
    <section>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-brand text-[14px] font-medium">{service.category}</p>
            <h1 className="text-[#212529] font-medium text-[32px] md:text-[40px] lg:text-[48px]">{service.title}</h1>
          </div>

          <p className="text-[#495057] text-[16px] max-w-[800px] mx-auto md:mx-0">{service.description}</p>

          <div className="flex gap-2">
            <div onClick={handleNewOrder} className="btn-primary w-[163px]">
              Place an order
            </div>
            <div className="btn-secondary">Pricing</div>
          </div>
        </div>
      </div>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[24px] flex flex-col gap-9 md:gap-12 ">
        <div className="rounded-2xl overflow-hidden relative mx-0">
          {service?.images?.[1] &&
            (() => {
              const firstImg = service.images[1]!;
              const beforeSrc = require(`@/assets/${firstImg.beforeUrl.split("/").pop()}`).default.src;
              const afterSrc = require(`@/assets/${firstImg.afterUrl.split("/").pop()}`).default.src;

              return (
                <div className="relative w-full aspect-[600/345] md:aspect-[1392/589] rounded-xl overflow-hidden shadow-xl">
                  <CompareSlider beforeImage={beforeSrc} afterImage={afterSrc} />
                </div>
              );
            })()}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
