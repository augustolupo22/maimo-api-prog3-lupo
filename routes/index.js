import express from "express";
import productRoutes from "./products.js";
import categoryRoutes from "./categories.js";
import orderRoutes from "./orders.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);

export default router;
