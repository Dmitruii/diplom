"use client";

import { Spinner, Table } from "flowbite-react";
import PaginationComp from "./Pagination";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const TableComp = () => {
  const router = useRouter();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  const page = useAppSelector((state) => state.tournaments.page);
  const limit = useAppSelector((state) => state.tournaments.limit);

  return (
    <>
      {tournaments ? (
        <>
          <div className="overflow-x-auto rounded border">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>№</Table.HeadCell>
                <Table.HeadCell>title</Table.HeadCell>
                <Table.HeadCell>winer</Table.HeadCell>
                <Table.HeadCell>date</Table.HeadCell>
                <Table.HeadCell>game</Table.HeadCell>
                <Table.HeadCell>location</Table.HeadCell>
                <Table.HeadCell>admin</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {tournaments.map((tournament, i) => {
                  const index = page * limit - limit + i + 1;
                  return (
                    <Table.Row
                      onClick={() => router.push(`/game/${tournament.id}`)}
                      className="cursor-pointer"
                      key={tournament.id}
                    >
                      <Table.Cell>{page === 1 ? i + 1 : index}</Table.Cell>
                      <Table.Cell>{tournament.name}</Table.Cell>
                      <Table.Cell>
                        {(tournament.winner_id[0] as any)?.item.title ||
                          (tournament.winner_id[0] as any)?.item.first_name ||
                          "No winner"}
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(tournament.date_created).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Table.Cell>
                      <Table.Cell>{tournament.games_id.name}</Table.Cell>
                      <Table.Cell>{tournament.location.title}</Table.Cell>
                      <Table.Cell
                        className="hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/profile/${tournament.admin_id.id}`);
                        }}
                      >
                        {tournament.admin_id.first_name}
                      </Table.Cell>
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
