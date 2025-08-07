import React, { useState } from "react";
import Script from "next/script";
import { CustomSelect } from "@/components/Form/CustomSelect";
import CustomTabs from "@/components/Form/CustomTabs";
import CustomPagination from "@/components/Form/CustomPagination";

import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "@/lib/api/order.api";
import OrderBtn from "@/components/Dashboard/OrderBtn";
import OrderCard from "@/components/Dashboard/Order/Card/OrderCard";

const tabs = [
  { key: "", label: "All order" },
  { key: "awaiting", label: "Awaiting payment" },
  { key: "ready", label: "Getting ready" },
  { key: "done", label: "Order delivered" },
  { key: "rework", label: "Rework requested" },
];

const options = [
  { value: true, label: "Newest First" },
  { value: false, label: "Oldest First" },
];

const Page = () => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const [formFilter, setFormFilter] = useState({
    page: 1,
    itemsPerPage: 10,
    status: "",
    sortBy: "createdTime",
    sortDesc: true,
  });

  const currentTab = tabs.find((tab) => tab.key === formFilter.status) || { label: "All order" };

  const { data, isLoading, refetch } = useQuery(["ORDER", formFilter], () => getOrderList(formFilter), {
    refetchOnWindowFocus: true,
  });

  const handleTabChange = (key: string) => {
    setFormFilter((prev) => ({
      ...prev,
      status: key,
    }));
  };

  return (
    <div>
      <Script src={`https://sandbox.paypal.com/sdk/js?client-id=${clientId}`} strategy="afterInteractive" />
      <div
        style={{ minHeight: "calc(100vh - 24px)" }}
        className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12"
      >
        <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
          <h1 className="text-[#212529] font-medium text-[24px]">My orders</h1>

          <div className="hidden md:flex gap-3">
            <OrderBtn />
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-6">
          <CustomTabs tabs={tabs} onChange={handleTabChange} activeKey={formFilter.status} />

          <div className="card flex flex-col gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1>{currentTab.label}</h1>
              <div className="flex gap-4 items-center text-[#6C757D] whitespace-nowrap">
                <h1>Sort by</h1>
                <CustomSelect
                  options={options}
                  onChange={(selectedValue) => {
                    setFormFilter((prev) => ({
                      ...prev,
                      sortDesc: selectedValue,
                    }));
                  }}
                  value={formFilter.sortDesc}
                />
              </div>
            </div>

            {data?.data?.list.map((item: any, index: number) => (
              <OrderCard
                key={index}
                name={item.projectName}
                categories={item.service}
                status={item.status}
                price={item.orderTotal}
                style={item.designStyle}
                quantity={item.quantity}
                id={item.id}
                date={item.createdTime}
                refetch={refetch}
                photoCompleted={item.photoCompleted}
              />
            ))}

            <CustomPagination
              page={formFilter.page}
              pageSize={formFilter.itemsPerPage}
              total={data?.data?.count}
              setPage={(value) => setFormFilter({ ...formFilter, page: value })}
              setPerPage={(value) => setFormFilter({ ...formFilter, itemsPerPage: value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
