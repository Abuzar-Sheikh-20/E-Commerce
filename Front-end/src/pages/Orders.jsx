import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { currency, products } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {
          products.slice(1,4).map((item, index) => (
            <div key={index} className="flex py-4 flex-col md:flex-row border-b border-t text-gray-500 md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex gap-3 mt-2 items-center text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p >Quantity: 1</p>
                    <p>Size: Medium</p>
                  </div>
                  <p className="mt-2">Date: <span className="text-gray-400">25 Jul 2024</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 bg-green-700 rounded-full"></p>
                  <p className="text-sm text-base">Ready to Ship</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded sm hover:text-white hover:bg-black">Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
