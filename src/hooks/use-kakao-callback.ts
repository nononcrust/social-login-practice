import { ROUTE } from "@/constants/route";
import { STORAGE_KEY } from "@/constants/storage";
import { queryKeys } from "@/features/auth";
import { kakaoApi } from "@/features/kakao";
import { cookie } from "@/lib/cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export const useKakaoCallback = () => {
  const initialized = useRef(false);

  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const code = params.get("code");

  const loginWithAuthCode = useCallback(
    async (code: string) => {
      try {
        const { accessToken, userInfo } = await kakaoApi.login({ code });
        cookie.set(STORAGE_KEY.ACCESS_TOKEN, accessToken);
        queryClient.setQueryData(queryKeys.userInfo(), { user: userInfo });
        router.replace(ROUTE.HOME);
      } catch (error) {
        router.replace(ROUTE.LOGIN);
      }
    },
    [router, queryClient],
  );

  useEffect(() => {
    if (initialized.current) return;

    if (code) {
      loginWithAuthCode(code);
      initialized.current = true;
    } else {
      router.replace(ROUTE.LOGIN);
    }
  }, [code, router, loginWithAuthCode]);
};
