import Category from "../models/category.js";
import mongoose from "mongoose";
import { API_RESPONSE_MSG } from "../utils/constants.js";
export class CategoryServices {
  static postCategory = async (data) => {
    try {
      const { name, icon, color } = data;

      let category = new Category({
        name: name,
        icon: icon,
        color: color,
      });
      category = await category.save();

      return {
        success: true,
        message: API_RESPONSE_MSG.category_saved_successfully,
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static deleteCategory = async (categoryId) => {
    try {
      const isValid = mongoose.isValidObjectId(categoryId);
      if (!isValid) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid category id",
        };
      }
      const category = await Category.findByIdAndDelete(categoryId);
      return {
        success: true,
        message: API_RESPONSE_MSG.category_deleted_successfully,
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getCategory = async () => {
    try {
      const data = await Category.find();
      return {
        success: true,
        message: API_RESPONSE_MSG.categories_fetched_successfully,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getCategoryById = async (categoryId) => {
    try {
      const isValid = mongoose.isValidObjectId(categoryId);
      if (!isValid) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid product id",
        };
      }
      const data = await Category.findById(categoryId);
      return {
        success: true,
        message: API_RESPONSE_MSG.categories_fetched_successfully,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static updateCatagoryById = async (categoryId, data) => {
    try {
       const isValid = mongoose.isValidObjectId(categoryId);
       if (!isValid) {
         return {
           success: false,
           message: API_RESPONSE_MSG.failed,
           error: "Invalid product id",
         };
       }
      const category = await Category.findByIdAndUpdate(categoryId, {
        name: data.name,
        icon: data.icon,
        color: data.color,  
      }, {new: true});
      return {
        success: true,
        message: API_RESPONSE_MSG.categories_updated_successfully,
        data: category,
      }

    } catch (error) {
      return{
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      }
    }
  };
}
