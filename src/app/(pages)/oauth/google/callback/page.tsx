"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { googleLogin, LoginWithToken } from "@/api/auth.service";
import { message } from "antd";
import { setRefreshToken, setToken } from "@/helper/storage";
import { setCookie } from "nookies";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: loginWithTokenMutation, isLoading: isLoggingIn } = useMutation(
    (payload: { email: string; verifyToken: string }) => LoginWithToken(payload),
    {
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
        message.error(err.response?.data?.message || "Đăng nhập thất bại!");
        console.error("Error during token login:", err.response?.data?.message);
      },
    },
  );

  const {
    data,
    isLoading: isFetchingGoogleData,
    isError,
  } = useQuery(
    ["googleLogin", code],
    () => {
      if (code) {
        return googleLogin(code);
      }
      throw new Error("Code không tồn tại!");
    },
    {
      enabled: !!code,
      onSuccess: (response) => {
        const userData = response?.data;

        if (userData) {
          loginWithTokenMutation({
            email: userData.email,
            verifyToken: userData.verifyToken,
          });
        }
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message || "Không thể xác thực với Google!");
        console.error("Error fetching Google data:", err.response?.data?.message);
      },
    },
  );

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
