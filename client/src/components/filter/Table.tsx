'use client';

import { PlayerExampleData } from '@/lib/data';
import { Table } from 'flowbite-react';
import PaginationComp from './Pagination';

const TableComp = () => {
  const { head, body } = PlayerExampleData
  return (
    <>
    <div className="overflow-x-auto rounded border">
      <Table striped>
        <Table.Head>
          {head.map(cell => <Table.HeadCell key={cell}>{cell}</Table.HeadCell>)}
        </Table.Head>
        <Table.Body className="divide-y">
          {body.map(row => <Table.Row key={row[1]}>
            {row.map(cell => <Table.Cell key={cell}>{cell}</Table.Cell>)}
          </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
    <PaginationComp />
    </>
  );
}

export default TableComp