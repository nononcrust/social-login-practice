import { api } from "@/configs/axios";
import axios from "axios";
import { z } from "zod";
import { userInfoSchema } from "./auth";

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

export const ENDPOINT = {
  TOKEN: "https://oauth2.googleapis.com/token",
  USER_INFO: "https://www.googleapis.com/oauth2/v3/userinfo",
};

export const googleApi = {
  login: async (body: { code: string }) => {
    const response = await api.post("/auth/google", body);
    return googleLoginResponseSchema.parse(response.data);
  },
  getUserInfo: async (accessToken: string) => {
    const response = await axios.get(ENDPOINT.USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },
};

const googleLoginResponseSchema = z.object({
  accessToken: z.string(),
  userInfo: userInfoSchema,
});
