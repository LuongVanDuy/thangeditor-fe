import React from "react";
import HeroSection from "@/components/Services/PhotoEditing/HeroSection";
import BenefitSection from "@/components/Services/PhotoEditing/BenefitSection";
import DifferenceSection from "@/components/Services/PhotoEditing/DifferenceSection";
import ProcessSection from "@/components/Services/PhotoEditing/ProcessSection";
import PricingSection from "@/components/Services/PhotoEditing/PricingSection";
import FactSection from "@/components/Services/PhotoEditing/FactSection";
import FAQSection from "@/components/Services/PhotoEditing/FAQSection";

const Service = () => {
  return (
    <>
      <div>
        <HeroSection />
        <BenefitSection />
        <DifferenceSection />
        <ProcessSection />
        <PricingSection />
        <FactSection />
        <FAQSection />
      </div>
    </>
  );
};

export default Service;
