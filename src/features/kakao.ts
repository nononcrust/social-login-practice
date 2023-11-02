import { api } from "@/configs/axios";
import axios from "axios";
import { z } from "zod";
import { userInfoSchema } from "./auth";

const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;

const ENDPOINT = {
  KAKAO_TOKEN_URL: "https://kauth.kakao.com/oauth/token",
  KAKAO_USER_INFO_URL: "https://kapi.kakao.com/v2/user/me",
};

export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const kakaoApi = {
  login: async (body: { code: string }) => {
    const response = await api.post("/auth/kakao", body);
    return kakaoLoginResponseSchema.parse(response.data);
  },
  getAccessToken: async (code: string) => {
    const data = {
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: code,
    };

    const response = await axios.post(ENDPOINT.KAKAO_TOKEN_URL, data, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return kakaoTokenSchema.parse(response.data);
  },
  getUserInfo: async (accessToken: string) => {
    const response = await axios.get(ENDPOINT.KAKAO_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return kakaoUserInfoSchema.parse(response.data);
  },
};

export const kakaoTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token_expires_in: z.number(),
});

export type KakaoToken = z.infer<typeof kakaoTokenSchema>;

export const kakaoUserInfoSchema = z.object({
  id: z.number(),
  connected_at: z.string(),
  properties: z.object({
    nickname: z.string(),
    profile_image: z.string(),
    thumbnail_image: z.string(),
  }),
  kakao_account: z.object({
    profile_nickname_needs_agreement: z.boolean(),
    profile_image_needs_agreement: z.boolean(),
    profile: z.object({
      nickname: z.string(),
      thumbnail_image_url: z.string(),
      profile_image_url: z.string(),
      is_default_image: z.boolean(),
    }),
  }),
});

export type KakaoUserInfo = z.infer<typeof kakaoUserInfoSchema>;

export const kakaoLoginResponseSchema = z.object({
  accessToken: z.string(),
  userInfo: userInfoSchema,
});

export type KakaoLoginResponse = z.infer<typeof kakaoLoginResponseSchema>;
