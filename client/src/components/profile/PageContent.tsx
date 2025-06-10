"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import client from "@/directus/api";
import { IUser } from "@/lib/types";
import { readUser } from "@directus/sdk";
import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";

const PageContent = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<IUser>();
  const fetch = async () => {
    const result = await client.request<IUser>(
      readUser(params.id, { fields: ["*", "group_id.*"] })
    );
    setUser(result);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  return (
    <DashboardLayout>
      <div className="flex items-end gap-10">
        <Avatar
          alt="profile"
          img={
            user?.avatar
              ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${user?.avatar}`
              : "/profile.svg"
          }
          size="xl"
          statusPosition="top-center"
        />
        <div className="text-xl">
          <h1>First name: {user?.first_name}</h1>
          {user?.last_name && (
            <h1>Last name: {user?.last_name && "Last name"}</h1>
          )}
        </div>
      </div>
      <div className="my-10 text-xl">Group: {user?.group_id?.title}</div>
    </DashboardLayout>
  );
};

export default PageContent;
