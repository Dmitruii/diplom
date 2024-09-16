"use client";

import { useRouter } from "next/navigation";

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayout) => {
  const router = useRouter();
  const directus_data = localStorage.getItem("directus-data") as string;
  const { access_token } = JSON.parse(directus_data || "{}") as {
    access_token: string;
  };

  if (!access_token) {
    router.push("/signin");
  }

  return <>{children}</>;
};

export default AuthLayout;
