import { DUMMY_USER } from "@/app/api/auth/me/route";
import { api } from "@/configs/axios";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { z } from "zod";

const ENDPOINT = "/auth";

export const authApi = {
  getUserInfo: async () => {
    const response = await api.get(ENDPOINT + "/me");
    return userInfoResponseSchema.parse(response.data);
  },
};

export const userInfoSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  email: z.string(),
  profileImage: z.string(),
});

export const userInfoResponseSchema = z.object({
  user: userInfoSchema.optional(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

export const queryKeys = {
  userInfo: () => [ENDPOINT + "/me"] as const,
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: queryKeys.userInfo(),
    queryFn: authApi.getUserInfo,
  });
};

const getUserInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_USER);
    }, 100);
  });
};

export const prefetchUserInfo = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.userInfo(),
    queryFn: getUserInfo,
  });

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
};
