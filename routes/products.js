import express from "express";
const router = express.Router();
import Product from "../models/products.js";

// GET: todos los productos
const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

// GET: producto por id
const findProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
};

// POST: agregar producto
const addproducts = async (req, res) => {
  const { name, imagen, descripcion, precio, talles, envio, mediosDePago, categories } = req.body;
  try {
    const product = new Product({ name, imagen, descripcion, precio, talles, envio, mediosDePago, categories });
    await product.save();
    return res.status(200).send({ message: "nuevo producto:", product });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

// DELETE: borrar producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Product.findOne({ _id: id });

    if (!productDelete) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    await Product.deleteOne({ _id: id });
    return res.status(200).send({ message: "producto borrado", product: productDelete });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

// CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findProductById);
router.post("/", addproducts);
router.delete("/:id", deleteProduct);

export default router;
