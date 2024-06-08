import express from "express";
import { ROUTES } from "../utils/constants.js";
import {
  getProduct,
  postProduct,
  getProductById,
  updateProductById,
  deleteProduct,
  getProductsCount,
  getFeaturedProducts,
  getFeaturedProductByLimit,
  addGallaryImages,
} from "../controllers/products.js";
import multer from "multer";

const productRouter = express.Router();

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const extension = FILE_TYPE_MAP[file.mimetype];
    const fileName = file.originalname.replace(" ", "-");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${fileName}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage: storage });

productRouter.post(ROUTES.ADD_PRODUCT, upload.single("image"), postProduct);
productRouter.get(ROUTES.GET_PRODUCTS, getProduct);
productRouter.get(ROUTES.GET_PRODUCT_BY_ID, getProductById);
productRouter.put(ROUTES.UPDATE_PRODUCT_BY_ID, updateProductById);
productRouter.delete(ROUTES.DELETE_PRODUCT, deleteProduct);
productRouter.get(ROUTES.GET_PRODUCTS_COUNT, getProductsCount);
productRouter.get(ROUTES.FEATURED_PRODUCTS, getFeaturedProducts);
productRouter.get(ROUTES.FEATURED_PRODUCT_BY_LIMIT, getFeaturedProductByLimit);
productRouter.post(
  ROUTES.ADD_GALARY_IMAGES,
  upload.array("images", 10),
  addGallaryImages,
);

export default productRouter;
