"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import beforeImg from "@/assets/before2.jpg";
import afterImg from "@/assets/after2.jpg";
import { CompareSlider } from "@/components/Form/Compare/CompareSlider";
import { getToken } from "@/lib/helpers";

const HomeSection1 = () => {
  const router = useRouter();
  const token = getToken();

  const handleButtonClick = () => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div>
      <div className="p-4 md:p-6">
        <div className=" rounded-2xl overflow-hidden relative mx-0 xl:mx-auto">
          <div className="relative w-full aspect-[600/345] md:aspect-[1440/534] rounded-xl overflow-hidden shadow-xl">
            <CompareSlider beforeImage={beforeImg.src} afterImage={afterImg.src} />
          </div>
        </div>
      </div>

      <div className="py-[64px] md:px-[48px] lg:px-[86px] xl:px-[108px] hidden md:flex lg:justify-between">
        <div className="md: text-[36px] lg:text-[48px]">Make your ideal space right before your eyes</div>

        <div>
          <div className="text-[#495057] mb-4">
            Trusted by over 2,000 professional real estate photographers since 2012.
          </div>

          <div className="flex gap-4">
            <div onClick={handleButtonClick} className="btn-primary w-[162px] h-[58px]">
              Try for free
            </div>

            <div className="btn-secondary w-[210px] h-[58px]">
              <Link href={"/services"}>Explore services</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:hidden px-4 py-6">
        <h1 className="text-[32px] mb-4">Make your ideal space right before your eye</h1>

        <div>
          <div className="text-[#495057] mb-4">
            Try to incorporate about all the services that Styldod provides with this content
          </div>

          <div className="flex gap-4">
            <div onClick={handleButtonClick} className="btn-primary sm:w-auto 2xs:w-[162px] h-[58px]">
              Try for free
            </div>

            <div className="btn-secondary sm:w-atuo 2xs:w-[210px] h-[58px]">
              <Link href="/services">Explore services</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection1;
