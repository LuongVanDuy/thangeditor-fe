import React from "react";

import bg from "@/assets/bg.png";

import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/clock.svg";
import icon3 from "@/assets/circle-slash-2.svg";
import icon4 from "@/assets/headset.svg";
import icon5 from "@/assets/credit-card.svg";
import icon6 from "@/assets/image-up.svg";
import Image from "next/image";

const cards = [
  {
    img: icon1,
    title: "Unbeatable prices",
    desc: "Optimize your campaigns to make money for you.",
  },
  {
    img: icon2,
    title: "Fast turnaround",
    desc: "Editing time is only within 12-24 hours, time is of the essence in real estate",
  },
  {
    img: icon3,
    title: "No sign-up required",
    desc: "Send us any wishes and projects I will fulfill them all.",
  },
  {
    img: icon4,
    title: "24/7 Expert support",
    desc: "Our support team is available 24/7",
  },
  {
    img: icon5,
    title: "Easy payment",
    desc: "You do not need to pay in advance until you receive your order.",
  },
  {
    img: icon6,
    title: "First photo free",
    desc: "Your first order is free. Contact us now.",
  },
];

const HomeSection3 = () => {
  return (
    <div className="bg-brand">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h2 className="text-[24px] text-white mđ:text-[30px] lg:text-[36px] font-medium text-center">
          Why choose my service?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-4 md:p-10">
              <div className="flex justify-start  md:justify-center items-center">
                <div className="h-[48px] w-[48px] border-[4px] border-green-200 rounded-full flex justify-center items-center">
                  <div className="h-full w-full bg-brand rounded-full flex justify-center items-center">
                    <Image src={card.img} alt="icon" height={24} width={24} />
                  </div>
                </div>
              </div>
              <div className="text-start md:text-center mt-5">
                <h3 className="text-[#212529] font-medium sm:text-[18px] md:text-[20px] mb-2">{card.title}</h3>
                <p className="text-[#495057]">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
