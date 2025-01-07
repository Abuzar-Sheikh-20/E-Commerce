import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center mb-28 md:flex-row gap-10">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />

        <div className="flex flex-col gap-6 items-start justify-center">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">107 Faizabad Sholay <br /> Up, stehen nagari 0006, India</p>
          <p className="text-gray-500">Tel: 066 6566  636666 <br /> Email: pushpa@intheworld</p>
          <p className="font-semibold text-xl text-gray-600">Carriers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings</p>
          <button className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>

      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
