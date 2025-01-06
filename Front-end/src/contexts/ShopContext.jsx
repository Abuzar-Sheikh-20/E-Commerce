import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import {toast} from 'react-toastify'

export const ShopContext = createContext(); // This is ShopContext API, you created

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  {
    /* Added "{}" empty object here to add objects in it. */
  }

  {
    /* addToCart (below) is an event handler funtion, which calls when user adds an item in cart (for example, button click event). (adding items in cart) When user gives an input or take an action. this's the reason why user didn't use useEffect bcz useEffect calls automatically when a component renders. */
  }

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Select Product Size!')
      return;
    }

    let cartData = structuredClone(cartItems);         {/* structuredClone used to deep copy of any object. */}

    if (cartData[itemId]) {                   {/* If item ID presents */}
      if (cartData[itemId] [size]) {          {/* If size of that item ID presents */}
        cartData[itemId][size] += 1;          {/* Increase it with 1 */}
      }
      else {
        cartData[itemId][size] =1;            {/* If size of that item ID is not presents then set  that item to 1 */}
      }
    }
    else {
      cartData[itemId] = {};     {/* If that item ID is not created/ presents then add an item of this ID and size */}
      cartData[itemId][size] = 1;       
    }

    setCartItems(cartData);

  };

const getCartCounts = () => {

  let totalCounts = 0;

  for (const items in cartItems){
    for (const item in cartItems[items]){
      try{
        if (cartItems[items][item] > 0) {
          totalCounts += cartItems[items][item]
        }
      }
      catch (error) {

      }
    }
  }
  return totalCounts;
};

const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);

  cartData[itemId][size] = quantity;

  setCartItems(cartData);

} 


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
    updateQuantity
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}{" "}
      {/* In this case, App.jsx (found in main.jsx) is the children props.children ensures that whatever is inside the ShopContextProvider is rendered correctly with the context values.  */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
