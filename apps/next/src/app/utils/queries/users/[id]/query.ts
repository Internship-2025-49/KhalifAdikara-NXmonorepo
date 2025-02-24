/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAddModel } from '../../../../../../../shared/types/users';
import { getApiKey, getAuthToken } from '../../../../utils/authHelpers';

export async function getUserById(params: { id: number }) {
    try {
        const token = await getAuthToken();
        const apiKey = await getApiKey(token);

        const res = await fetch(`http://localhost:3000/api/users/data/${params.id}`, {
            next: { revalidate: 10 },
            headers: {
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey
            }
        });

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateUser(params: { id: number }, userData: UserAddModel) {
    try {
        const token = await getAuthToken();
        const apiKey = await getApiKey(token);

        const res = await fetch(`http://localhost:3000/api/users/data/${params.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteUser(params: { id: number }) {
    try {
        const token = await getAuthToken();
        const apiKey = await getApiKey(token);

        const res = await fetch(`http://localhost:3000/api/users/data/${params.id}`, {
            next: { revalidate: 10 },
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey
            }
        });

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}