"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/lib/api/order.api";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";

interface CardProps {
  title: string;
  className?: string;
  category: string;
  slug: string;
  desc: string;
  style?: string;
  beforeUrl?: any;
  afterUrl?: any;
  small?: boolean;
}

const ServiceCard: React.FC<CardProps> = ({
  title,
  className,
  category,
  slug,
  desc,
  style,
  beforeUrl,
  afterUrl,
  small = false,
}) => {
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

  const serviceUrl = `/services/${slug}`;

  return (
    <div className={`rounded-2xl overflow-hidden ${style} shadow-md ${className}`}>
      <div className="relative max-w-[1540px]">
        <div className="relative w-full aspect-[600/345] overflow-hidden no-swipe">
          {beforeUrl && afterUrl ? (
            <CompareSlider beforeImage={beforeUrl} afterImage={afterUrl} />
          ) : (
            <img src={beforeUrl} alt="Before" className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      <div className={`gap-9 md:gap-10 lg:gap-12 flex flex-col ${small ? "p-2 md:p-3 lg:p-4" : "p-4 md:p-6 lg:p-9"}`}>
        <div>
          <h3 className="text-primary text-[12px] uppercase tracking-wide">{category}</h3>
          <Link
            href={serviceUrl}
            title={`${title} - ${category}`}
            aria-label={`Learn more about ${title}`}
            className={`font-medium mt-2 mb-4 block ${
              small ? "text-[18px] md:text-[22px] lg:text-[26px]" : "text-[24px] md:text-[28px] lg:text-[32px]"
            }`}
          >
            <h2 className="font-medium text-inherit">{title}</h2>
          </Link>
          <p className="text-[#0000008F]">{desc}</p>
        </div>

        <div>
          <p className="text-[#000000CC] text-[14px] block md:hidden mb-4">
            Starting from{" "}
            <span className="text-primary" itemProp="price">
              $16
            </span>
          </p>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleNewOrder(title)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg border border-primary font-medium text-primary cursor-pointer hover:opacity-80 ${
                small ? "text-sm md:text-base" : ""
              }`}
              aria-label={`Place an order for ${title}`}
            >
              Place an order
            </button>

            <Link
              href={serviceUrl}
              title={`Learn more about ${title}`}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg border border-[#DEE2E6] font-medium text-[#343A40] cursor-pointer hover:opacity-80 ${
                small ? "text-sm md:text-base" : ""
              }`}
            >
              Learn more
            </Link>

            <p className="text-[#000000CC] text-[14px] hidden md:block">
              Starting from{" "}
              <span className="text-primary" itemProp="price">
                $16
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
