import mongoose from "mongoose";
import User from "../models/user.js";
import { API_RESPONSE_MSG } from "../utils/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class UserServices {
  static addUser = async (data) => {
    try {
      const { name, email, password, phone } = data;
      let user = new User({
        name: name,
        email: email,
        passwordHash: bcrypt.hashSync(password, 10),
        phone: phone,
      });

      user = await user.save();
      return {
        success: true,
        message: API_RESPONSE_MSG.user_created_successfully,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static registerUser = async (data) => {
    try {
      const { name, email, password, phone } = data;
      let user = new User({
        name: name,
        email: email,
        passwordHash: bcrypt.hashSync(password, 10),
        phone: phone,
      });

      user = await user.save();
      return {
        success: true,
        message: API_RESPONSE_MSG.user_registered_successfully,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getAllUsers = async () => {
    try {
      const users = await User.find().select("name email phone");
      return {
        success: true,
        message: API_RESPONSE_MSG.users_fetched_successfully,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };
  static getUserById = async (id) => {
    try {
      const user = await User.findById(id).select("-passwordHash");
      return {
        success: true,
        message: API_RESPONSE_MSG.users_fetched_successfully,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static updateUserById = async (id, data) => {
    try {
      const user = await User.findById(id);
      let newPassword;
      if (data.password) {
        newPassword = bcrypt.hashSync(data.password, 10);
      } else {
        newPassword = user.passwordHash;
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          name: data.name,
          email: data.email,
          passwordHash: newPassword,
          phone: data.phone,
        },
        { new: true },
      );
      return {
        success: true,
        message: API_RESPONSE_MSG.user_updated_successfully,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static loginUser = async (data) => {
    try {
      const user = await User.findOne({ email: data.email });
      const secret = process.env.JWT_SECRET;
      if (!user) {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "User not found",
        };
      }
      if (user && bcrypt.compareSync(data.password, user.passwordHash)) {
        const token = jwt.sign(
          {
            userId: user.id,
            isAdmin: user.isAdmin,
          },
          secret,
          { expiresIn: "1d" },
        );
        return {
          success: true,
          message: API_RESPONSE_MSG.logged_in_successfully,
          data: {
            token: token,
            email: user.email,
          },
        };
      } else {
        return {
          success: false,
          message: API_RESPONSE_MSG.failed,
          error: "Invalid email or password",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: API_RESPONSE_MSG.failed,
        error: error,
      };
    }
  };

  static getUsersCount = async () => {
    try {
      const count = await User.countDocuments();
      return {
        success: true,
        message: API_RESPONSE_MSG.users_count_fetched_successfully,
        data: count,
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
