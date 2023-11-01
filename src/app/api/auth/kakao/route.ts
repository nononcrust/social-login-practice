import { kakaoApi } from "@/features/kakao";
import { jwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postRequestSchema = z.object({
  code: z.string(),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = postRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error }, { status: 400 });
  }

  const { code } = parsedBody.data;

  const kakaoTokenResponse = await kakaoApi.getAccessToken(code);

  const kakaoUserInfo = await kakaoApi.getUserInfo(
    kakaoTokenResponse.access_token,
  );

  // TODO: save user info to database

  const userInfo = {
    id: kakaoUserInfo.id,
    nickname: kakaoUserInfo.properties.nickname,
    email: "dev.nonon@gmail.com",
    profileImage: kakaoUserInfo.properties.profile_image,
  };

  const accessToken = jwt.sign(userInfo);

  const response = {
    accessToken: accessToken,
    userInfo: userInfo,
  };

  return NextResponse.json(response);
};
