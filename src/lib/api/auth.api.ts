import axiosClient from ".";

export function Login(payload: { email: string; password: string }) {
  return axiosClient.post("login", payload);
}

export function LoginWithToken(payload: { email: string; verifyToken: string }) {
  return axiosClient.post("login/token", payload);
}

export function Register(payload: { email: string; password: string; name: string; phone: string }) {
  return axiosClient.post("signup", payload);
}

export function getRefreshToken(payload: { token: string }) {
  return axiosClient.post("refresh-token", payload);
}

export function getProfile() {
  return axiosClient.get("profile");
}

export function updateProfile(payload: any) {
  return axiosClient.put("update-profile", payload);
}

export function forgetPassword(payload: { email: string }) {
  return axiosClient.post("forgot-password", payload);
}

export function changePassword(payload: { password: string; newPassword: string; confirmNewPassword: string }) {
  return axiosClient.post("change-password", payload);
}

export function googleLogin(code: string) {
  return axiosClient.get(`google/callback?code=${code}`);
}

export const uploadFile = async (files: any) => {
  try {
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("files", file);
    });
    const response = await axiosClient.post("file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendOrderMail = (payload: any) => {
  return axiosClient.post("/mail/order-completion", payload);
};

export const removeNewPerson = () => {
  return axiosClient.patch("/removeNewPerson");
};
