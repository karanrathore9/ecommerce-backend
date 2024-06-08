import mongoose from "mongoose";
import Product from "../models/product.js";
import Category from "../models/category.js";
import { API_RESPONSE_MSG } from "../utils/constants.js";

export class ProductServices {
  static addProduct = async (data) => {
    try {
      const {
        name,
        description,
        richDescription,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      } = data;

      const isCategory = await Category.findById(category);
      if (!isCategory) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Category not found",
        };
      }
      let product = new Product({
        name: name,
        description: description,
        richDescription: richDescription,
        image: data.fileName,
        brand: brand,
        price: price,
        category: category,
        countInStock: countInStock,
        rating: rating,
        numReviews: numReviews,
        isFeatured: isFeatured,
      });
      product = await product.save();
      return {
        success: true,
        message: API_RESPONSE_MSG.product_saved_successfully,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getProduct = async (query) => {
    try {
      let filter = {};
      if (query.categories) {
        filter = { category: query.categories.split(",") };
      }
      const data = await Product.find(filter).populate("category");
      return {
        success: true,
        message: API_RESPONSE_MSG.products_fetched_successfully,
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

  static getProductById = async (id) => {
    try {
      const isValid = mongoose.isValidObjectId(id);
      if (!isValid) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid product id",
        };
      }
      const data = await Product.findById(id).populate("category");
      return {
        success: true,
        message: API_RESPONSE_MSG.products_fetched_successfully,
        data: data,
      };
    } catch (error) {
      console.log("+++++++++++++");
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static updateProductById = async (id, data) => {
    try {
      const {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      } = data;
      const isValid = mongoose.isValidObjectId(id);
      if (!isValid) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid product id",
        };
      }
      const isCategory = await Category.findById(category);
      if (!isCategory) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Category not found",
        };
      }

      const product = await Product.findByIdAndUpdate(
        id,
        {
          name: name,
          description: description,
          richDescription: richDescription,
          image: image,
          brand: brand,
          price: price,
          category: category,
          countInStock: countInStock,
          rating: rating,
          numReviews: numReviews,
          isFeatured: isFeatured,
        },
        { new: true },
      );
      return {
        success: true,
        message: API_RESPONSE_MSG.product_updated_successfully,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static deleteProduct = async (id) => {
    try {
      const isValid = mongoose.isValidObjectId(id);
      if (!isValid) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid product id",
        };
      }
      const product = await Product.findByIdAndDelete(id);
      return {
        success: true,
        message: API_RESPONSE_MSG.product_deleted_successfully,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getProductsCount = async () => {
    try {
      const productsCount = await Product.countDocuments();
      return {
        success: true,
        message: API_RESPONSE_MSG.products_count_fetched_successfully,
        data: productsCount,
      };
    } catch (error) {
      console.log("Inside services catcj");
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getFeaturedProducts = async () => {
    try {
      const data = await Product.find({ isFeatured: false }).populate(
        "category",
      );
      return {
        success: true,
        message: API_RESPONSE_MSG.products_fetched_successfully,
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

  static getFeaturedProductByLimit = async (limit) => {
    try {
      const data = await Product.find({ isFeatured: true })
        .limit(limit)
        .populate("category");
      return {
        success: true,
        message: API_RESPONSE_MSG.products_fetched_successfully,
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

  static addGallaryImages = async (id, data) => {
    try {
      const isValid = mongoose.isValidObjectId(id);
      if (!isValid) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid product id",
        };
      }
      const product = await Product.findByIdAndUpdate(
        id,
        {
          images: data,
        },
        { new: true },
      );
      return {
        success: true,
        message: API_RESPONSE_MSG.product_updated_successfully,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };
}
