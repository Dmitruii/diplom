"use client";
import FormInput from "@/components/form/FormInput";
import FormLayouts from "@/components/auth/FormLayouts";
import { useForm } from "react-hook-form";
import { FormEvent, useEffect } from "react";
import client from "@/directus/api";
import { login } from "@directus/sdk";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/store/hooks";
import { setIsLoading, setToast } from "@/store/slice/GlobalModalsSlice";
import { useRouter } from "next/navigation";

export type Inputs = {
  email: string;
  password: string;
};

export default function SignInContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSignIn = async (data: Inputs) => {
    dispatch(setIsLoading(true));
    try {
      const res: any = await client.login(data.email, data.password, {
        mode: "session",
      });
      router.push("/dashboard");
    } catch (e: any) {
      dispatch(
        setToast({
          label: e.errors[0].message,
          type: "error",
        })
      );
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);

  return (
    <FormLayouts onSubmit={handleSubmit(handleSignIn)} type="signin">
      <>
        <FormInput
          rest={{
            ...register("email", { required: true }),
          }}
          label="Your email"
          fieldType="email"
          placeholder="example@gmail.com"
          required
        />
        <FormInput
          rest={{
            ...register("password", { required: true }),
          }}
          label="Password"
          fieldType="password"
          placeholder="••••••••"
          required
        />
      </>
    </FormLayouts>
  );
}
