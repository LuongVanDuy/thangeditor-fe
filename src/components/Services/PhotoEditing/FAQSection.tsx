"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Collapse } from "antd";
import Link from "next/link";
import styled from "styled-components";

import bg from "@/assets/bg.png";
import close from "@/assets/closeIcon.svg";
import open from "@/assets/openIcon.svg";
import avatar from "@/assets/Avatar group.svg";

const { Panel } = Collapse;

const items: any[] = [
  {
    key: "1",
    label: "Why HDR and Flambient Photo Editing Are Becoming Popular in the Real Estate Industry?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        HDR and Flambient photo editing technologies are becoming increasingly popular in the real estate industry
        because they create images that are both visually impressive. Both techniques produce sharp images, accurate
        colors, and a warm atmosphere. This helps agents attract more buyers and close deals faster.
      </div>
    ),
    showArrow: false,
  },
  {
    key: "2",
    label: "HDR or Flambient — Which is Better?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        <p className="mb-5">
          Both methods have their own strengths. HDR is useful when there are bright windows looking out or when the
          scene has high contrast, because HDR preserves detail in both the highlights and shadows.
        </p>
        <p className="mb-5">
          <strong>HDR disadvantages:</strong> prone to ghosting if there is a moving object, sometimes looks a bit
          “flat” if over-processed, and takes a lot of time in post-production.
        </p>
        <p className="mb-5">
          Flambient has better control over light: sharper images, less noise because of low ISO, and more natural
          colors. But requires tools (flash/softbox) and lighting skills to avoid annoying shadows or reflections.
        </p>
        <p>
          So, each method has its own advantages and disadvantages, the important thing is that you know how to apply it
          appropriately in practice.
        </p>
      </div>
    ),
    showArrow: false,
  },
  {
    key: "3",
    label: "How HDR and Flambient Help Sell Your Homes",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Make a Strong First Impression:</strong> High-quality, eye-catching photos increase viewing rates.
          </li>
          <li>
            <strong>Convey the Value of Your Home:</strong> Images with accurate lighting and color balance help buyers
            understand the space, materials, and true condition of the property.
          </li>
          <li>
            <strong>Stimulate Emotion and Action:</strong> Photos are warm, crisp, and connect emotionally with viewers
            — increasing the likelihood of contacting, scheduling a viewing, or making an offer.
          </li>
          <li>
            <strong>Grow Credibility for Sellers/Agents:</strong> Professional photos reflect your brand.
          </li>
          <li>
            <strong>Support Better Advertising:</strong> Good photos and videos perform better on social media and paid
            advertising, leading to higher engagement and conversion rates.
          </li>
        </ul>
      </div>
    ),
    showArrow: false,
  },
];

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header-text {
    color: #212529;
    font-weight: 500;
    font-size: 16px;
  }

  .ant-collapse-header {
    padding: 0 !important;
    margin-bottom: 8px;
  }
`;

const StyledPanel = styled(Panel)``;

const FAQSection = () => {
  const [activeKey, setActiveKey] = useState<string[]>(["1"]);

  return (
    <section
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 lg:gap-[64px]">
        <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Frequently asked questions
        </h2>

        <StyledCollapse
          defaultActiveKey={["1"]}
          onChange={(key) => setActiveKey(key)}
          ghost
          className="flex flex-col gap-6 md:gap-8 w-full lg:w-[808px] mx-auto"
        >
          {items.map((item) => (
            <StyledPanel
              header={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.label}
                  <Image
                    src={activeKey.includes(item.key) ? close : open}
                    alt="toggle-icon"
                    height={24}
                    width={24}
                    className="collapse-icon"
                  />
                </div>
              }
              key={item.key}
              showArrow={item.showArrow}
            >
              <div>{item.children}</div>
            </StyledPanel>
          ))}
        </StyledCollapse>

        <div className="bg-white rounded-2xl p-8 gap-8 flex flex-col mx-0 md:mx-8">
          <div className="mx-auto">
            <Image src={avatar} alt="avatar" width={120} height={56} />
          </div>

          <div className="text-center">
            <h3 className="font-medium text-[20px]">Still have questions?</h3>
            <p className="text-[#495057] text-[18px]">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
            </p>
          </div>

          <Link href={"/contact"} className="btn-primary h-12 w-[114px] mx-auto">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
