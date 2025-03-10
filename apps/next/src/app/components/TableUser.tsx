/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@nx-monorepo/component";
import { Button } from '@nx-monorepo/component';
import { Trash, Pencil, View } from 'lucide-react';
import Link from 'next/link';
import { UserModel } from '../../../../shared/types/users';
import { useDeleteUser } from '../utils/hooks/user';

export default function DataTable({ data }: { data: UserModel[] }) {
    const deleteUser = useDeleteUser();

    const columns: ColumnDef<UserModel>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "username", header: "Username" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "address", header: "Address" },
        { accessorKey: "phone", header: "Phone" },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="destructive" size="sm" onClick={() => deleteUser.mutate(row.original.id)}>
                        <Trash size='16' />
                    </Button>
                    <Link href={`/users/${row.original.id}/edit`}>
                        <Button variant="outline" size="sm">
                            <Pencil size='16' />
                        </Button>
                    </Link>
                    <Link href={`/users/${row.original.id}`}>
                        <Button variant="outline" size="sm">
                            <View size='16' />
                        </Button>
                    </Link>
                </div>
            ),
        }
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex justify-center">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id} className="text-center">
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}