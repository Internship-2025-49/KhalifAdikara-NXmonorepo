import { userForm } from "./userSchema";

export interface UserModel{
    id:number,
    username:string,
    name:string,
    address:string,
    phone:string,
    deleteUser:(id: number)=> void;
}

export interface UserAddModel{
    username:string,
    name:string,
    address:string,
    phone:string,
}

export interface FormProps {
    user?: userForm;
    titleText: string;
    buttonText: string;
    required: boolean;
}


