"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Label from "@/components/Form/CustomLabel";
import { CustomInput } from "@/components/Form/CustomInput";
import { Checkbox, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import eye from "@/assets/eye.svg";
import gg from "@/assets/google.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/Form/InputError";
import { Register } from "@/lib/api/auth.api";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required").max(100, "Name must not exceed 100 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?\d{9,11}$/, "Phone number must be between 9 and 11 digits"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters")
    .required("Password is required")
    .matches(/^[^\s]+$/, "Password must not contain spaces")
    .test("no-whitespace", "Password must not contain spaces", (value) => {
      return value === value?.trim();
    }),
});

const Signup = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate: signupMutation, isPending: isLoading } = useMutation({
    mutationFn: (data: any) => Register(data),
    onSuccess() {
      message.success("Success!");
      router.push("/auth/login");
    },
    onError(err: any) {
      message.error(err?.response?.data?.message || "Đăng ký thất bại.");
    },
  });

  const onSubmit = () => {
    if (!isChecked) {
      message.warning("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    const data = getValues();
    signupMutation(data);
  };

  const handleOpenTab = () => {
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}google`, "_blank");
  };

  return (
    <div className="mx-auto flex flex-col gap-8 sm:w-auto 2xs:w-[390px] pb-12 pt-12 md:pt-[64px] px-4">
      <div className="text-center">
        <h1 className="text-[#212529] font-medium sm:text-[24px] md:text-[36px] mb-6">Signup</h1>
        <h2 className="text-[#6c757d] ">Create a new account</h2>
      </div>

      <div className="flex flex-col gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label label="Name" />
              <CustomInput
                className="!h-12 w-[390px] bg-[#FBFBFB]"
                placeholder="Enter your name"
                onChange={onChange}
                value={value}
              />
              <InputError error={errors.name?.message} />
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label label="Email" />
              <CustomInput
                className="!h-12 !w-[390px] bg-[#FBFBFB]"
                placeholder="Enter your email"
                onChange={onChange}
                value={value}
              />
              <InputError error={errors.email?.message} />
            </div>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label label="Phone number" />
              <PhoneInput
                value={value}
                onChange={onChange}
                placeholder="Phone number"
                countrySelectProps={{ unicodeFlags: true }}
              />
              <InputError error={errors.phone?.message} />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <Label label="Password" />
              <CustomInput
                placeholder="Password"
                type={isPassword ? "password" : "text"}
                className="!h-12 w-[390px] bg-[#FBFBFB]"
                suffixIcon={
                  <Image src={eye} alt="icon" onClick={() => setIsPassword(!isPassword)} className="cursor-pointer" />
                }
                onChange={onChange}
                value={value}
              />
              <InputError error={errors.password?.message} />
            </div>
          )}
        />
      </div>

      <div className="flex gap-2 items-start font-medium">
        <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
        <div className="text-[#343A40] text-[14px]">
          Creating an account means you’re okay with our 
          <span className="text-brand underline text-[14px]">Terms of Service</span> and 
          <span className="text-brand underline text-[14px]">Privacy Policy</span>.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className="btn-primary h-12 w-full flex items-center justify-center !font-medium"
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} /> : <>Create account</>}
        </div>

        <div className="relative mx-auto w-full">
          <h6 className="text-[#6C757D] text-[14px] text-center relative">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 md:w-[160px] w-[150px] h-[1px] bg-[#DEE2E6]"></span>
            Or
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 md:w-[160px] w-[150px] h-[1px] bg-[#DEE2E6]"></span>
          </h6>
        </div>

        <div
          onClick={handleOpenTab}
          className="h-12 w-full border-[1px] border-[#dee2e6] flex justify-center items-center rounded-lg font-medium text-[#495057] cursor-pointer"
        >
          <div>
            <Image src={gg} alt="icon" className="mr-2" />
          </div>{" "}
          Sign in with Google
        </div>
      </div>

      <div className="text-center text-[#495057] text-[14px]">
        Already registered?{" "}
        <Link href="/auth/login" className="text-brand font-medium text-[14px]">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
