import express from "express";
import Product from "../models/products.js";

const router = express.Router();

// GET: todos los productos
const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

// GET: producto por ID
const findProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

// POST: agregar producto
const addProducts = async (req, res) => {
  const { name, imagen, descripcion, precio, talles, envio, mediosDePago, categories } = req.body;
  try {
    const product = new Product({
      name,
      imagen,
      descripcion,
      precio,
      talles,
      envio,
      mediosDePago,
      categories,
    });

    await product.save();
    return res.status(201).json({ message: "Nuevo producto creado", product });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

// DELETE: borrar producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Product.findById(id);

    if (!productDelete) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Producto borrado", product: productDelete });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ message: "Hubo un error", error });
  }
};

// Endpoints CRUD
router.get("/", findAllProducts);
router.get("/:id", findProductById);
router.post("/", addProducts);
router.delete("/:id", deleteProduct);

export default router;
