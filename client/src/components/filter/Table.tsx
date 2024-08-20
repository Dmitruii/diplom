"use client";

import { Spinner, Table } from "flowbite-react";
import PaginationComp from "./Pagination";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const TableComp = () => {
  const router = useRouter();
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);

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
                {tournaments.map((tournament, i) => (
                  <Table.Row
                    onClick={() => router.push(`/game/${tournament.id}`)}
                    className="cursor-pointer"
                    key={tournament.id}
                  >
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>{tournament.name}</Table.Cell>
                    <Table.Cell>
                      {tournament.winner_id[0]?.item.title ||
                        tournament.winner_id[0]?.item.first_name ||
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
                    <Table.Cell>{tournament.admin_id.first_name}</Table.Cell>
                  </Table.Row>
                ))}
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
