"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import HomeSection1 from "@/modules/Home/Section1";
import HomeSection2 from "@/modules/Home/Section2";
import HomeSection3 from "@/modules/Home/Section3";
import HomeSection4 from "@/modules/Home/Section4";
import HomeSection5 from "@/modules/Home/Section5";
import HomeSection6 from "@/modules/Home/Section6";
import HomeSection7 from "@/modules/Home/Section7";
import HomeSection8 from "@/modules/Home/Section8";

export default function Home() {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1100,
  //     easing: "ease",
  //     once: true,
  //   });
  // }, []);

  return (
    <>
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
      <HomeSection6 />
      <HomeSection7 />
      <HomeSection8 />
    </>
  );
}
