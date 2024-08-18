import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

interface IGoogleButton {
  label: string;
}

const GoogleButton = ({ label }: IGoogleButton) => {
  const onSubmit = useGoogleLogin({
    onSuccess: async (codeResponse: any) => {
      console.log(codeResponse);
      //   const res: any = jwtDecode(codeResponse.access_token);
      const { data: profile } = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
        }
      );
      console.log(profile);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <button
      onClick={() => onSubmit()}
      type="submit"
      className="hover:bg-slate-50 w-full flex justify-center text-blue-600 border-2 border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center gap-3"
    >
      <Image alt="google" src="/google.svg" width={20} height={20} />
      <span>{label} with Google</span>
    </button>
  );
};

export default GoogleButton;
