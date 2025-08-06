"use client";

import Card from "@/components/Services/Card";
import React, { useState } from "react";

const data = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: "Virtual home staging helps showcase a property's true potential and helps buyers visualize their dream home.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Commercial Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: " Give buyers to visualize their business setup in a comfy & efficient environment.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Matterport Virtual Staging.",
    categories: "Virtual Staging & Renovation",
    desc: "Virtually stage your property link and create an immersive 3D walkthrough.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Virtual Renovation",
    categories: "Virtual Staging & Renovation",
    desc: " Virtually renovate your wall, ceiling, floor, kitchen, bathrooms etc.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Occupied to Vacant",
    categories: "Photo Editing",
    desc: "Remove dated or cluttered furnishings from your listing images.",
    slug: "photo-editing",
  },
  {
    title: "Day to Dusk",
    categories: "Photo Editing",
    desc: "Turn daylight home photos into eye catching dusk images.",
    slug: "photo-editing",
  },
  {
    title: "Object removal",
    categories: "Photo Editing",
    desc: "Remove unwanted or distracting items from your listing photos.",
    slug: "photo-editing",
  },
  {
    title: "Image Enhancement",
    categories: "Photo Editing",
    desc: " Brighten, sharpen, balance, and remove reflections in your listing photos.",
    slug: "photo-editing",
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    desc: "Create a real estate video to gain prospects' attention and sell their listings faster.",
    slug: "video-editing",
  },
];

const Services = () => {
  const [currentTab, setCurrentTab] = useState("");

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const filteredData = data.filter((item) => {
    return currentTab === "" || item.categories === currentTab;
  });

  return (
    <div className="sm:pl-4 sm:pr-4 lg:pl-[64px] lg:pr-[64px] xl:pl-[108px] xl:pr-[108px] pb-[64px] py-12 flex flex-col gap-6 md:gap-9 lg:gap-12">
      <h1 className=" font-medium sm:text-[32px] md:text-[40px] lg:text-[48px]">All services</h1>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-0">
          {filteredData.map((item, index) => (
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
