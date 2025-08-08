"use client";

import ServiceCard from "@/components/Services/ServiceCard";
import { jsonServiceData } from "@/lib/constants";
import React, { useState } from "react";

const Services = () => {
  const [currentTab, setCurrentTab] = useState("");

  const filteredData = jsonServiceData.filter((item) => {
    return currentTab === "" || item.category === currentTab;
  });

  return (
    <div className="sm:pl-4 sm:pr-4 lg:pl-[64px] lg:pr-[64px] xl:pl-[108px] xl:pr-[108px] pb-[64px] py-12 flex flex-col gap-6 md:gap-9 lg:gap-12">
      <h1 className=" font-medium sm:text-[32px] md:text-[40px] lg:text-[48px]">All services</h1>

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
