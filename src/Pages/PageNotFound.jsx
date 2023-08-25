import React from "react";
import imagepage from "../assets/profile.jpeg";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <>
      <>
        <section className="flex flex-col justify-center  items-center min-h-screen bg-gray-800">
          <div className="flex flex-col items-center my-4">
            <p className="text-4xl text-blue-900 font-semibold my-10 dark:text-white">
              Oops! <span className="text-red-500">404</span> Page Not Found
              Amigo !
            </p>
            <div className="max-w-lg">
              <img
                className="rounded-lg transform shadow-2xl shadow-white hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
                src={imagepage}
                alt="404 Page Not Found"
              />
            </div>
          </div>
          <div className="flex justify-center my-4">
            <Link to="/">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 focus:ring-4 focus:ring-blue-500 focus:outline-none">
                Back to Home
              </button>
            </Link>
          </div>
        </section>
      </>
    </>
  );
};
