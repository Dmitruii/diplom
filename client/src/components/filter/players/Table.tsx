"use client";

import { Avatar, Spinner, Table } from "flowbite-react";
import PaginationComp from "./Pagination";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const TableComp = () => {
  const router = useRouter();
  const users = useAppSelector((state) => state.users.users);

  return (
    <>
      {users ? (
        <>
          <div className="overflow-x-auto rounded border">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>№</Table.HeadCell>
                <Table.HeadCell>Avatar</Table.HeadCell>
                <Table.HeadCell>First name</Table.HeadCell>
                <Table.HeadCell>Last name</Table.HeadCell>
                <Table.HeadCell>email</Table.HeadCell>
                <Table.HeadCell>Group</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.map((user, i) => {
                  return (
                    <Table.Row
                      onClick={() => router.push(`/profile/${user.id}`)}
                      className="cursor-pointer"
                      key={user.id}
                    >
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell className="">
                        <Avatar
                          alt="profile"
                          img={
                            user?.avatar
                              ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${user?.avatar}`
                              : "/profile.svg"
                          }
                          size="sm"
                          statusPosition="top-center"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.first_name}</Table.Cell>
                      <Table.Cell>{user.last_name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.group_id.title}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
          <PaginationComp />
        </>
      ) : (
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
};

export default TableComp;
