"use client";

import React, { useState } from "react";
import OrderBtn from "@/components/Dashboard/OrderBtn";
import ServiceCard from "@/components/Services/ServiceCard";
import { jsonServiceData } from "@/lib/constants";

const Services = () => {
  const [currentTab, setCurrentTab] = useState("");

  const filteredData = jsonServiceData.filter((item) => {
    return currentTab === "" || item.category === currentTab;
  });

  return (
    <div className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6 min-h-[calc(100vh-24px)]">
      <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
        <h1 className="text-[#212529] font-medium text-[24px]">Place a new order</h1>
        <div className="hidden md:flex gap-3">
          <OrderBtn />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-0">
          {filteredData.map((item, index) => {
            let beforeSrc = null;
            let afterSrc = null;

            if (item?.images?.[0]) {
              const firstImg = item.images[0];

              if (firstImg.beforeUrl) {
                beforeSrc = require(`@/assets/${firstImg.beforeUrl.split("/").pop()}`).default.src;
              }

              if (firstImg.afterUrl) {
                afterSrc = require(`@/assets/${firstImg.afterUrl.split("/").pop()}`).default.src;
              }
            }

            return (
              <div key={index}>
                <ServiceCard
                  title={item.title}
                  category={item.category}
                  desc={item.desc}
                  slug={item.slug}
                  beforeUrl={beforeSrc}
                  afterUrl={afterSrc}
                  small={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
