"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Collapse } from "antd";
import styled from "styled-components";

import bg from "@/assets/bg.png";
import close from "@/assets/closeIcon.svg";
import open from "@/assets/openIcon.svg";
import avatar from "@/assets/Avatar group.svg";

const { Panel } = Collapse;

const items: any[] = [
  {
    key: "1",
    label: "What is real estate video editing?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        <p className="mb-5">
          Real estate video editing is the process of refining raw footage of a property into a polished, professional,
          and engaging video that appeals to potential buyers or renters.
        </p>
        <p className="mb-5">This process typically involves:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Cutting and arranging footage to show the best angles of the property.</li>
          <li>Correcting color and lighting to make rooms look bright and inviting.</li>
          <li>Adding smooth transitions for a seamless viewing experience.</li>
          <li>Adding background music, voiceovers, or text overlays to add more life.</li>
        </ul>
        <p className="mt-5">
          The goal is to present the property in the most engaging way possible, giving viewers a sense of authenticity
          and emotional appeal.
        </p>
      </div>
    ),
    showArrow: false,
  },
  {
    key: "2",
    label: "Does video help sell real estate?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        <p className="mb-5">
          Absolutely. Real estate videos are a highly effective marketing tool that can help sell properties faster and
          for more money. Research shows that 73% of homeowners are more likely to choose agents who use video
          marketing.
        </p>
        <p className="mb-5">
          Furthermore, according to the National Association of Realtors, only 14% of agents use video. 45% of
          homebuyers find video tours extremely helpful, and more than half of them actively seek out real estate videos
          when they are looking to buy.
        </p>
        <p>As such, video engages both sellers and buyers, strengthens listings, and drives sales.</p>
      </div>
    ),
    showArrow: false,
  },
  {
    key: "3",
    label: "What are the different types of real estate videos?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        <p className="mb-5">Common real estate video formats include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Property listing videos:</strong> Showcase the amenities or features of a property for sale or rent
            with a professionally edited, eye-catching video.
          </li>
          <li>
            <strong>Testimonials:</strong> The best way to build trust and credibility with potential buyers. It gives
            them an objective look at what previous buyers have to say.
          </li>
          <li>
            <strong>Neighborhood videos:</strong> Highlight local amenities, schools, and attractions to add value to
            your listing. This is one of the most important factors influencing a buyer&apos;s decision.
          </li>
          <li>
            <strong>Real estate tips videos:</strong> Share practical advice for people in the form of tips. For
            example, tips on staging your home in style or finding the right real estate agent.
          </li>
          <li>
            <strong>Guided tour videos:</strong> Provide guided tours of a property to encourage research and in-person
            visits. These videos help buyers visualize what it would be like to live in that home.
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
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 lg:gap-[64px]">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Frequently asked questions
        </h1>

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
            <h1 className="font-medium text-[20px]">Still have questions?</h1>
            <h1 className="text-[#495057] text-[18px]">
              Can’t find the answer you’re looking for? Please chat to our friendly team.
            </h1>
          </div>

          <div className="btn-primary h-12 w-[114px] mx-auto">Contact</div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
