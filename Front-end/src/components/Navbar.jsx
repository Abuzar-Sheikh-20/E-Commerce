import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCounts,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="https://e-commerce-admin-flame-eta.vercel.app/" className="flex flex-col items-center border px-4 rounded-md bg-gray-200 font-bold gap-1">
          <p>Admin Panel</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            
          {token && 
            <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-2">
              <div className="flex flex-col w-36 gap-2 px-5 py-3 bg-slate-100 text-gray-500">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=> navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          }
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer"
            alt=""
          />
          <p className="absolute w-4 right-[-5px] bottom-[-5px] rounded-full bg-black text-white text-center leading-4 aspect-square text-[10px]">
            {getCartCounts()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center cursor-pointer gap-4 p-3"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="text-sm py-2 pl-6 border"
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="text-sm py-2 pl-6 "
            to={"/collection"}
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="text-sm py-2 pl-6 border"
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="text-sm py-2 pl-6 border"
            to={"/contact"}
          >
            Contact
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="text-sm py-2 pl-6 border border-2 font-bold"
            to={"https://e-commerce-admin-flame-eta.vercel.app/"}
          >
            ADMIN Panel
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
