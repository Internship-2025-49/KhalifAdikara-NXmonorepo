"use client";

import React from "react";
import { Plus } from 'lucide-react';
import Link from "next/link";
import { Button } from "@nx-monorepo/component";
import DataTable from "../components/TableUser";
import { useGetUsers } from "../utils/hooks/user";
export default function Users() {
    const { data: users = [], isLoading } = useGetUsers();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-5">List Users - Counter: {Array.isArray(users) ? users.length : 0}</h2>
            <div className="flex justify-center">
                <Link href={`/users/create`}>
                    <Button className="mb-4">Create User<Plus /></Button>
                </Link>
            </div>
            <DataTable data={Array.isArray(users) ? users : []} />
        </div>
    );
}