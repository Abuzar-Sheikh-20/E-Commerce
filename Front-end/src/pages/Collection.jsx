import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    {
      /* e is an event that triggers when user click on UI element to select/deselect category */
    }
    if (category.includes(e.target.value)) {
      {
        /* 'e.target.value' gives the selected value from the user, in this case, it'll give the selected category*/
      }
      {
        /* EG: "category.includes(value)" category is an array - Values should be check inside this array, and "e.target.value" is a value that developer checks wheather */
      }
      {
        /* "includes" --> checks if the value is in the list or not and returns 'True' or 'False */
      }

      setCategory((prev) => prev.filter((item) => item !== e.target.value));
      {
        /* "filter" makes a new array while "prev" have the previous list and filter is going to update it by Item (that's deselected) means the value that user deselects is going to stored in the 'item' and it'll update the prev means remove the deselected (now) category. */
      }
    } else {
      setCategory((prev) => [...prev, e.target.value]);
      {
        /* else Took the previous array (...prev), and Add the new selected category in the previous list */
      }
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (search && showSearch) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  {
    /* --------- Custom Event Handler "const sortProducts = () =>" VS useEffect ------- 
    here below, sortProducts is an event handler which calls when user given an input or take an action like user adds an item in cart by clicking on ADD TO CART button.....
    whereas
    useEffect is a lifecycle hook that calls or triggers automatically to component mount, update or to handle side effects when a component renders.
  */}

  const sortProducts = () => {
    let filterProductCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, showSearch, search, products]);        {/* The effect (applyFilter) will only run when one of any variables [category, subCategory, showSearch or search] changes. */}

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* ----------------------------------- Left Side ----------------------------------- */}

      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 flex items-center gap-2 text-xl cursor-pointer"
        >
          FILTERS
          <img
            className={`h-2 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category */}

        <div
          className={`pl-5 py-3 border border-gray-300 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* SubCategory */}

        <div
          className={`pl-5 py-3 border border-gray-300 my-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwears
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwears
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwears
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------- Right Side ----------------------------------- */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 mb-4 text-sm px-2 outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low - High</option>
            <option value="high-low">Sort by: High - Low</option>
          </select>
        </div>

        {/* ----------------------------------- Mapping of Products ----------------------------------- */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-base">
              We're working on it and will upload soon. <br />
              <Link
                className="bg-blue-700 text-white rounded-lg py-2 px-5 hover:bg-blue-800 transition ease-in-out mt-3 inline-block"
                to={"/"}
              >
                Go to Home
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
