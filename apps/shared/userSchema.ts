import { z } from "zod"

export const userSchema = z.object({
    id: z.number().optional(),
    username: z.string().min(3),
    name: z.string().min(3),
    address: z.string().min(3),
    phone: z.string().min(13).regex(/^(?:\+62|62|0)[2-9]\d{7,11}$/, { message: "Number must start with +62" }),
})