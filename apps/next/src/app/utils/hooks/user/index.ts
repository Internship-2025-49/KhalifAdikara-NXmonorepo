/* eslint-disable @nx/enforce-module-boundaries */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userForm } from "apps/shared/types/userSchema";
import { useRouter } from "next/navigation";
import * as queries from "../../queries/users/query";
import * as mutations from "../../queries/users/mutation";

export const useUpdateUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            idUser,
            body,
        }: {
            idUser: number;
            body: userForm;
        }) => {
            try {
            const result = mutations.updateUser({
                id: idUser,
            }, body);
            return result;
            } catch (error) {
            console.log(error);
            }
        },
        onSuccess: () => {
            router.push("/users");
        },
    });
};

export const useCreateUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            body,
        }: {
            body: userForm;
        }) => {
            try {
            const result = mutations.createUser(
                body,
            );
            return result;
            } catch (error) {
            console.log(error);
            }
        },
        onSuccess: () => {
            router.push("/users");
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (id: number) => {
            try {
                const result = await mutations.deleteUser({ id });
                return result;
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            router.push("/users");
        },
    });
};

export const useGetUserById = (userId: number) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => queries.getUserById({ id: userId }),
    });
};

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: queries.getUsers,
    });
};