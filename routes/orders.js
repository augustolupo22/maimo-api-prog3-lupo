import express from "express";
import Order from "../models/order.js";

const router = express.Router();

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

router.post("/", addOrder);
export default router;
