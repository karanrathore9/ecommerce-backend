import { UserServices } from "../Services/users.js";

export const addUser = async (req, res) => {
    try{
        const body ={
            ...req.body,
        };
        const data = await UserServices.addUser(body);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        console.log(error);
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}
export const registerUser = async (req, res) => {
    try{
        const body ={
            ...req.body,
        };
        const data = await UserServices.registerUser(body);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        console.log(error);
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const data = await UserServices.getAllUsers();
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await UserServices.getUserById(id);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const updateUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const body = {
            ...req.body,
        };
        const data = await UserServices.updateUserById(id, body);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const loginUser = async (req, res) => {
    try{
        const body = {
            ...req.body,
        };
        const data = await UserServices.loginUser(body);
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}

export const getUsersCount = async (req, res) => {
    try{
        const data = await UserServices.getUsersCount();
        res.status(200).json({
            ...data,
            code: 200,
        });
    }catch(error){
        res.status(error.output?.statusCode ?? 500).json(error);
    }
}