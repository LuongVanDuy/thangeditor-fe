import React from "react";
import Image from "next/image";
import Link from "next/link";
import bg from "@/assets/mediumBanner.png";
import { CompareSlider } from "@/components/Compare/CompareSlider";

import after1 from "@/assets/virtual-after.jpg";
import before1 from "@/assets/virtual-before.jpg";

const Card = ({
  title,
  img = bg,
  categories,
  slug,
}: {
  title: string;
  img?: any;
  categories: string;
  slug: string;
}) => {
  return (
    <>
      <div className="rounded-2xl overflow-hidden shadow-md mb-6">
        <div className="relative w-full aspect-[600/345] overflow-hidden no-swipe">
          <CompareSlider beforeImage={after1?.src} afterImage={before1?.src} />
        </div>

        <div className="p-4 md:p-6">
          <h1 className="text-primary text-[12px] uppercase">{categories}</h1>
          <Link href={`/services/${slug}`} className="font-medium text-[18px] md:text-[20px] mt-4">
            {title}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
