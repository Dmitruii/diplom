import Link from "next/link";
import Image from "next/image";
import Logo from "../common/Logo";
import { Button } from "flowbite-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GoogleButton from "./GoogleButton";
import { useEffect } from "react";
import client from "@/directus/api";

interface IFormLayouts {
  children: JSX.Element;
  type: "signin" | "signup";
  onSubmit: any;
}

const FormLayouts = ({ children, type, onSubmit }: IFormLayouts) => {
  const isSignIn = type === "signin";
  const typeLabel = isSignIn ? "Sign in" : "Sign up";

  return (
    <div className="my-auto w-1/2 gap-8 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <Logo />

      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {typeLabel}
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            {children}
            <Button className={`w-full`} color="blue" onClick={onSubmit}>
              {typeLabel}
            </Button>

            {/* <div className="flex justify-center items-center gap-2">
              <hr className="h-0.5 w-full bg-black" />
              <span>OR</span>
              <hr className="h-0.5 w-full bg-black" />
            </div>

            <a href="http://localhost:8055/auth/login/google?redirect=http://localhost:3000/signin">
              Login
            </a>

            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
            >
              <GoogleButton label={typeLabel} />
            </GoogleOAuthProvider> */}

            <p className="text-sm font-light text-gray-500">
              {isSignIn ? "Don't have an account?" : "Already have account?"}{" "}
              <Link
                href={!isSignIn ? "signin" : "signup"}
                className="font-medium text-blue-600 hover:underline"
              >
                {!isSignIn ? "Sign in" : "Sign up"}
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="flex gap-10">
        <span>
          About{" "}
          <a
            className="text-blue-700 hover:underline"
            href="/about/developer"
            target="_blank"
          >
            Developer
          </a>
        </span>
        <span>
          About{" "}
          <a
            className="text-blue-700 hover:underline"
            href="/about/project"
            target="_blank"
          >
            Project
          </a>
        </span>
      </div>
    </div>
  );
};

export default FormLayouts;
