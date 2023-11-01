import { DUMMY_USER } from "@/app/api/auth/me/route";
import { api } from "@/configs/axios";
import { getQueryClient } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const ENDPOINT = "/auth";

export const authApi = {
  getUserInfo: async () => {
    const response = await api.get(ENDPOINT + "/me");
    return userInfoSchema.parse(response.data);
  },
};

export const userInfoSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  email: z.string(),
  profileImage: z.string(),
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
  console.log("getting user info...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_USER);
    }, 100);
  });
};

export const prefetchUserInfo = async () => {
  const queryClient = getQueryClient();
  const dehydratedState = await queryClient.prefetchQuery({
    queryKey: queryKeys.userInfo(),
    queryFn: getUserInfo,
  });

  return { dehydratedState };
};
