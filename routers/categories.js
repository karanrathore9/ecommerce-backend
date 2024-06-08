import express from "express";
import {
  deleteCategory,
  getCategory,
  getCategoryById,
  postCategory,
  updateCatagoryById,
} from "../controllers/categories.js";
import { ROUTES } from "../utils/constants.js";

const categoryRouter = express.Router();

categoryRouter.post(ROUTES.ADD_CATEGORY, postCategory);
categoryRouter.delete(ROUTES.DELETE_CATEGORY, deleteCategory);
categoryRouter.get(ROUTES.GET_CATEGORIES, getCategory);
categoryRouter.get(ROUTES.GET_CATEGORY_BY_ID, getCategoryById);
categoryRouter.put(ROUTES.UPDATE_CATAGORY_BY_ID, updateCatagoryById);

export default categoryRouter;
