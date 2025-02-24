import type { Context } from "hono";
import { users } from "../db/schema.js";
import { asc, eq } from "drizzle-orm";
import { db } from "../db/index.js";

export const getUsers = async (c: Context) => {
    try {
        const data = await db.query.users.findMany({
            orderBy: [asc(users.id)],
        });

        return c.json(data);

    } catch (e: unknown) {
        console.error(`Error getting users: ${e}`);
    }
}

export async function createUser(c: Context) {
    try {
        const body = await c.req.json();

        const username = typeof body['username'] === 'string' ? body['username'] : '';
        const name = typeof body['name'] === 'string' ? body['name'] : '';
        const address = typeof body['address'] === 'string' ? body['address'] : '';
        const phone = typeof body['phone'] === 'string' ? body['phone'] : '';

        if (!username || !name || !address || !phone) {
            return c.json({
                statusCode: 400,
                message: 'All fields are required: username, name, address, phone',
            }, 400);
        }

        await db.insert(users).values(
            {
                username: username,
                name: name,
                address: address,
                phone: phone
            }
        );

        return c.json(
            { 
                username: username, 
                name: name, 
                address: address, 
                phone: phone
            }
        );

    } catch (e: unknown) {
        console.error(`Error creating user: ${e}`);
    }
}

export async function getUserById(c: Context) {
    try {
        const userId = parseInt(c.req.param("id"));

        const user = await db.select()
            .from(users)
            .where(eq(users.id, userId));

        if (!user) {
            return c.json({
                statusCode: 404,
                message: 'User not found',
            }, 404);
        }

        return c.json(user[0]);

    } catch (e: unknown) {
        console.error(`Error finding user: ${e}`);
    }
}

export async function updateUser(c: Context) {
    try {
        const userId = parseInt(c.req.param('id'));

        const body = await c.req.json();

        const username = typeof body['username'] === 'string' ? body['username'] : '';
        const name = typeof body['name'] === 'string' ? body['name'] : '';
        const address = typeof body['address'] === 'string' ? body['address'] : '';
        const phone = typeof body['phone'] === 'string' ? body['phone'] : '';

        if (!username || !name || !address || !phone) {
            return c.json({
                statusCode: 400,
                message: 'All fields are required: username, name, address, phone',
            }, 400);
        }

        await db.update(users)
            .set({
                username: username,
                name: name,
                address: address,
                phone: phone,
            })
            .where(eq(users.id, userId));

        const updatedUser = await db.select()
            .from(users)
            .where(eq(users.id, userId));

        return c.json(updatedUser);

    } catch (e: unknown) {
        console.error(`Error updating user: ${e}`);
    }
}

export async function deleteUser(c: Context) {
    try {
        const userId = parseInt(c.req.param('id'));

        await db.delete(users)
            .where(eq(users.id, userId));

        return c.json({
            statusCode: 200,
            message: 'User successfully deleted!',
        }, 200);

    } catch (e: unknown) {
        console.error(`Error deleting user: ${e}`);
    }
}