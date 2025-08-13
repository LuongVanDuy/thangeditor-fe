"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { InitGlobalData } from "@/components/Layout/InitGlobalData";
import { RecoilRoot } from "recoil";
import FloatingContacts from "@/components/Layout/Contacts";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Header />
          <div className="bg-[#fff]">{children}</div>
          <InitGlobalData />
          <FloatingContacts />

          <Footer />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
