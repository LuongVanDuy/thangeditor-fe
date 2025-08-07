"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getBlogList } from "@/lib/api/blog.api";
import icon from "@/assets/Link.svg";
import blog from "@/assets/blog.png";

const HomeSection8 = () => {
  const formFilter = {
    page: 1,
    itemsPerPage: 3,
  };

  const { data } = useQuery({
    queryKey: ["BLOG", formFilter],
    queryFn: () => getBlogList(formFilter),
  });
  const blogList = data?.data?.list || [];
  if (blogList.length === 0) return null;

  return (
    <div className="px-4 lg:px-[64px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6 text-center">Blog</h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {blogList.map((item: any, index: number) => (
          <div key={item.id || index} className="flex flex-col flex-shrink-0 w-[387px] gap-6">
            <div>
              <Image
                src={item.img || blog}
                alt={item.title}
                width={387}
                height={218}
                className="w-[387px] h-auto object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 justify-center">
              <h2 className="text-primary text-[12px] uppercase font-medium">{item.subject || "Blog"}</h2>
              <div className="flex items-start justify-between">
                <Link href={`/blog/${item.slug}`}>
                  <h1 className="text-[24px] font-medium text-[#212529] hover:opacity-80 cursor-pointer">
                    {item.title}
                  </h1>
                </Link>
                <Image src={icon} alt="arrow" width={20} height={20} />
              </div>
              <h2 className="text-[#495057]">{item.shortDesc}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-primary h-12 w-[132px] mx-auto">
        <Link href="/blog">View more</Link>
      </div>
    </div>
  );
};

export default HomeSection8;
