import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing order by COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save(); // saves orders in Database

    await userModel.findByIdAndUpdate(userId, { cartData: {} }); // to clear cartData

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing order by stripe method
const placeOrderStripe = async (req, res) => {};

// Placing order by razorpay method
const placeOrderRazorpay = async (req, res) => {};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {};

// User Orders data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.headers;

    const orders = await orderModel.find(userId);

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Orders status only from Admin Panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
