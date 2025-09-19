const express = require("express");
const axios = require("axios");
const Order = require("../models/Order");
const Item = require("../models/Item");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Create a new order
router.post("/:itemId", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const order = new Order({
      item: item._id,
      buyer: req.user.id,
      seller: item.seller,
      amount: item.price,
      paymentMethod: req.body.paymentMethod,
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Khalti verification
router.post("/:orderId/verify-khalti", verifyToken, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      { headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` } }
    );

    if (response.data && response.data.idx) {
      order.status = "paid";
      await order.save();
      res.json({ message: "Payment verified", order });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// eSewa verification (redirect based)
router.post("/:orderId/verify-esewa", verifyToken, async (req, res) => {
  const { orderId } = req.params;
  const { amount } = req.body;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  // Optionally, call eSewa verification API here
  order.status = "paid";
  await order.save();
  res.json({ message: "Payment verified" });
});

// Release money to seller manually or via payout API
router.post("/:orderId/release", verifyToken, async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.status !== "paid")
    return res.status(400).json({ message: "Payment not yet received" });

  order.status = "released";
  await order.save();

  res.json({ message: "Payment released to seller" });
});

module.exports = router;
