"use client";
import React from "react";
import Slide from "./Slide/Slide";

const Five = () => {
  return (
    <>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <div className="text-center">
          <div className="mb-5">
            <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium">See the difference</h2>
          </div>

          <div className="text-[#495057] text-[16px]">
            Day to twilight showcases a unique charm that provides real estate professionals with a range of advantages.
          </div>
        </div>
      </div>

      <div className="pb-12 md:pb-[64px]">
        <Slide />
      </div>
    </>
  );
};

export default Five;
