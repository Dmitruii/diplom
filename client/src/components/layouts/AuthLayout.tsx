"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    // Redirect to dashboard if user is logged in and on signin/signup pages
    if (access_token && (pathname === "/signin" || pathname === "/signup")) {
      router.push("/dashboard");
    }
    // Redirect to login if user is not logged in and on dashboard
    if (pathname === "/dashboard" && !access_token) {
      navigate();
    }
  }, [access_token, pathname, router]);

  return <>{props.children}</>;
};

export default AuthLayout;
