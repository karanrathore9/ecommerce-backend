import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import { fileURLToPath } from "url";
import path from "path";

// Helpers
import authJwt from "./helpers/jwt.js";
import errorHandler from "./helpers/errorHandler.js";

dotenv.config();
const app = express();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json()); // for parsing application/json
app.use(morgan("tiny")); // for logging API requests
app.use(cors());
app.options("*", cors());
// app.use(authJwt());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads")),
); // Use path.join with new __dirname
app.use(errorHandler);

// Routes
import userRouter from "./routers/users.js";
import productRouter from "./routers/products.js";
import categoryRouter from "./routers/categories.js";
import orderRouter from "./routers/orders.js";

const apiurl = process.env.API_URL;

app.use(`${apiurl}/users`, userRouter);
app.use(`${apiurl}/products`, productRouter);
app.use(`${apiurl}/categories`, categoryRouter);
app.use(`${apiurl}/orders`, orderRouter);

mongoose
  .connect(process.env.CONNECTION_URL, { dbName: "eshop-database" })
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(apiurl);
  console.log(`Server running on port ${process.env.PORT} 🚀 🚀 🚀`);
});
