"use client";

import { GOOGLE_REDIRECT_URI } from "@/features/google";
import { useGoogleLogin } from "@react-oauth/google";

export const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    ux_mode: "redirect",
    redirect_uri: GOOGLE_REDIRECT_URI,
    flow: "auth-code",
  });

  return (
    <button
      onClick={login}
      className="flex h-[48px] w-[48px] items-center justify-center rounded-full border"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 20 20"
      >
        <defs>
          <path id="a" d="M0 0h348v46H0z"></path>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-16 -13)">
            <use></use>
            <path stroke="#DADCE0" d="M-.5-.5h349v47H-.5z"></path>
          </g>
          <path
            fill="#4285F4"
            d="M18.64 10.205c0-.639-.057-1.252-.164-1.841H10v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
          ></path>
          <path
            fill="#34A853"
            d="M10 19c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H1.957v2.332A8.997 8.997 0 0 0 10 19z"
          ></path>
          <path
            fill="#FBBC05"
            d="M4.964 11.71A5.41 5.41 0 0 1 4.682 10c0-.593.102-1.17.282-1.71V5.958H1.957A8.996 8.996 0 0 0 1 10c0 1.452.348 2.827.957 4.042l3.007-2.332z"
          ></path>
          <path
            fill="#EA4335"
            d="M10 4.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C14.463 1.891 12.426 1 10 1a8.997 8.997 0 0 0-8.043 4.958L4.964 8.29C5.672 6.163 7.656 4.58 10 4.58z"
          ></path>
          <path d="M0 0h20v20H0z"></path>
        </g>
      </svg>
    </button>
  );
};
