import { GoogleLoginButton } from "@/components/google-login-button";
import { KakaoLoginButton } from "@/components/kakao-login-button";
import { NaverLoginButton } from "@/components/naver-login-button";
import { KAKAO_LOGIN_URL } from "@/features/kakao";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-lg font-medium">소셜 계정으로 로그인</h1>
      <div className="flex gap-4">
        <GoogleLoginButton href={"/"} />
        <KakaoLoginButton href={KAKAO_LOGIN_URL} />
        <NaverLoginButton href={"/"} />
      </div>
    </main>
  );
}
