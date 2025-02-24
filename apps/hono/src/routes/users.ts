/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { apiKeyAuth } from '../middleware/Auth.js'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserControllers.js'
import { loginUser } from '../controllers/AuthControllers.js'
import dotenv from 'dotenv'
import { db } from '../db/index.js'
import { userSchema } from '../../../shared/types/userSchema.js'
import { zValidator } from '@hono/zod-validator'

dotenv.config()

const app = new Hono()

const SECRET_KEY: any = process.env.KEY;

app.post("/login", loginUser);

app.get('/', async (c) => {
    const auth = await db.query.auth.findFirst()

    if (auth) {
        return c.json(
            { 
                statusCode: 200, 
                message: 'Authorized',
                key: auth.key 
            }
        )
    }
})

app.use('/data/*', jwt({ secret: SECRET_KEY }));

app.use('/data/*', apiKeyAuth);

app.get('/data', (c) => getUsers(c));

app.post('/data',
    zValidator('json', userSchema),
    (c) => createUser(c)
);

app.get('/data/:id', (c) => getUserById(c));

app.put('/data/:id',
    zValidator('json', userSchema),
    (c) => updateUser(c)
);

app.delete('/data/:id', (c) => deleteUser(c));

export default app;
