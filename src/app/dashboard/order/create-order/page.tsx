"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import CreateOrder from "@/components/Dashboard/Order/CreateOrder";

const Page = () => {
  const searchParams = useSearchParams();
  const oid = searchParams.get("oid");
  const service = searchParams.get("service");

  return (
    <div>
      <CreateOrder oid={oid} service={service} />
    </div>
  );
};

export default Page;
