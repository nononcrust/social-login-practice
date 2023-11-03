import { api } from "@/configs/axios";
import axios from "axios";
import { z } from "zod";

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI!;
export const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;
export const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`;

const ENDPOINT = {
  TOKEN: "https://nid.naver.com/oauth2.0/token",
  USER_INFO: "https://openapi.naver.com/v1/nid/me",
};

export const naverApi = {
  login: async (body: { code: string }) => {
    const response = await api.post("/auth/naver", body);

    return naverLoginResponseSchema.parse(response.data);
  },
  getAccessToken: async (code: string) => {
    const params = {
      grant_type: "authorization_code",
      client_id: NAVER_CLIENT_ID,
      client_secret: NAVER_CLIENT_SECRET,
      redirect_uri: NAVER_REDIRECT_URI,
      code: code,
      state: "random string",
    };

    const response = await axios.get(ENDPOINT.TOKEN, { params });

    return naverTokenResponseSchema.parse(response.data);
  },
  getUserInfo: async (accessToken: string) => {
    const response = await axios.get(ENDPOINT.USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return naverUserInfoSchema.parse(response.data);
  },
};

const naverTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.string(),
});

const naverUserInfoSchema = z.object({
  resultcode: z.string(),
  message: z.string(),
  response: z.object({
    id: z.string(),
    nickname: z.string(),
    profile_image: z.string(),
    email: z.string(),
    mobile: z.string(),
    mobile_e164: z.string(),
    name: z.string(),
  }),
});

const naverLoginResponseSchema = z.object({
  accessToken: z.string(),
  userInfo: z.object({
    id: z.string(),
    nickname: z.string(),
    email: z.string(),
    profileImage: z.string(),
  }),
});
