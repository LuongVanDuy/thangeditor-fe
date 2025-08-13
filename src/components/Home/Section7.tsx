import React from "react";
import cus1 from "@/assets/customer1.png";
import cus2 from "@/assets/customer2.png";
import cus3 from "@/assets/customer3.png";
import Image from "next/image";

import icon from "@/assets/Heading.svg";

const data = [
  {
    title: "The quality of the images is outstanding!",
    desc: "Every photo is sharp, vibrant and true to life. Your team clearly knows how to make my property shine, and the results always blow me away.",
    name: "Brandon Wang",
    role: "Sales Agent",
    img: cus1,
  },
  {
    title: "I am really impressed with your service.",
    desc: "The workflow is smooth, communication is quick, and the edits are always on point. It feels like you really listen and understand what the client is asking for.",
    name: "John Williams",
    role: "Real Estate Agent",
    img: cus2,
  },
  {
    title: "Their prices are very reasonable for the level of workmanship.",
    desc: "I have worked at many places and paid many different prices. But the 'object removal' results have never been as satisfying as they are here. ",
    name: "Anthony Smith",
    role: "Photographer",
    img: cus3,
  },
];

const HomeSection7 = () => {
  return (
    <div className="bg-[#FDC101]">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-[#000000] text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6">
            Customer happiness is our priority
          </h2>
          <p className="text-[#000] text-[18px]">
            Hear feedback from our happy customers and learn how we helped them take their businesses to new heights.
          </p>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {data.map((item: any, index) => (
            <div key={index} className="max-w-[392px] min-w-[340px] flex-1">
              <div className="rounded-2xl p-9 gap-9 bg-[#fff] flex flex-col shadow-md">
                <div className="flex gap-3 flex-col">
                  <Image src={icon} alt="icon" />
                  <h3 className="font-medium text-[#212529] text-[18px]">{item.title}</h3>
                  <p className="text-[#495057]">{item.desc}</p>
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
                    <h3 className="font-medium text-primary text-[18px]">{item.name}</h3>
                    <p className="text-[#6C757D] text-[14px]">{item.role}</p>
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
                <h3 className="font-medium text-[#212529] text-[18px]">{item.title}</h3>
                <p className="text-[#495057]">{item.desc}</p>
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
                  <h3 className="font-medium text-primary text-[18px]">{item.name}</h3>
                  <p className="text-[#6C757D] text-[14px]">{item.role}</p>
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
