"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Collapse } from "antd";
const { Panel } = Collapse;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";

import down from "@/assets/chevron-down.svg";
import up from "@/assets/chevron-up.svg";
import sofa from "@/assets/sofa.svg";
import store from "@/assets/store.svg";
import img3d from "@/assets/move-3d.svg";
import building from "@/assets/building.svg";
import box from "@/assets/haze.svg";
import sun from "@/assets/haze.svg";
import eraser from "@/assets/eraser.svg";
import wand from "@/assets/wand-sparkles.svg";
import cut from "@/assets/haze.svg";
import { jsonServiceData } from "@/lib/constants";

const MenuContent = ({ activePage, onClose }: { activePage: any; onClose: () => void }) => {
  const router = useRouter();

  const handleLinkClick = (path: string) => {
    setTimeout(() => {
      router.push(path);
      onClose();
    }, 500);
  };

  return (
    <div>
      <div className="border-[1px]  border-[#f4f4f4] p-4">
        <Link href={"/"} className={`${activePage === "/" ? "text-primary" : "text-[#6C757D]"}`}>
          Home
        </Link>
      </div>

      <Collapse
        expandIconPosition="end"
        ghost
        expandIcon={({ isActive }) => <Image src={isActive ? up : down} alt="expand icon" width={24} height={24} />}
      >
        <Panel
          header={
            <div className="flex justify-between items-center">
              <Link href="/services" className={`${activePage === "/services" ? "text-primary" : "text-[#6C757D]"}`}>
                Services
              </Link>
            </div>
          }
          key="1"
        >
          <div className="bg-[#FBFBFB]">
            <ul>
              {jsonServiceData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </Collapse>

      <div className="border-[1px] border-b-0 border-[#f4f4f4] p-4">
        <Link href={"/blog"} className={`${activePage === "/blog" ? "text-primary" : "text-[#6C757D]"}`}>
          Blog
        </Link>
      </div>

      <div className="border-[1px] border-[#f4f4f4] p-4">
        <Link href={"/contact"} className={`${activePage === "/contact" ? "text-primary" : "text-[#6C757D]"}`}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MenuContent;
