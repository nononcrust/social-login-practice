import { api } from "@/configs/axios";
import axios from "axios";
import { z } from "zod";
import { socialLoginResponseSchema } from "./auth";

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

export const ENDPOINT = {
  TOKEN: "https://oauth2.googleapis.com/token",
  USER_INFO: "https://www.googleapis.com/oauth2/v3/userinfo",
};

export const googleApi = {
  login: async (body: { code: string }) => {
    const response = await api.post("/auth/google", body);
    return socialLoginResponseSchema.parse(response.data);
  },
  getAccessToken: async (code: string) => {
    const data = {
      grant_type: "authorization_code",
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      code: code,
    };

    const response = await axios.post(ENDPOINT.TOKEN, data);
    return googleTokenResponseSchema.parse(response.data);
  },
  getUserInfo: async (accessToken: string) => {
    const response = await axios.get(ENDPOINT.USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return googleUserInfoSchema.parse(response.data);
  },
};

const googleTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
  id_token: z.string().optional(),
});

const googleUserInfoSchema = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  picture: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  locale: z.string(),
});
