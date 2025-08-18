"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api/auth.api";
import Label from "@/components/Form/CustomLabel";
import { CustomInput } from "@/components/Form/CustomInput";
import InputError from "@/components/Form/InputError";

type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

const passwordSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required!"),
});

const ResetPasswordFormComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ResetPasswordForm) => {
    if (!token) return;
    resetPassword({ token, newPassword: data.newPassword })
      .then(() => {
        message.success("Password reset successfully!");
        router.push("/auth/login");
      })
      .catch((err) => {
        message.error(err?.response?.data?.message || "Đã xảy ra lỗi.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="newPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <Label label="New Password" />
            <CustomInput
              type="password"
              className="!h-12 w-[390px] bg-[#FBFBFB]"
              placeholder="Enter new password"
              onChange={onChange}
              value={value}
            />
            <InputError error={errors.newPassword?.message} />
          </div>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <Label label="Confirm Password" />
            <CustomInput
              type="password"
              className="!h-12 w-[390px] bg-[#FBFBFB]"
              placeholder="Confirm new password"
              onChange={onChange}
              value={value}
            />
            <InputError error={errors.confirmPassword?.message} />
          </div>
        )}
      />
      <button type="submit" className="btn-primary h-12">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordFormComponent;
