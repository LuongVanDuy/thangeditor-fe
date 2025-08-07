"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import card from "@/assets/cardIcon.svg";
import flag from "@/assets/flagIcon.svg";
import done from "@/assets/doneIcon.svg";
import rework from "@/assets/reworkIcon.svg";
import { useQuery } from "@tanstack/react-query";
import { getOrderList, getOrderStatus } from "@/lib/api/order.api";
import { profileState } from "@/lib/store/state";
import OrderBtn from "@/components/Dashboard/OrderBtn";
import Link from "next/link";
import Card from "@/components/Dashboard/Home/Services/Card";
import ProjectCard from "@/components/Dashboard/Home/ProjectCard";

const Services = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Object removal",
    categories: "Photo Editing",
    slug: "photo-editing",
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    slug: "video-editing",
  },
];

const Home = () => {
  const profile = useRecoilValue(profileState);
  const [formFilter, setFormFilter] = useState({
    page: 1,
    itemsPerPage: 2,
    status: "",
    sortBy: "createdTime",
    sortDesc: true,
  });

  const { data: orderData } = useQuery({
    queryKey: ["ORDER", formFilter],
    queryFn: () => getOrderList(formFilter),
    refetchOnWindowFocus: true,
  });

  const { data: orderStatusData } = useQuery({
    queryKey: ["ORDER_COUNT"],
    queryFn: () => getOrderStatus(),
    refetchOnWindowFocus: true,
  });
  const countData: any = orderStatusData || [];

  const statusData = [
    { status: "AWAITING", label: "Awaiting payment", icon: card },
    { status: "READY", label: "Getting ready", icon: flag },
    { status: "DONE", label: "Order delivered", icon: done },
    { status: "REWORK", label: "Rework requested", icon: rework },
  ];

  return (
    <div
      style={{ minHeight: "calc(100vh - 24px)" }}
      className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12"
    >
      <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
        <h1 className="text-[#212529] font-medium text-[24px]">
          {profile?.data ? `Welcome, ${profile?.data?.name}` : "Welcome, Guest"}
        </h1>

        <div className="hidden md:flex gap-3">
          <OrderBtn />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="card hidden md:grid grid-cols-4">
          {statusData.map((item) => {
            const count = countData?.find((data: any) => data.status === item.status)?.count || 0;

            return (
              <div key={item.status} className="p-6 flex flex-col gap-4 border-l-[1px] border-[#FBFBFB]">
                <div className="flex items-center text-[#343A40] text-[14px]">
                  <Image src={item.icon} alt="icon" className="mr-2" />
                  {item.label}
                </div>
                <h1 className="ml-12 text-[36px] font-medium text-[#212529]">{count}</h1>
              </div>
            );
          })}
        </div>

        <div className="card grid md:hidden grid-cols-2">
          {statusData.map((item) => {
            const count = countData?.find((data: any) => data.status === item.status)?.count || 0;

            return (
              <div
                key={item.status}
                className={`p-4 flex flex-col gap-2 border-[1px] ${
                  item.status === "AWAITING" || item.status === "READY" ? "border-t-0" : ""
                } ${
                  item.status === "READY" || item.status === "REWORK" ? "border-r-0" : "border-l-0"
                } border-[#FBFBFB]`}
              >
                <div className="flex items-center">
                  <Image src={item.icon} alt="icon" className="mr-2" />
                  <h1 className="text-[36px] font-medium text-[#212529]">{count}</h1>
                </div>
                <h1 className="text-[#343A40] text-[14px]">{item.label}</h1>
              </div>
            );
          })}
        </div>

        {orderData?.data?.list?.length > 0 && (
          <div className="card gap-4 md:gap-6 flex flex-col">
            <h1 className="text-[#212529] text-[14px]">Recent activity</h1>

            {orderData?.data?.list?.map((item: any, index: number) => (
              <div key={index}>
                <ProjectCard
                  name={item.projectName}
                  id={item.id}
                  service={item.service}
                  status={item.status}
                  photoCompleted={item.photoCompleted}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h1 className="text-[#101828] font-medium text-[18px] md:text-[20px]">Place a new order</h1>
          <div className="hidden md:block">
            <div className="btn-tertiary">
              <Link href={"/dashboard/services"}>All servicess</Link>
            </div>
          </div>
        </div>

        <div className="grid 2xl:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-0">
          {Services.map((item, index) => (
            <div key={index}>
              <Card title={item.title} categories={item.categories} slug={item.slug} />
            </div>
          ))}
        </div>

        <div className="block md:hidden">
          <div className="btn-tertiary">
            <Link href={"/dashboard/services"}>All servicess</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
