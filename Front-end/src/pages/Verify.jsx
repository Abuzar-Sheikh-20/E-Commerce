import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, backend_url, setCartItems } =
    useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backend_url + "/api/order/verifystripe",
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {


        // Here's an err, payment method isn't activated. need to understand
        // setCartItems({});
        navigate("/cart");
      }
      // console.log(response.data);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
<div>

</div>
  );
};

export default Verify;
