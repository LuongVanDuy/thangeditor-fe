"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { forgetPassword } from "@/lib/api/auth.api";
import Label from "@/components/Form/CustomLabel";
import { CustomInput } from "@/components/Form/CustomInput";
import InputError from "@/components/Form/InputError";

type ForgotPasswordForm = {
  email: string;
};

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required!"),
});

const ForgotPasswordFormComponent = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    forgetPassword(data)
      .then(() => {
        message.success("Check your email for reset link!");
        router.push("/auth/login");
      })
      .catch((err) => {
        message.error(err?.response?.data?.message || "Đã xảy ra lỗi.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <Label label="Email" />
            <CustomInput
              className="!h-12 w-[390px] bg-[#FBFBFB]"
              placeholder="Enter your email"
              onChange={onChange}
              value={value}
            />
            <InputError error={errors.email?.message} />
          </div>
        )}
      />
      <button type="submit" className="btn-primary h-12">
        Submit
      </button>
    </form>
  );
};

export default ForgotPasswordFormComponent;
