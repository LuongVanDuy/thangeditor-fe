"use client";

import { useEffect, useState } from "react";
import { message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { sendMail } from "@/lib/api/send-mail.api";
import * as Yup from "yup";
import Label from "@/components/Form/CustomLabel";
import { CustomInput, CustomTextarea } from "@/components/Form/CustomInput";
import InputError from "@/components/Form/InputError";

const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required!").max(50, "Full name cannot exceed 50 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required!"),
  phoneNumber: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Invalid phone number"),
  message: Yup.string().required("Message is required!").max(1000, "Message cannot exceed 1000 characters"),
  captcha: Yup.string().required("Captcha is required"),
});

const Support = () => {
  const [captcha, setCaptcha] = useState<string>("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const generateCaptcha = () => {
      const captchaValue = Math.floor(Math.random() * 1000000);
      setCaptcha(captchaValue.toString());
    };
    generateCaptcha();
  }, []);

  const { mutate: sendMailMutation, isLoading } = useMutation((data: any) => sendMail(data), {
    onSuccess(response: any) {
      message.success("Success!");
      reset();
    },
    onError(err: any) {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = (data: any) => {
    if (data.captcha !== captcha) {
      message.error("The captcha is incorrect.");
      return;
    }
    sendMailMutation(data);
  };

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - 24px)" }}
        className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6"
      >
        <div className="flex justify-center py-12 md:py-[56px] lg:py-[64px]">
          <div>
            <div className="mb-9 md:mb-12">
              <h1 className="font-medium text-[24px] md:text-[30px] lg:text-[36px] mb-4">Contact us</h1>
              <h2 className="text-[#6C757D] text-[16px] md:text-[18px]">
                You can reach us anytime via{" "}
                <span className="text-primary text-[16px] md:text-[18px]">hi@vamedia.com</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <Controller
                name="fullname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label="Fullname" />
                    <CustomInput
                      className="!h-12  bg-[#FBFBFB]"
                      placeholder="Your name"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.fullname?.message} />
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
                      className="!h-12  bg-[#FBFBFB]"
                      placeholder="Enter your email"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.email?.message} />
                  </div>
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label="Phone number" />
                    <CustomInput
                      className="!h-12  bg-[#FBFBFB]"
                      placeholder="Enter phone number"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.phoneNumber?.message} />
                  </div>
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label="Message" />
                    <CustomTextarea
                      className="bg-[#FBFBFB]"
                      placeholder="Enter message"
                      onChange={onChange}
                      value={value}
                      rows={4}
                    />
                    <InputError error={errors.message?.message} />
                  </div>
                )}
              />

              <Controller
                name="captcha"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label={`Enter the number shown: ${captcha}`} />
                    <CustomInput
                      className="!h-12 bg-[#FBFBFB]"
                      placeholder="Enter captcha"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.captcha?.message} />
                  </div>
                )}
              />
            </div>

            <div onClick={handleSubmit(onSubmit)} className="btn-primary h-12 w-[88px]">
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
