import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();     // This is ShopContext API, you created

const ShopContextProvider = (props)=> {

  const currency = '$'
  const deliveryFee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const value = {         // These values will pass where you'll use this (ShopContext) API
    products,             // You'll get products from here with the help of useContext(ShopContext);
    currency,
    deliveryFee,
    search, setSearch,
    showSearch, setShowSearch,
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}          {/* In this case, App.jsx (found in main.jsx) is the children props.children ensures that whatever is inside the ShopContextProvider is rendered correctly with the context values.  */}
    </ShopContext.Provider>
  )

}

export default ShopContextProvider