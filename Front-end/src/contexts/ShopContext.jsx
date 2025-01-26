import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";     // use this in front end design and delete after backend created
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const ShopContext = createContext(); // This is ShopContext API, you created

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const [products, setProducts] = useState([]);

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  {
    /* Added "{}" empty object here to add objects in it. */
  }

  {
    /* addToCart (below) is an event handler funtion, which calls when user adds an item in cart (for example, button click event). (adding items in cart) When user gives an input or take an action. this's the reason why user didn't use useEffect bcz useEffect calls automatically when a component renders. */
  }

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size!");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/add",
          { itemId, size }, // Data to be sent
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const getCartCounts = () => {
    let totalCounts = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCounts += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCounts;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems); // Deep copy of the cart items
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity; // Update quantity in local state
      setCartItems(cartData); // Update local state with the new quantity
    }

    if (token) {
      try {
        const response = await axios.post(
          backend_url + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success("Cart updated successfully");
        } else {
          toast.error("Failed to update cart");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backend_url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${userToken || token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cart data. Please try again.");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set the token
      getUserCart(storedToken); // Fetch the cart
    }
  }, []);

  const value = {
    // These values will pass where you'll use this (ShopContext) API
    products, // You'll get products from here with the help of useContext(ShopContext);
    currency,
    deliveryFee,

    search,
    setSearch,
    showSearch,
    setShowSearch,

    cartItems,
    addToCart,

    getCartCounts,
    updateQuantity,
    getCartAmount,
    setCartItems,

    navigate,

    backend_url,

    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}{" "}
      {/* In this case, App.jsx (found in main.jsx) is the children props.children ensures that whatever is inside the ShopContextProvider is rendered correctly with the context values.  */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
