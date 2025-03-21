const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const { default: mongoose } = require("mongoose");
const Table = require("../models/tableModel");  // Dodajemo import za Table model

const addOrder = async (req, res, next) => {
  try {
    //console.log("Received order data:", req.body);
    const order = new Order(req.body);
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order created!", data: order });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = await Order.findById(id);
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("table");
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus, orderId } = req.body;  // Uzimamo ID porudžbine i novi status iz requesta
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    // Ažuriramo status porudžbine
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    // Ako je porudžbina postavljena na 'Completed', oslobodimo sto
    if (orderStatus === "Completed" && order.table) {
      await Table.findByIdAndUpdate(order.table, { status: "Available" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};

// //brisanje ordera 
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByIdAndDelete(id);
    if (!order) throw createHttpError(404, 'Narudžbina ne postoji');

    // Oslobodi sto ako postoji
    if (order.table) {
      await Table.findByIdAndUpdate(order.table, { status: 'Available' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder,deleteOrder };
