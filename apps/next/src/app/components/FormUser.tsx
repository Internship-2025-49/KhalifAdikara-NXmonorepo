/* eslint-disable @nx/enforce-module-boundaries */
"use client";

import React from 'react';
import { Input } from '../../../../../@nx-monorepo/libs/server/components/ui/input';
import { Textarea } from '../../../../../@nx-monorepo/libs/server/components/ui/textarea';
import { Button } from '../../../../../@nx-monorepo/libs/server/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../@nx-monorepo/libs/server/components/ui/form';
import { FormProps } from '../../../../shared/types/users';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userForm, userSchema } from '../../../../shared/types/userSchema';
import { userDefaultValues } from '../../../../shared/types/defaultValues';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updateUser } from '../utils/queries/users/[id]/query';
import { createUser } from '../utils/queries/users/query';
import { ChevronRight } from 'lucide-react';

export default function UserForm({ user, titleText, buttonText }: FormProps) {
    const queryClient = new QueryClient()
    
    const router = useRouter(); 

    const form = useForm<
            z.infer<typeof userSchema>
        >({
            resolver: zodResolver(userSchema),
            defaultValues: user || userDefaultValues,
        });
    
    const mutation = useMutation({
        mutationFn: (data: userForm) => {
            if (user) {
                return updateUser({ id: user.id}, data)
            } else {
                return createUser(data)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            router.push("/users");
        },
    });

    function submit(values: z.infer<typeof userSchema>) {
        mutation.mutate(values);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='w-full mx-32'>
                <div className='text-center'>
                    <span className='font-bold py-2 block text-4xl'>{titleText}</span>
                </div>

                <div className='w-full py-2'>
                    <FormField control={form.control} name='username' rules={{required: true}} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter username' {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>

                <div className='w-full py-2'>
                    <FormField control={form.control} name='name' rules={{required: true}} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter name' {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>

                <div className='w-full py-2'>
                    <FormField control={form.control} name='address' rules={{required: true}} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Enter address' {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>

                <div className='w-full py-2'>
                    <FormField control={form.control} name='phone' rules={{required: true}} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter phone number' {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                <div className='w-full py-2'>
                    <Button type='submit'>
                        {buttonText}
                        <ChevronRight />
                    </Button>
                </div>
            </form>
        </Form>
    );
}