"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, MenuProps, Drawer } from "antd";
import { useRecoilState } from "recoil";
import { destroyCookie } from "nookies";

import DrawerContent from "./Drawer/DrawerContent";
import MenuContent from "./Drawer/MenuContent";

import { clearToken, getToken, setRefreshToken, setToken } from "@/lib/helpers";
import { profileState } from "@/lib/store/state";

// Assets imports
import userIcon from "@/assets/user.svg";
import logo from "@/assets/logo.svg";
import grayUser from "@/assets/grayUser.svg";
import menu from "@/assets/menu.svg";
import avatar from "@/assets/Avatar.svg";
import down from "@/assets/chevron-down.svg";
import close from "@/assets/x.svg";

// Constants
const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const STATIC_PATHS = ["/blog", "/mobile", "/contact", "/services", "/"] as const;
const BREAKPOINT_MD = 768;

// Types
interface NavigationItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [profile, setProfile] = useRecoilState(profileState);
  const [activePage, setActivePage] = useState("");
  const [isServicesDrawerOpen, setIsServicesDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoized values
  const profileAvatar = useMemo(() => profile?.data?.avatar || avatar, [profile?.data?.avatar]);
  const isAuthenticated = useMemo(() => !!profile, [profile]);

  // Handlers
  const handleLogout = useCallback(() => {
    clearToken();
    setToken("");
    setRefreshToken("");
    setProfile(null);
    destroyCookie(null, "ACCESS_TOKEN", { path: "/" });

    setTimeout(() => {
      window.location.replace("/");
      setActivePage("/");
    }, 500);
  }, [setProfile]);

  const handleResize = useCallback(() => {
    if (window.innerWidth < BREAKPOINT_MD) {
      setIsServicesDrawerOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  }, []);

  const handleServicesToggle = useCallback(() => {
    setIsServicesDrawerOpen((prev) => !prev);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLoginClick = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  // Effects
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const token = getToken();
    if (token === "") {
      setProfile(null);
    }
  }, [setProfile]);

  useEffect(() => {
    const determineActivePage = () => {
      if (STATIC_PATHS.includes(pathName as any)) {
        setActivePage(pathName);
      } else if (pathName.startsWith("/services/")) {
        setActivePage("/services");
      } else {
        setActivePage("");
      }
    };

    determineActivePage();
  }, [pathName]);

  // Memoized dropdown items
  const dropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "dashboard",
        label: (
          <Link href="/dashboard">
            <div className="btn-primary h-[40px] w-[140px]">Dashboard</div>
          </Link>
        ),
      },
      {
        key: "logout",
        label: (
          <div className="p-2 flex gap-2 items-center mx-auto" onClick={handleLogout}>
            <div className="text-secondary font-medium">Logout</div>
          </div>
        ),
      },
    ],
    [handleLogout],
  );

  // Render functions
  const renderNavigationItem = useCallback(
    ({ href, label, hasDropdown }: NavigationItem) => (
      <li key={href} className={hasDropdown ? "flex gap-1 items-center" : ""}>
        <Link
          href={href}
          className={`${activePage === href ? "text-primary" : "text-secondary"} cursor-pointer hover:opacity-80`}
        >
          {label}
        </Link>
        {hasDropdown && (
          <div onClick={handleServicesToggle}>
            <Image src={down} alt="dropdown" className="cursor-pointer" />
          </div>
        )}
      </li>
    ),
    [activePage, handleServicesToggle],
  );

  const renderUserSection = useCallback(() => {
    if (isAuthenticated) {
      return (
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]} placement="bottomRight" arrow>
          <div className="sm:hidden md:flex items-center gap-2 cursor-pointer">
            <Image src={profileAvatar} alt="avatar" height={48} width={48} className="h-12 w-12 rounded-full" />
            <h1 className="text-primary font-medium text-[18px]">{profile?.data?.name}</h1>
          </div>
        </Dropdown>
      );
    }

    return (
      <div className="btn-primary h-[48px] w-[124px] sm:hidden md:flex" onClick={handleLoginClick}>
        <div>
          <Image src={userIcon} alt="icon" className="mr-2" />
        </div>
        Login
      </div>
    );
  }, [isAuthenticated, profile?.data?.name, profileAvatar, dropdownItems, handleLoginClick]);

  const renderMobileUserSection = useCallback(() => {
    if (isAuthenticated) {
      return (
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]} placement="bottomRight" arrow>
          <div className="md:hidden flex items-center gap-2 h-[48px] w-[48px] justify-center cursor-pointer">
            <Image src={profileAvatar} alt="avatar" height={48} width={48} className="h-12 w-12 rounded-full" />
          </div>
        </Dropdown>
      );
    }

    return (
      <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer" onClick={handleLoginClick}>
        <Image src={grayUser} alt="icon" />
      </div>
    );
  }, [isAuthenticated, profileAvatar, dropdownItems, handleLoginClick]);

  return (
    <>
      <header className="header h-[80px] bg-[#fff] px-6 py-4 items-center justify-between flex shadow-sm relative z-[8] md:z-10">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="logo" height={32} width={178} layout="intrinsic" className="!h-7 !md:h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-6">{NAVIGATION_ITEMS.map(renderNavigationItem)}</ul>
        </nav>

        {/* Desktop User Section */}
        {renderUserSection()}

        {/* Mobile Controls */}
        <div className="flex md:hidden gap-2 items-center">
          {renderMobileUserSection()}

          <button
            onClick={handleMobileMenuToggle}
            className="h-[48px] w-[48px] border-[1px] border-gray-200 flex items-center justify-center rounded-lg bg-gray-100 cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Image src={menu} alt="menu" />
          </button>
        </div>
      </header>

      {/* Services Dropdown Drawer */}
      <Drawer
        placement="top"
        closable={false}
        onClose={() => setIsServicesDrawerOpen(false)}
        open={isServicesDrawerOpen}
        key="top"
        mask={true}
        zIndex={9}
        className="header-drawer mt-[80px] shadow-md"
      >
        <DrawerContent onClose={() => setIsServicesDrawerOpen(false)} />
      </Drawer>

      {/* Mobile Menu Drawer */}
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        key="right"
        mask={true}
        className="menu-drawer"
        style={{ padding: 0 }}
        zIndex={9}
      >
        <div className="flex justify-end px-4 py-2">
          <button
            className="bg-[#FBFBFB] h-12 w-12 border-[1px] border-[#f4f4f4] items-center justify-center flex rounded-lg cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <Image src={close} alt="close" />
          </button>
        </div>
        <MenuContent activePage={activePage} onClose={() => setIsMobileMenuOpen(false)} />
      </Drawer>
    </>
  );
};

export default Header;
