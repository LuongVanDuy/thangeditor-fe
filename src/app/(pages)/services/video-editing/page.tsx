import React from "react";
import HeroSection from "@/components/Services/VideoEditting/HeroSection";
import BenefitSection from "@/components/Services/VideoEditting/BenefitSection";
import WorkSection from "@/components/Services/VirtualStaging/WorkSection";
import PricingSection from "@/components/Services/VideoEditting/PricingSection";
import WhatDoSection from "@/components/Services/VideoEditting/WhatDoSection";
import FAQSection from "@/components/Services/VideoEditting/FAQSection";

const Service = () => {
  return (
    <>
      <HeroSection />
      <BenefitSection />
      {/* <WorkSection /> */}
      <PricingSection />
      <WhatDoSection />
      <FAQSection />
    </>
  );
};

export default Service;
