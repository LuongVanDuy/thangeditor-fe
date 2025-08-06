import React from "react";
import First from "@/components/Services/SecondService/First/First";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import beforeImg from "@/assets/before2.jpg";
import afterImg from "@/assets/after2.jpg";
import Second from "@/components/Services/SecondService/Second/Second";
import Third from "@/components/Services/SecondService/Third/Third";
import Four from "@/components/Services/SecondService/Four/Four";
import Five from "@/components/Services/ThirdService/Five";
import Six from "@/components/Services/SecondService/Six/Six";

const Service = () => {
  return (
    <>
      <div>
        <First />
        <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[24px] flex flex-col gap-9 md:gap-12 ">
          <div className=" rounded-2xl overflow-hidden relative mx-0 xl:mx-auto">
            <div className="relative w-full aspect-[600/345] md:aspect-[1440/534] rounded-xl overflow-hidden shadow-xl">
              <CompareSlider beforeImage={beforeImg.src} afterImage={afterImg.src} />
            </div>
          </div>
        </div>
        <Second />
        <Third />
        <Four />
        <Five />
        <Six />
      </div>
    </>
  );
};

export default Service;
