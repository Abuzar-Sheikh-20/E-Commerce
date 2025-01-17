import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // useContext API send you to the ShopContext (API), taht's custom API created by you.
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10)); // it will take 10 products from assests because we're taking product from ShopContext and this refers to the assests directory.
  }, [products]); // bcz of this Array, products will pass individually (one by one)

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xm sm:text-sm md:text-base text-gray-600">
          Discover the latest trends with our curated collection of
          high-quality, stylish products, designed to elevate your shopping
          experience.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          /> // import ProductItem first
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
