import { googleApi } from "@/features/google";
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

  const tokenResponse = await googleApi.getAccessToken(code);

  const googleUserInfo = await googleApi.getUserInfo(
    tokenResponse.access_token,
  );

  // // TODO: save user info to database

  const userInfo = {
    id: googleUserInfo.sub,
    nickname: googleUserInfo.name,
    email: googleUserInfo.email,
    profileImage: googleUserInfo.picture,
  };

  const accessToken = jwt.sign(userInfo);

  const response = {
    userInfo,
    accessToken,
  };

  return NextResponse.json(response);
};
