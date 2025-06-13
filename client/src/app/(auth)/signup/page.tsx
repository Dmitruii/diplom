import dynamic from "next/dynamic";

export const metadata = {
  title: "Sign up",
};

const SignUP = dynamic(() => import("@/components/auth/SignUpContent"), {
  ssr: false,
});

export default SignUP;
