"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import bg from "@/assets/mediumBanner.png";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";

import after1 from "@/assets/virtual-after.jpg";
import before1 from "@/assets/virtual-before.jpg";
import { generateOrderId } from "@/lib/api/order.api";
import { StaticImageData } from "next/image";

interface CardProps {
  title: string;
  img?: StaticImageData | string;
  categories: string;
  slug: string;
  desc: string;
}

const ServiceCard: React.FC<CardProps> = ({ title, img = bg, categories, slug, desc }) => {
  const router = useRouter();

  const { mutate: genOIDMutation } = useMutation({
    mutationFn: (title: any) => generateOrderId(),
    onSuccess: (data: any, variables) => {
      const oid = data?.id;
      const title = variables;
      const encodedTitle = encodeURIComponent(title);

      router.replace(`/dashboard/order/create-order?service=${encodedTitle}&oid=${oid}`);
    },
    onError: (error) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = (title: any) => {
    genOIDMutation(title);
  };

  return (
    <>
      <div className="rounded-2xl overflow-hidden shadow-md">
        <div className="relative max-w-[1540px]">
          <div className="relative w-full aspect-[600/345] overflow-hidden no-swipe">
            <CompareSlider beforeImage={after1.src} afterImage={before1.src} />
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-9 gap-6 flex flex-col">
          <div>
            <h1 className="text-primary text-[12px] uppercase">{categories}</h1>
            <Link href={`/services/${slug}`} className="font-medium text-[24px] mt-2 mb-4">
              {title}
            </Link>
            <h3 className="text-[#0000008F] text-[14px]">{desc}</h3>
          </div>
          <h1 className="text-[#000000CC] text-[14px]">
            Starting from <span className="text-primary">$16</span>
          </h1>

          <div>
            <div className="flex gap-4 items-center">
              <div
                onClick={() => handleNewOrder(title)}
                className="h-9 w-[134px] flex justify-center items-center rounded-lg font-medium text-primary cursor-pointer hover:opacity-80 border-[1px] border-solid border-primary"
              >
                Place an order
              </div>
              <Link
                href={`/services/${slug}`}
                className="h-9 w-[134px] flex justify-center items-center rounded-lg border-[1px] border-[#DEE2E6] font-medium text-[#343A40] cursor-pointer hover:opacity-80"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
