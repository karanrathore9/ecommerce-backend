export const ROUTES = {
  ADD_CATEGORY: "/add-category",
  DELETE_CATEGORY: "/delete-category/:id",
  GET_CATEGORIES: "/",
  GET_CATEGORY_BY_ID: "/category/:id",
  UPDATE_CATAGORY_BY_ID: "/update-catagory/:id",

  ADD_PRODUCT: "/add-product",
  DELETE_PRODUCT: "/delete-product/:id",
  GET_PRODUCTS: "/",
  GET_PRODUCT_BY_ID: "/product/:id",
  UPDATE_PRODUCT_BY_ID: "/update-product/:id",
  GET_PRODUCTS_COUNT: "/count",
  FEATURED_PRODUCTS: "/featured",
  FEATURED_PRODUCT_BY_LIMIT: "/featured-products/:limit",
  ADD_GALARY_IMAGES: "/add-galary-images/:id",

  ADD_USER: "/add-user",
  GET_ALL_USERS: "/get-all-users",
  GET_USER_BY_ID: "/user/:id",
  UPDATE_USER_BY_ID: "/update-user/:id",
  GET_USERS_COUNT: "/users-count",
  DELETE_USER: "/delete-user/:id",

  LOGIN: "/login",
  REGISTER: "/register",

  CREATE_ORDER: "/create-order",
  GET_ALL_ORDERS: "/get-all-orders",
  GET_ORDER_BY_ID: "/get-order/:id",
  UPDATE_ORDER_BY_ID: "/update-order/:id",
  DELETE_ORDER: "/delete-order/:id",
  GET_TOTAL_SALES: "/total-sales",
  GET_ORDER_COUNT: "/order-count",
  GET_ORDERS_HISTORY: "/get-orders-history",
};

export const API_RESPONSE_MSG = {
  category_saved_successfully: "Category added successfully",
  category_deleted_successfully: "Category deleted successfully",
  categories_fetched_successfully: "Categories fetched successfully",
  categories_updated_successfully: "Categories updated successfully",

  product_saved_successfully: "Product added successfully",
  products_fetched_successfully: "Products fetched successfully",
  product_updated_successfully: "Product updated successfully",
  product_deleted_successfully: "Product deleted successfully",
  products_count_fetched_successfully: "Products count fetched successfully",

  user_created_successfully: "User created successfully",
  user_registered_successfully: "User registered successfully",
  users_count_fetched_successfully: "User count fetched successfully",
  user_deleted_successfully: "User deleted successfully",
  users_fetched_successfully: "Users fetched successfully",
  user_updated_successfully: "User updated successfully",

  order_details_fetched_successfully: "Order details fetched successfully",
  order_created_successfully: "Order created successfully",
  order_updated_successfully: "Order updated successfully",
  order_deleted_successfully: "Order deleted successfully",
  total_sales_fetched_successfully: "Total sales fetched successfully",
  total_orders_count_fetched_successfully: "Total orders count fetched successfully",
  orders_history_fetched_successfully: "Orders history fetched successfully",

  logged_in_successfully: "Logged in successfully",
  failed: "Something went wrong",
};