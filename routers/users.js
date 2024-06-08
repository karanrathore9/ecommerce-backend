import express from "express";
import { addUser, getAllUsers, getUserById, getUsersCount, loginUser, registerUser, updateUserById } from "../controllers/users.js";
import { ROUTES } from "../utils/constants.js";

const userRouter = express.Router();

userRouter.post(ROUTES.ADD_USER, addUser);
userRouter.get(ROUTES.GET_ALL_USERS, getAllUsers);
userRouter.get(ROUTES.GET_USER_BY_ID, getUserById);
userRouter.put(ROUTES.UPDATE_USER_BY_ID, updateUserById);
userRouter.get(ROUTES.GET_USERS_COUNT, getUsersCount);

userRouter.post(ROUTES.LOGIN, loginUser);
userRouter.post(ROUTES.REGISTER, registerUser);


export default userRouter;