import { googleApi } from "@/features/google";
import { jwt } from "@/lib/jwt";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

export const ENDPOINT = {
  TOKEN: "https://oauth2.googleapis.com/token",
};

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

  const data = {
    grant_type: "authorization_code",
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    code: code,
  };

  const tokenResponse = await axios.post(ENDPOINT.TOKEN, data);

  const parsedTokenResponse = googleTokenResponseSchema.parse(
    tokenResponse.data,
  );

  const googleUserInfo = await googleApi.getUserInfo(
    parsedTokenResponse.access_token,
  );

  const parsedUserInfo = googleUserInfoSchema.parse(googleUserInfo);

  // // TODO: save user info to database

  const userInfo = {
    id: parsedUserInfo.sub,
    nickname: parsedUserInfo.name,
    email: parsedUserInfo.email,
    profileImage: parsedUserInfo.picture,
  };

  const accessToken = jwt.sign(userInfo);

  const response = {
    userInfo,
    accessToken,
  };

  return NextResponse.json(response);
};

const googleTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
  id_token: z.string().optional(),
});

const googleUserInfoSchema = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  picture: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  locale: z.string(),
});
