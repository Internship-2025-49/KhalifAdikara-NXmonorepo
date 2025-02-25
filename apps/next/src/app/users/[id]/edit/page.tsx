"use client";

import React, {  use } from "react";
import { useQuery  } from "@tanstack/react-query";
import { getUserById } from "../../../utils/queries/users/[id]/query";
import UserForm from "../../../components/FormUser";

export default function UserEdit({ params }: { params: Promise<{ id: number }> }) {
    const { id: userId } = use(params);

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById({ id: userId })
    });
    
    if (!user) return <div>User not found.</div>;

    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                <UserForm user={user} titleText="Update User" buttonText="Update" required={true}></UserForm>
            </div>
        </div>
    );
}
