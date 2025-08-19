import React from "react";
import Image from "next/image";

import img from "@/assets/style-10.png";

const FactSection = () => {
  return (
    <section className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <div>
        <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-5">Interesting Facts</h2>
        <p className="text-[#495057] text-[16px] md:text-[18px]">
          We&apos;ve done all the heavy lifting so you don&apos;t have to — get all the data you need to launch and grow
          your business faster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 md:gap-12 lg:gap-[96px] items-center">
        <div className="grid grid-cols-2 gap-9 md:gap-12 lg:gap-[64px]">
          <div>
            <h3 className="text-brand text-[32px] md:text-[40px] lg:text-[48px] font-medium">2,000+</h3>
            <h4 className="text-[#212529] text-[18px] font-medium">Completed projects</h4>
            <p className="text-[#495057] text-[16px]">
              We have successfully completed over 2,000 projects of all sizes, from small to high-end.
            </p>
          </div>

          <div>
            <h3 className="text-brand text-[32px] md:text-[40px] lg:text-[48px] font-medium">100,000+</h3>
            <h4 className="text-[#212529] text-[18px] font-medium">Delivered images</h4>
            <p className="text-[#495057] text-[16px]">
              Over 100,000 high-quality images have been delivered to customers worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-brand text-[32px] md:text-[40px] lg:text-[48px] font-medium">95%+</h3>
            <h4 className="text-[#212529] text-[18px] font-medium">Returning customers</h4>
            <p className="text-[#495057] text-[16px]">
              An impressive rate of returning customers and recommending our services to others.
            </p>
          </div>

          <div>
            <h3 className="text-brand text-[32px] md:text-[40px] lg:text-[48px] font-medium">100+</h3>
            <h4 className="text-[#212529] text-[18px] font-medium">5-Star reviews</h4>
            <p className="text-[#495057] text-[16px]">
              Proud to have over 100 5-star reviews from satisfied customers.
            </p>
          </div>
        </div>

        <div>
          <Image src={img} alt="Interesting Facts" />
        </div>
      </div>
    </section>
  );
};

export default FactSection;
