"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Collapse } from "antd";
const { Panel } = Collapse;
import "swiper/css";
import "./styles.css";

import down from "@/assets/chevron-down.svg";
import up from "@/assets/chevron-up.svg";
import { jsonServiceData } from "@/lib/constants";

interface MenuContentProps {
  activePage: string;
  onClose: () => void;
}

const MenuContent = ({ activePage, onClose }: MenuContentProps) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div>
      {/* Home */}
      <div className="border-[1px] border-[#f4f4f4] p-4 cursor-pointer" onClick={() => handleNavigate("/")}>
        <span className={activePage === "/" ? "text-primary" : "text-[#6C757D]"}>Home</span>
      </div>

      {/* Services */}
      <Collapse
        expandIconPosition="end"
        ghost
        expandIcon={({ isActive }) => <Image src={isActive ? up : down} alt="expand icon" width={24} height={24} />}
      >
        <Panel
          header={
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleNavigate("/services")}
            >
              <span className={activePage === "/services" ? "text-primary" : "text-[#6C757D]"}>Services</span>
            </div>
          }
          key="1"
        >
          <div className="bg-[#FBFBFB]">
            <ul>
              {jsonServiceData.map((service) => (
                <li
                  key={service.id}
                  className="px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary cursor-pointer"
                  onClick={() => handleNavigate(`/services/${service.slug}`)}
                >
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </Collapse>

      {/* Blog */}
      <div className="border-[1px] border-[#f4f4f4] p-4 cursor-pointer" onClick={() => handleNavigate("/blog")}>
        <span className={activePage === "/blog" ? "text-primary" : "text-[#6C757D]"}>Blog</span>
      </div>

      {/* Contact */}
      <div className="border-[1px] border-[#f4f4f4] p-4 cursor-pointer" onClick={() => handleNavigate("/contact")}>
        <span className={activePage === "/contact" ? "text-primary" : "text-[#6C757D]"}>Contact</span>
      </div>
    </div>
  );
};

export default MenuContent;
