/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getApiKey, getAuthToken } from '../../authHelpers';

export const getUsers = async () => {
    try {
        const token = await getAuthToken();
        const apiKey = await getApiKey(token);

        const res = await fetch('http://localhost:3000/api/users/data', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey
            }
        });

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getUserById = async (params: { id: number }) => {
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
};