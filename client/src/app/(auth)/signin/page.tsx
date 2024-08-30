import dynamic from "next/dynamic";

const SignIn = dynamic(() => import("@/components/auth/SignInContent"), {
  ssr: false,
});

export default SignIn;
