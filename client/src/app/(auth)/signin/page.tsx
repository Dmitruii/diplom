import dynamic from "next/dynamic";

export const metadata = {
  title: "Sign in",
};

const SignIn = dynamic(() => import("@/components/auth/SignInContent"), {
  ssr: false,
});

export default SignIn;
