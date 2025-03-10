'use client'

import { Card, CardContent } from "@nx-monorepo/component";
import { use } from "react";
import { useGetUserById } from "../../utils/hooks/user";

export default function Detail({ params }: { params: Promise<{ id: number }> }) {
    const { id: userId } = use(params);

    const getUserByIdQuery = useGetUserById(userId);

    const user = getUserByIdQuery.data;
        
    return (
        <div>
            {getUserByIdQuery.isLoading && getUserByIdQuery.isPending?(
                <div>
                    loading
                </div>
            ) : (  
                <div className='w-full flex flex-col items-center space-y-4 py-6'>
                    <h2 className='text-center font-bold text-3xl'>{user.username}</h2>
                    <Card className='w-full max-w-4xl'>
                        <CardContent>
                            <b>Name</b>
                            <p>{user.name}</p>
                        </CardContent>
                    </Card>
                    <Card className='w-full max-w-4xl'>
                        <CardContent>
                            <b>Address</b>
                            <p>{user.address}</p>
                        </CardContent>
                    </Card>
                    <Card className='w-full max-w-4xl'>
                        <CardContent>
                            <b>Phone</b>
                            <p>{user.phone}</p>
                        </CardContent>
                    </Card>
            </div>
            )}
        </div>
    );
}
