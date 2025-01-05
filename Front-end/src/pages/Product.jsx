import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  {
    /* The effect (fetchProductData) will only run when either productId or products changes. */
  }

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ------------------------- Product Data -------------------------  */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* ------------------------- Product Image -------------------------  */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3 ">
          <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* ------------------------- Product Info -------------------------  */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 font-medium text-3xl">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`py-2 px-4 border bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white py-3 px-8 text-small active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-3/5" />

          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <p>100% Original product.</p>
            <p>Cash delivery is availableon this Product.</p>
            <p>Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ----------------------- Description and Review Section ----------------------- */}

      <div className="mt-20">
        <div className="flex">
          <b className="border text-sm px-5 py-3">Description</b>
          <p className="border text-sm px-5 py-3">Reviews (122)</p>
        </div>
        <div className="flex flex-col border px-6 py-6 gap-4 text-sm text-gray-500">
          <p>
            Discover the latest trends in fashion with our exclusive collection
            of clothing, accessories, and footwear. Whether you're looking for
            casual wear, office attire, or something for a special occasion,
            we've got you covered. Shop with ease, explore our handpicked
            categories, and enjoy fast shipping, secure payments, and excellent
            customer service. Redefine your style with our premium-quality
            products, crafted to perfection for every occasion.
          </p>
          <p>
            Explore trendy fashion essentials with our exclusive collection of
            clothing, accessories, and footwear. Shop the latest styles, enjoy
            secure payments, and fast delivery for a hassle-free experience.
          </p>
        </div>
      </div>

      {/* ----------------------- Display Related Products ----------------------- */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
