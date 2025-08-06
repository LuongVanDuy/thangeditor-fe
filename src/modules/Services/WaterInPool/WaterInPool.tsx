import React from "react";
import First from "./First/First";
import Second from "./Second/Second";
import Third from "./Third/Third";
import Four from "./Four/Four";
import Five from "./Five/Five";
import Six from "./Six/Six";
import Bottom from "../FirstService/Six/Six";
import beforeImg from "@/assets/before2.jpg";
import afterImg from "@/assets/after2.jpg";
import { CompareSlider } from "@/components/Compare/CompareSlider";

const WaterInPool = () => {
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
        <Bottom />
      </div>
    </>
  );
};

export default WaterInPool;
