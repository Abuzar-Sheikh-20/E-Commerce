import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
// import Razorpay from "razorpay";

// Global variables
const currency = "inr";
const deliveryCharge = 10;

// Intializing gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

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
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;
    const { origin } = req.headers; // Origin is, from where user made request, in this case when user placing order from front-end, the origin will be 'localhost:5173' here.
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      // provided by Stripe’s API | manage the details of a payment, including items to purchase, URLs for success and cancellation, and more.
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, //  send the customer after the payment is completed
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`, // used to indicate that the payment was canceled.
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success === true) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing order by razorpay method
// const placeOrderRazorpay = async (req, res) => {
//   // Address added in the script tag inside the HTML
//   try {
//     const { userId, items, address, amount } = req.body;
//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const options = {
//       amount: amount * 100,
//       currency: currency.toUpperCase(),
//       reciept: newOrder._id.toString(),
//     };

//     const order = await razorpay.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.json({ success: false, message: error });
//       } else {
//         return res.json({ success: true, order });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

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
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated!", status });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  // placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
