"use client";
import FormInput from "@/components/form/FormInput";
import FormLayouts from "@/components/auth/FormLayouts";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import client from "@/directus/api";
import { useAppDispatch } from "@/store/hooks";
import { setIsLoading, setToast } from "@/store/slice/GlobalModalsSlice";
import { useRouter } from "next/navigation";
import { login, readItems, withOptions } from "@directus/sdk";
import { entities } from "@/lib/data";

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
      // const team = await client.request(
      //   withOptions(readItems(entities.teams), {
      //     credentials: "include",
      //   })
      // );
      const res: any = await client.login(data.email, data.password, {
        // mode: "cookie",
      });
      const games = await client.request(readItems(entities.teams));
      // console.log(games);
      const d = await client.getToken();
      // console.log(d);
      router.push("/dashboard");
    } catch (e: any) {
      console.log(e);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
