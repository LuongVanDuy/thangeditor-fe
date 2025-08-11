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
    label: "What is Virtual Staging?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        <p className="mb-5">
          Virtual staging is an advanced real estate marketing tool that uses technology to transform empty spaces into
          beautifully furnished spaces. This method saves you money and time compared to traditional staging.
        </p>
        <p>
          Our skilled editors will add furniture, decorations, lighting, and color accents that are uniquely tailored to
          your property. As a result, we create realistic images that highlight your property. This helps buyers
          visualize the space, connect emotionally, and picture themselves living there.
        </p>
      </div>
    ),
    showArrow: false,
  },
  {
    key: "2",
    label: "Can virtual staging help sell a property faster?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        Virtual staging can help sell a property faster. According to the Real Estate Staging Association, staged homes
        sell 73% faster than non-staged homes. In addition, virtual staging can help increase the value of a property.
      </div>
    ),
    showArrow: false,
  },
  {
    key: "3",
    label: "Where can I use virtual staging photos?",
    children: (
      <div className="text-[#6C757D] text-[16px]">
        Once you receive your virtual staging photos, you can use them anytime, anywhere. Add them to your individual
        property website, feature them in brochures, post them on social media, or print them for posters and flyers.
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
            <h1 className="font-medium text-[20px]">Still have questions?</h1>
            <h1 className="text-[#495057] text-[18px]">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
            </h1>
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
