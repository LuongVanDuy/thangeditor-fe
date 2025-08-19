"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, MenuProps, Drawer } from "antd";

import MenuContent from "./Drawer/MenuContent";

import userIcon from "@/assets/user.svg";
import logo from "@/assets/logo.svg";
import grayUser from "@/assets/grayUser.svg";
import menu from "@/assets/menu.svg";
import avatar from "@/assets/Avatar.svg";
import down from "@/assets/chevron-down.svg";
import close from "@/assets/x.svg";

import { useRecoilState } from "recoil";
import { destroyCookie } from "nookies";
import { clearToken, getToken, setRefreshToken, setToken } from "@/lib/helpers";
import { profileState } from "@/lib/store/state";
import { jsonServiceData } from "@/lib/constants";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [profile, setProfile] = useRecoilState(profileState);
  const [activePage, setActivePage] = useState("");
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const profileAvatar = profile?.data?.avatar;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpenMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Delay 150ms trước khi ẩn
  };

  const logout = () => {
    clearToken();
    setToken("");
    setRefreshToken("");
    setProfile(null);
    destroyCookie(null, "ACCESS_TOKEN", { path: "/" });
    setTimeout(() => {
      window.location.replace("/");
      setActivePage("/");
    }, 500);
  };

  useEffect(() => {
    const token = getToken();

    if (token === "") {
      setProfile(null);
    }

    const handleError = (error: any) => {
      const { statusCode } = error.response?.data || {};

      if (statusCode === 401 || statusCode === 403) {
        setProfile(null);
      }
    };
  }, [profile]);

  useEffect(() => {
    const determineActivePage = () => {
      const staticPaths = ["/blog", "/mobile", "/contact", "/services", "/"];

      if (staticPaths.includes(pathName)) {
        setActivePage(pathName);
      } else if (pathName.startsWith("/services/")) {
        setActivePage("/services");
      } else {
        setActivePage("");
      }
    };

    determineActivePage();
  }, [pathName]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/dashboard">
          <div className="btn-primary h-[40px] w-[140px]">Dashboard</div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div className="p-2 flex  gap-2 items-center mx-auto" onClick={logout}>
          <div className=" text-secondary font-medium">Logout</div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="header h-[80px] bg-[#fff] px-6 py-2 items-center justify-between flex shadow-sm relative z-[8] md:z-10">
        <Link href={"/"}>
          <Image src={logo} alt="logo" height={48} width={126} layout="intrinsic" className="!h-12 !md:h-8 w-auto" />
        </Link>

        <div className="hidden md:block">
          <ul className="flex gap-6">
            <Link
              href="/"
              className={`${
                activePage === "/" ? "text-base-primary" : "text-secondary"
              } cursor-pointer hover:opacity-80`}
            >
              Home
            </Link>
            <li
              className="flex gap-1 items-center relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1 ${
                  activePage === "/services" ? "text-base-primary" : "text-secondary"
                } cursor-pointer hover:opacity-80`}
              >
                Services
                <Image src={down} alt="" className="cursor-pointer" />
              </Link>
              <ul
                className={`absolute top-full left-0 bg-white shadow-md border rounded-xl mt-1 min-w-[200px] z-50 transition-all duration-200 ease-out transform origin-top ${
                  isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
                }`}
              >
                {jsonServiceData.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-secondary hover:bg-brand hover:text-white rounded-xl"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <Link
              href="/blog"
              className={`${
                activePage === "/blog" ? "text-base-primary" : "text-secondary"
              } cursor-pointer hover:opacity-80`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`${
                activePage === "/contact" ? "text-base-primary" : "text-secondary"
              } cursor-pointer hover:opacity-80`}
            >
              Contact
            </Link>
          </ul>
        </div>

        {profile ? (
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" arrow>
            <div className="sm:hidden md:flex items-center gap-2 cursor-pointer">
              <Image
                src={profileAvatar ? profileAvatar : avatar}
                alt="avatar"
                height={48}
                width={48}
                className="h-12 w-12 rounded-full"
              />
              <h1 className="text-base-primary font-medium text-[18px]">{profile?.data?.name}</h1>
            </div>
          </Dropdown>
        ) : (
          <div
            className="btn-primary !bg-brand h-[48px] w-[124px] sm:hidden md:flex"
            onClick={() => router.push("/auth/login")}
          >
            <div>
              <Image src={userIcon} alt="icon" className="mr-2" />
            </div>{" "}
            Login
          </div>
        )}

        <div className="flex md:hidden gap-2 items-center">
          {profile ? (
            <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" arrow>
              <div className="md:hidden flex items-center gap-2 h-[48px] w-[48px] justify-center cursor-pointer">
                <Image
                  src={profileAvatar ? profileAvatar : avatar}
                  alt="avatar"
                  height={48}
                  width={48}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </Dropdown>
          ) : (
            <div
              className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              <Image src={grayUser} alt="icon" />
            </div>
          )}

          <div
            onClick={() => setOpenMenu(true)}
            className="h-[48px] w-[48px] border-[1px] border-gray-200 flex items-center justify-center rounded-lg bg-gray-100 cursor-pointer"
          >
            <Image src={menu} alt="icon" />
          </div>
        </div>
      </div>

      <Drawer
        placement="right"
        closable={false}
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        key="right"
        mask={true}
        className="menu-drawer"
        style={{ padding: 0 }}
        zIndex={9}
      >
        <div className="flex justify-end px-4 py-2">
          <div
            className="bg-[#FBFBFB] h-12 w-12 border-[1px] border-[#f4f4f4] items-center justify-center flex rounded-lg cursor-pointer"
            onClick={() => setOpenMenu(false)}
          >
            <Image src={close} alt="" />
          </div>
        </div>
        <MenuContent activePage={activePage} onClose={() => setOpenMenu(false)} />
      </Drawer>
    </>
  );
};

export default Header;
