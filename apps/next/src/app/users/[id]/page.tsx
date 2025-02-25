'use client'

import { getUserById } from "../../utils/queries/users/[id]/query";
import { Card, CardContent } from "@nx-monorepo/component";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Detail({ params }: { params: Promise<{ id: number }> }) {
    const { id: userId } = use(params);

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById({ id: userId }),
    });

    if (!user) return <div><span>No user found</span></div>;

    return (
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
    );
}
