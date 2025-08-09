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
    desc: "We want to help your listing marketing shine, while helping you stay on budget.",
  },
  {
    img: icon2,
    title: "Fast turnarounds",
    desc: "Time is of the essence when you are marketing a home. We’ll get your images back to you within 24–48 hours, tops.",
  },
  {
    img: icon3,
    title: "No subscriptions",
    desc: "You can bring any project to us, any time, any size. No monthly commitment needed!",
  },
  {
    img: icon4,
    title: "24x7 support",
    desc: "Customer service experts available 24/7 on live chat, phone or email.",
  },
  {
    img: icon5,
    title: "Money back guarantee",
    desc: "If you aren’t happy with the way your images turned out, let us know, and we will refund your money.",
  },
  {
    img: icon6,
    title: "Free trial for first image",
    desc: "Your first image is on us! Try us out at no cost and see what we can do for you.",
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
