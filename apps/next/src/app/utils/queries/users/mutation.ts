import { UserAddModel } from "apps/shared/types/users";
import { getAuthToken, getApiKey } from "../../authHelpers";


export const updateUser = async (params: { id: number }, userData: UserAddModel) => {
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
};

export const deleteUser = async (params: { id: number }) => {
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
};

export const createUser = async (userData: UserAddModel) => {
    try {
        const token = await getAuthToken();
        const apiKey = await getApiKey(token);

        const res = await fetch('http://localhost:3000/api/users/data', {
            method: 'POST',
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
};
