"use client";

import React from "react";
import OrderBtn from "@/components/Dashboard/OrderBtn";
import Card from "@/components/Dashboard/Services/ServiceCard";

const data = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: "Help buyers fall in love with your listings by turning vacant rooms into stylish spaces.",
    slug: "virtual-staging-renovation",
    from: 12.0,
    to: 25.0,
  },
  {
    title: "Occupied to Vacant",
    categories: "Photo Editing",
    desc: "Remove outdated or cluttered items to make your listing photos cleaner and more attractive.",
    slug: "photo-editing",
    from: 2.5,
    to: 4.0,
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    desc: "Create a real estate video to gain prospects' attention and sell their listings faster.",
    slug: "video-editing",
    from: 30.0,
    to: 65.0,
  },
];

const Services = () => {
  return (
    <div className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6 min-h-[calc(100vh-24px)]">
      <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
        <h1 className="text-[#212529] font-medium text-[24px]">Place a new order</h1>
        <div className="hidden md:flex gap-3">
          <OrderBtn />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2  gap-4 md:gap-4 mb-4 md:mb-0">
          {data.map((item, index) => (
            <div key={index}>
              <Card title={item.title} categories={item.categories} desc={item.desc} slug={item.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
