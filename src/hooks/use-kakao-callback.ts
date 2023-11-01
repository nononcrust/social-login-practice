import { ROUTE } from "@/constants/route";
import { STORAGE_KEY } from "@/constants/storage";
import { queryKeys } from "@/features/auth";
import { kakaoApi } from "@/features/kakao";
import { cookie } from "@/lib/cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const useKakaoCallback = () => {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const code = params.get("code");

  const sendCode = useCallback(
    async (code: string) => {
      try {
        const { accessToken, userInfo } = await kakaoApi.login({ code });
        cookie.set(STORAGE_KEY.ACCESS_TOKEN, accessToken);
        queryClient.setQueryData(queryKeys.userInfo(), userInfo);
        router.push(ROUTE.HOME);
      } catch (error) {
        router.push(ROUTE.LOGIN);
      }
    },
    [router, queryClient],
  );

  useEffect(() => {
    if (code) {
      sendCode(code);
    } else {
      router.push(ROUTE.LOGIN);
    }
  }, [code, router, sendCode]);
};
