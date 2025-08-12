import React from "react";
import Image, { StaticImageData } from "next/image";
import blog from "@/assets/blog.png";
import Link from "next/link";
import icon from "@/assets/Link.svg";

interface BlogCardProps {
  key: string;
  img?: StaticImageData | string;
  title: string;
  subject?: string | any;
  desc: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ img = blog, title, subject, desc, slug, key }) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-full xs:w-[387px] gap-4" key={key}>
      <div>
        <Image src={img} alt="icon" className="w-full xs:w-[387px] h-auto" />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <h2 className="text-primary text-[12px] uppercase font-medium">{subject}</h2>
        <div className="flex items-start justify-between">
          <Link href={`/blog/${slug}`}>
            <h1 className="text-[24px] font-medium text-[#212529] hover:opacity-80 cursor-pointer">{title}</h1>
          </Link>
          <Image src={icon} alt="" />
        </div>
        <h2 className="text-[#495057]">{desc}</h2>
      </div>
    </div>
  );
};

export default BlogCard;
