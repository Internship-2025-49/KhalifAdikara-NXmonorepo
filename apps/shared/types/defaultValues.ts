import { z } from "zod";
import { userSchema } from "./userSchema";

export const userDefaultValues :z.infer<typeof userSchema> = {
    id: 0,
    username: "",
    name: "",
    address: "",
    phone: "",
};