"use client";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import FormLayouts from "./FormLayouts";
import { createUser, readItems, registerUser } from "@directus/sdk";
import client from "@/directus/api";
import { useEffect, useState } from "react";
import { IOption } from "@/lib/types";
import toOptions from "@/utils/toOptions";
import { entities } from "@/lib/data";
import { Accordion } from "flowbite-react";
import { setIsLoading, setToast } from "@/store/slice/GlobalModalsSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

export type Inputs = {
  email: string;
  password: string;
  group: string;
  first_name?: string;
  last_name?: string;
};

const SignUpContent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "user@gmail.com",
      password: "123",
      group: "1",
    },
  });
  const [options, setOptions] = useState<IOption[]>([]);

  const handleSignIn = async (data: Inputs) => {
    dispatch(setIsLoading(true));
    try {
      const optionalFields: Pick<Inputs, "first_name" | "last_name"> = {
        first_name: data.first_name,
        last_name: data.last_name,
      };
      const user: any = await client.request(
        createUser({
          email: data.email,
          password: data.password,
          group_id: data.group,
          role: "57c1ea9c-6aeb-4451-9cf5-f6cbca2912aa",
          ...optionalFields,
        } as any)
      );
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

  const fetchOptions = async () => {
    const groups: any = await client.request(readItems(entities.groups));
    setOptions(toOptions(groups, "title"));
  };

  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormLayouts type="signup" onSubmit={handleSubmit(handleSignIn)}>
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
        <FormInput
          rest={{
            ...register("group", { required: true }),
          }}
          type="Select"
          options={options}
          label="Group"
          fieldType="text"
          placeholder="21OKC2"
          required
        />
        <FormInput
          rest={{
            ...register("first_name", { required: true }),
          }}
          label="First name"
          fieldType="text"
          placeholder="Jesus"
          required
        />
        <FormInput
          rest={{
            ...register("last_name"),
          }}
          label="First name"
          fieldType="text"
          placeholder="Christ"
          required
        />
      </>
    </FormLayouts>
  );
};

export default SignUpContent;
