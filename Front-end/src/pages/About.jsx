import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col gap-6 md:w-2/4 justify-center text-gray-600">
          <p>
            Our e-commerce app provides a seamless shopping experience, offering
            a wide range of products with a user-friendly interface. From the
            latest collections to best-selling items, we ensure that every
            shopper finds exactly what they’re looking for. With responsive
            design across devices, customers can browse through categories,
            apply filters, and sort products effortlessly, making shopping
            smooth and enjoyable.
          </p>

          <p>
            At the heart of our platform is a focus on personalization and ease
            of use.We’ve also integrated a secure checkout process to ensure
            safe transactions, with various payment options. Whether you’re
            looking for the latest trends or timeless classics, our app provides
            a comprehensive shopping solution.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to create an intuitive and enjoyable shopping
            experience by offering a diverse range of products, advanced
            filtering options, and secure transactions. We aim to empower users
            with a seamless, personalized journey, ensuring convenience and
            satisfaction at every step of their e-commerce experience.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className="text-gray-600">
            Our assurance is to provide high-quality products, secure shopping,
            and exceptional customer service..
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className="text-gray-600">
            Our commitment to convenience is to make your shopping experience
            effortless and enjoyable. With easy navigation, fast checkout, and
            quick delivery.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Exceptional Custormer Service: </b>
          <p className="text-gray-600">
            We are dedicated to providing exceptional customer service by
            offering prompt assistance, personalized support, and a commitment
            to resolving any issues.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
