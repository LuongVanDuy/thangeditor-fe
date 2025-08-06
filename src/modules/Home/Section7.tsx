import React from "react";
import bg from "@/assets/bg.png";
import cus1 from "@/assets/customer1.jpg";
import cus2 from "@/assets/customer2.jpeg";
import cus3 from "@/assets/customer3.jpg";
import Image from "next/image";

import icon from "@/assets/Heading.svg";

const data = [
  {
    title: "Delivery time and quality of work are impeccable.",
    desc: "The process is easy from start to finish. Definitely worth the investment, if you are looking to tweak some of your real estate projects. Thank you so much again!",
    name: "julio_garza",
    role: "Sales Associate",
    img: cus1,
  },
  {
    title: "Very easy to work with.",
    desc: "Instructions were clear and I received more than expected. I was very pleased with the exposure correction and light balance that I couldn't get right on my own. I will send all my work to her in the future.",
    name: "robertduncan888",
    role: "Sales Associate",

    img: cus2,
  },
  {
    title: "The experience was amazing.",
    desc: "Despite many editing requests, the work is always completed with outstanding quality, professionalism and a positive attitude. The attention to detail and willingness to accommodate every request truly exceeded my expectations.",
    name: "dougmazell",
    role: "Sales Associate",
    img: cus3,
  },
];

const HomeSection7 = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FDC101",
      }}
    >
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-[#fff] text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6">
            Customer happiness is our priority
          </h1>
          <h2 className="text-[#fff] text-[18px]">
            Hear feedback from our happy customers and learn how we helped them take their businesses to new heights.
          </h2>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {data.map((item: any, index) => (
            <div key={index} className="max-w-[392px] min-w-[340px] flex-1">
              <div className="rounded-2xl p-9 gap-9 bg-[#fff] flex flex-col shadow-md">
                <div className="flex gap-3 flex-col">
                  <Image src={icon} alt="icon" />
                  <h1 className="font-medium text-[#212529] text-[18px]">{item.title}</h1>
                  <h2 className="text-[#495057]">{item.desc}</h2>
                </div>

                <div className="flex gap-4">
                  <div>
                    <Image
                      src={item.img}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full w-12 h-12 bg-cover bg-center"
                    />
                  </div>
                  <div>
                    <h1 className="font-medium text-primary text-[18px]">{item.name}</h1>
                    <h2 className="text-[#6C757D] text-[14px]">{item.role}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden flex-col gap-6">
          {data.map((item: any, index) => (
            <div key={index} className="rounded-2xl p-9 gap-9 bg-[#fff] flex flex-col shadow-md">
              <div className="flex gap-3 flex-col">
                <Image src={icon} alt="icon" />
                <h1 className="font-medium text-[#212529] text-[18px]">{item.title}</h1>
                <h2 className="text-[#495057]">{item.desc}</h2>
              </div>

              <div className="flex gap-4">
                <div>
                  <Image
                    src={item.img}
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 bg-cover bg-center"
                  />
                </div>
                <div>
                  <h1 className="font-medium text-primary text-[18px]">{item.name}</h1>
                  <h2 className="text-[#6C757D] text-[14px]">{item.role}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection7;
