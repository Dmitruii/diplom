import dynamic from "next/dynamic";

const SignUP = dynamic(() => import("@/components/auth/SignUpContent"), {
  ssr: false,
});

export default SignUP;
