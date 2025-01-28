import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backend_url,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: "",
        };
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem("formData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backend_url + "/api/order/place",

            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backend_url + "/api/order/stripe",

            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url); // to change the current URL
          } else {
            toast.error(responseStripe.data.message);
          }

          console.log(response.data);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between  gao-4 sm:pt-14 pt-5 min-h-[80vh] border-t"
    >
      {/* ------------------------ Left Side ------------------------  */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          type="email"
          placeholder="Email Address:"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="Number"
            placeholder="Zipcode"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          type="Number"
          placeholder="Phone"
          required
        />
      </div>

      {/* ------------------------ Right Side ------------------------  */}

      <div className="sm:ml-6 mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/* ------------------------ Payment Method Selection ------------------------  */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* -----------------------Button for Stripe----------------------- */}

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="border">
              <div
                onClick={() => setMethod("stripe")}
                className=" flex items-center gap-2 py-2 px-3 cursor-pointer"
              >
                <p
                  className={`border min-w-3.5 h-3.5 rounded-full ${
                    method === "stripe" ? "bg-green-700" : ""
                  }`}
                ></p>

                <img
                  className="h-5 object-cover"
                  src={assets.stripe_logo}
                  alt=""
                />
              </div>
              <p className="text-sm text-gray-300 text-center px-3">
                Little Issue occured, will resolve soon
              </p>
            </div>

            {/* -----------------------Button for Razorpay----------------------- */}

            <div className="border">
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 py-2 px-3 cursor-pointer"
            >
              <p
                className={`border min-w-3.5 h-3.5 rounded-full ${
                  method === "razorpay" ? "bg-green-700" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <p className="text-sm text-gray-300 text-center px-3">
                Little Issue occured, will resolve soon
              </p>
            </div>

            {/* -----------------------Button for COD----------------------- */}

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 py-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-700" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="text-end w-full mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-2 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
