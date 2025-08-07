"use client";

import { message } from "antd";
import { setCookie } from "nookies";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { googleLogin, LoginWithToken } from "@/lib/api/auth.api";
import { setRefreshToken, setToken } from "@/lib/helpers";
import { useEffect } from "react";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: loginWithTokenMutation, isPending: isLoggingIn } = useMutation({
    mutationFn: (payload: { email: string; verifyToken: string }) => LoginWithToken(payload),
    onSuccess: (response: any) => {
      message.success("Success!");
      setToken(response?.accessToken);
      setRefreshToken(response?.refreshToken);

      setCookie(null, "ACCESS_TOKEN", response?.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: false,
      });

      router.replace("/");
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message || "Đăng nhập thất bại!");
      console.error("Error during token login:", err?.response?.data?.message);
    },
  });

  const {
    data,
    isLoading: isFetchingGoogleData,
    isError,
  } = useQuery({
    queryKey: ["googleLogin", code],
    queryFn: () => {
      if (code) {
        return googleLogin(code);
      }
      throw new Error("Code không tồn tại!");
    },
    enabled: !!code,
  });

  useEffect(() => {
    if (data && !isFetchingGoogleData) {
      const userData = data?.data;

      if (userData) {
        loginWithTokenMutation({
          email: userData.email,
          verifyToken: userData.verifyToken,
        });
      }
    }
  }, [data, isFetchingGoogleData]);

  useEffect(() => {
    if (isError) {
      message.error("Không thể xác thực với Google!");
      console.error("Error fetching Google data");
    }
  }, [isError]);

  if (isFetchingGoogleData || isLoggingIn) {
    return (
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        Đang xử lý đăng nhập...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        Có lỗi xảy ra trong quá trình xác thực!
      </div>
    );
  }

  return (
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      Đăng nhập thành công, đang chuyển hướng...
    </div>
  );
};

export default GoogleCallback;
