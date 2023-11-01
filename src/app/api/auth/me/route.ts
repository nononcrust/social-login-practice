import { UserInfo } from "@/features/auth";
import { NextRequest, NextResponse } from "next/server";

export const DUMMY_USER: UserInfo = {
  id: 1,
  nickname: "노논",
  email: "dev.nonon@gmail.com",
  profileImage: "dummy url",
};

export const GET = async (request: NextRequest) => {
  console.log("me api called");
  const token = request.headers.get("Authorization");
  console.log("token", token);

  if (!token) {
    return NextResponse.json(null);
  }

  return NextResponse.json(DUMMY_USER);
};
