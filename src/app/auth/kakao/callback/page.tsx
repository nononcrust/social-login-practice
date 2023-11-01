"use client";

import { useKakaoCallback } from "@/hooks/use-kakao-callback";

export default function KakaoRedirect() {
  useKakaoCallback();

  return null;
}
