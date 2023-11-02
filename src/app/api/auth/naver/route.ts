import { naverApi } from "@/features/naver";
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

  const naverTokenResponse = await naverApi.getAccessToken(code);

  const naverUserInfo = await naverApi.getUserInfo(
    naverTokenResponse.access_token,
  );

  // TODO: save user info to database

  const userInfo = {
    id: naverUserInfo.response.id,
    nickname: naverUserInfo.response.name,
    email: naverUserInfo.response.email,
    profileImage: naverUserInfo.response.profile_image,
  };

  const accessToken = jwt.sign(userInfo);

  const response = {
    accessToken: accessToken,
    userInfo: userInfo,
  };

  return NextResponse.json(response);
};
