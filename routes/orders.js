import express from "express";
import Product from "../models/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener productos", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener producto", error });
  }
});

export default router;
