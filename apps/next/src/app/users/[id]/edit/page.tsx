"use client";

import React, {  use } from "react";
import UserForm from "../../../components/FormUser";
import { useGetUserById } from "../../../utils/hooks/user";

export default function UserEdit({ params }: { params: Promise<{ id: number }> }) {
    const { id: userId } = use(params);
    
    const getUserByIdQuery = useGetUserById(userId);

    const user = getUserByIdQuery.data;

    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                {getUserByIdQuery.isLoading && getUserByIdQuery.isPending?(
                    <div>
                        loading
                    </div>
                ) : (  
                    <UserForm user={user} titleText="Update User" buttonText="Update" required={true}></UserForm>
                )}
            </div>
        </div>
    );
}
