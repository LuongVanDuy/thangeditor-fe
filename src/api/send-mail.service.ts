import { NextApiRequest, NextApiResponse } from "next";
import axiosClient from ".";

// export function sendMail(payload: any) {
//   return axiosClient.post("mail/test", payload);
// }

export function sendMail(payload: any) {
  return axiosClient.post("mail/contact-form", payload);
}

export function sendFeedBack(payload: any) {
  return axiosClient.post("feedback", payload);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const captcha = Math.floor(100000 + Math.random() * 900000);
  res.status(200).json({ captcha });
}
