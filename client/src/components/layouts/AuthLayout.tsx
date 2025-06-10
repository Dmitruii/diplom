"use client";

import { useRouter, usePathname } from "next/navigation";
import { navigate } from "./redirect";

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = (props: IAuthLayout) => {
  const router = useRouter();
  const pathname = usePathname();
  const directus_data = localStorage.getItem("directus-data") as string;
  const { access_token } = JSON.parse(directus_data || "{}") as {
    access_token: string;
  };

  if (pathname === "/dashboard") {
    if (!access_token) {
      navigate();
    }
  }

  return <>{props.children}</>;
};

export default AuthLayout;
