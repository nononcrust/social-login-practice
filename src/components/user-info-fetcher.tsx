import { api } from "@/configs/axios";
import { STORAGE_KEY } from "@/constants/storage";
import { prefetchUserInfo } from "@/features/auth";
import { HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

export const UserInfoFetcher = async ({ children }: PropsWithChildren) => {
  const accessToken = cookies().get(STORAGE_KEY.ACCESS_TOKEN)?.value;

  console.log("accessToken", accessToken);
  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("prefetching!!");

  const { dehydratedState } = await prefetchUserInfo();
  console.log("@dehydratedState", dehydratedState);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};
