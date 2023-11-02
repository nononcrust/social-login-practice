"use client";

import { useGoogleCallback } from "@/hooks/use-google-callback";

export default function GoogleRedirect() {
  useGoogleCallback();

  return null;
}
