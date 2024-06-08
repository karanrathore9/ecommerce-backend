import express from "express";
import { CategoryServices } from "../Services/categories.js";
export const postCategory = async (req, res) => {
  try {
    console.log("here at post category");
    const body = {
      ...req.body,
    };

    const data = await CategoryServices.postCategory(body);

    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CategoryServices.deleteCategory(id);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const data = await CategoryServices.getCategory();
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CategoryServices.getCategoryById(id);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};

export const updateCatagoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = {
      ...req.body,
    };
    const data = await CategoryServices.updateCatagoryById(id, body);
    res.status(200).json({
      ...data,
      code: 200,
    });
  } catch (error) {
    res.status(error.output?.statusCode ?? 500).json(error);
  }
};
