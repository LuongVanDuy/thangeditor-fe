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
    desc: "We want to be a reputable partner with the most optimal costs",
  },
  {
    img: icon2,
    title: "Fast turnarounds",
    desc: "Time is your necessity and we always understand that. We can process faster than 12 hours if you want.",
  },
  {
    img: icon3,
    title: "No exception",
    desc: "There are no limits to any requirements, just let us know what your job needs",
  },
  {
    img: icon4,
    title: "Support 24/7",
    desc: "Supporter are always ready to assist you via live chat, email or phone number",
  },
  {
    img: icon5,
    title: "Money back guarantee",
    desc: "100% refund if you are not satisfied with the display of your images.",
  },
  {
    img: icon6,
    title: "First order free",
    desc: "Free 5 completed images for your first order.",
  },
];

const HomeSection3 = () => {
  return (
    <div className="bg-[#FFFEEA]">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h2 className="text-[24px] mđ:text-[30px] lg:text-[36px] font-medium text-center">Why choose my service?</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index}>
              <div className="flex justify-start md:justify-center items-center">
                <div className="h-[48px] w-[48px] border-[4px] border-third rounded-full flex justify-center items-center">
                  <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
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
