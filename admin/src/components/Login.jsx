import React, { useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // response (below) checks if the admin's email and password is correct or !
      const response = await axios.post(backend_url + "api/user/admin", {
        email,
        password,
      }); // axios - used in front-end development to interact with backend APIs
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error); // Log full error details
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <p className="text-gray-400 mb-4">
          This is for ADMIN, If you're using, Please do not use unnecessary
          things.
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              className="w-full border border-gray-300 outline-none rounded-md px-3 py-2"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="admin@gmail.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="w-full border border-gray-300 outline-none rounded-md px-3 py-2"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="admin123"
              required
            />
          </div>
          <button
            className="mt-2 w-full px-4 py-2 bg-black text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
