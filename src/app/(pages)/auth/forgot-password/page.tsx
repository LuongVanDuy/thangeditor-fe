"use client";

import ForgotPasswordFormComponent from "@/components/Auth/ForgotPasswordForm";
import ResetPasswordFormComponent from "@/components/Auth/ResetPasswordForm";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="mx-auto flex flex-col gap-8 sm:w-auto 2xs:w-[390px] pb-12 pt-12 md:pt-[64px] px-4">
      <div className="text-center">
        <h1 className="text-[#212529] font-medium sm:text-[24px] md:text-[36px] mb-6">Forgot password</h1>
        <h2 className="text-[#6c757d] ">Forgot your password to login</h2>
      </div>

      <div className="flex flex-col gap-4">
        {token ? <ResetPasswordFormComponent /> : <ForgotPasswordFormComponent />}
      </div>

      <div className="text-center text-[#495057] text-[14px]">
        Already registered?{" "}
        <Link href="/auth/login" className="text-primary font-medium text-[14px]">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
