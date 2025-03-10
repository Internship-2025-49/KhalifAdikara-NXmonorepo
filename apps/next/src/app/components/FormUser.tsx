/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react';
import { Input, Textarea, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@nx-monorepo/component";
import { FormProps } from '../../../../shared/types/users';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../../../shared/types/userSchema';
import { userDefaultValues } from '../../../../shared/types/defaultValues';
import { useCreateUser, useUpdateUser } from '../utils/hooks/user';
import { ChevronRight } from 'lucide-react';

export default function UserForm({ user, titleText, buttonText }: FormProps) {

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: user || userDefaultValues,
    });

    const createUser = useCreateUser();
    const updateUser = useUpdateUser();

    function submit(values: z.infer<typeof userSchema>) {
        if (user && user.id) {
            updateUser.mutate({ idUser: user.id, body: values });
        } else {
            createUser.mutate({ body: values });
        }
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
                            <FormMessage className='text-red-500'/>
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
                            <FormMessage className='text-red-500'/>
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
                            <FormMessage className='text-red-500'/>
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
                            <FormMessage className='text-red-500'/>
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