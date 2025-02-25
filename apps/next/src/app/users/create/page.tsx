"use client";

import React from 'react';
import UserForm from '../../components/FormUser';

export default function UserCreate() {
    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                <UserForm titleText="Add User" buttonText="Submit" required={true}/>
            </div>
        </div>
    );
}