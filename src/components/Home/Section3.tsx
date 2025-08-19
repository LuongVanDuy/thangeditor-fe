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
    desc: "Make your real estate marketing campaign shine without breaking the bank.",
  },
  {
    img: icon2,
    title: "Fast turnaround",
    desc: "Get your edited photos in just 24–48 hours, because time is of the essence in real estate.",
  },
  {
    img: icon3,
    title: "No sign-up required",
    desc: "Send us any project, any time, any size, with no monthly commitment.",
  },
  {
    img: icon4,
    title: "24/7 Expert support",
    desc: "Our friendly team is always available via live chat, phone or email.",
  },
  {
    img: icon5,
    title: "Easy payment",
    desc: "Pay quickly and securely with our simple payment methods, making transactions effortless for you.",
  },
  {
    img: icon6,
    title: "First photo free",
    desc: "Try our service for free the first time and see the difference for yourself.",
  },
];

const HomeSection3 = () => {
  return (
    <div className="bg-brand">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h2 className="text-[24px] text-white mđ:text-[30px] lg:text-[36px] font-medium text-center">
          Why choose my service?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-10">
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
