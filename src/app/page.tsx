"use client";

import { ROUTE } from "@/constants/route";
import { useUserInfo } from "@/features/auth";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function Home() {
  const userInfoQuery = useUserInfo();
  const { logout } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center">
      {!userInfoQuery.data?.user && userInfoQuery.isFetched && (
        <Link
          href={ROUTE.LOGIN}
          className="rounded-md bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
          onClick={logout}
        >
          로그인
        </Link>
      )}
      {userInfoQuery.data?.user && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{userInfoQuery.data.user.nickname}님 환영합니다.</p>
          <button
            className="rounded-md bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      )}
    </main>
  );
}
