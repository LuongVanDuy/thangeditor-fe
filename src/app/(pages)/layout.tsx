"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { InitGlobalData } from "@/components/Layout/InitGlobalData";
import { RecoilRoot } from "recoil";

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
          <div className="overflow-hidden">
            <Header />
            <div className="bg-[#fff]">{children}</div>
            <InitGlobalData />
            <Footer />
          </div>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
