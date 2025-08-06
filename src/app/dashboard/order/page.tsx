import React from "react";
import Script from "next/script";
import Order from "@/components/Dashboard/Order";

const Page = () => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  return (
    <div>
      <Script src={`https://sandbox.paypal.com/sdk/js?client-id=${clientId}`} strategy="afterInteractive" />
      <Order />
    </div>
  );
};

export default Page;
