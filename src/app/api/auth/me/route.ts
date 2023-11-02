import { UserInfo } from "@/features/auth";
import { NextRequest, NextResponse } from "next/server";

export const DUMMY_USER: UserInfo = {
  id: "1",
  nickname: "노논",
  email: "dev.nonon@gmail.com",
  profileImage: "dummy url",
};

export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: DUMMY_USER });
};
