import React from "react";
import cus1 from "@/assets/customer1.png";
import cus2 from "@/assets/customer2.png";
import cus3 from "@/assets/customer3.png";
import Image from "next/image";

import icon from "@/assets/Heading.svg";

const data = [
  {
    title: "A great working experience!",
    desc: "Working with thangeditor is always easy. He helps me get my project done quickly and professionally.",
    name: "Brandon Wang",
    role: "Sales Agent",
    // img: cus1,
  },
  {
    title: "The service quality is awesome!",
    desc: "His service is clear step by step and the output image quality is high quality nothing to complain about.",
    name: "John Williams",
    role: "Real Estate Agent",
    // img: cus2,
  },
  {
    title: "The price is very affordable!",
    desc: "I have worked with many editors but Thangeditor is the best in terms of price and value.",
    name: "Anthony Smith",
    role: "Photographer",
    // img: cus3,
  },
];

const HomeSection7 = () => {
  return (
    <div className="bg-brand">
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-white text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6">
            Customer happiness is our priority
          </h2>
          <p className="text-white text-[18px]">
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
                  {/* <div>
                    <Image
                      src={item?.img}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full w-12 h-12 bg-cover bg-center"
                    />
                  </div> */}
                  <div>
                    <h3 className="font-medium text-brand text-[18px]">{item.name}</h3>
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
                  <h3 className="font-medium text-brand text-[18px]">{item.name}</h3>
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
