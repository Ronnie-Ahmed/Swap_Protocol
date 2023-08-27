import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { GrTransaction } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";

import nfticon from "../assets/DEFI.jpg";
import { FcHome } from "react-icons/fc";
import "../index.css";

export const Header = () => {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActive(false);
      } else {
        setActive(true);
      }
    };
    try {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <header className="fixed top-0 left-0 z-50 text-white py-1 w-full">
      <nav className="flex items-center justify-between px-4 ">
        <Link to="/">
          <div className="flex items-center curson-point  hover:border-blue-500 rounded-md p-2 ">
            <img
              src={nfticon}
              alt="Logo"
              className="w-10 h-10 mr-2 rounded-full"
            />

            <button className="button-49 flex items-center justify-center">
              <label className="content">Token Swap</label>
            </button>
          </div>
        </Link>

        <div className="hidden r md:flex md:items-center md:space-x-4">
          <Link
            to="/testnet"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <button className="button-53" role="button">
              <FcHome className="icon-style" />
              <span className="text-base font-bold text-white">TESTNET</span>
            </button>
          </Link>
          {/* <Link
            to="/Dex_page"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <button
              className="button-style"
              style={{
                backgroundImage: "linear-gradient(to right, #4ADE80, #37C7B4)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                transform: "translateY(0)",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
              }}
            >
              <GrTransaction className="icon-style" />
              <span className="text-base font-bold text-white">SWAP</span>
            </button>
          </Link>
          <Link
            to="/Uploadbook"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <button
              className="button-style"
              style={{
                backgroundImage: "linear-gradient(to right, #4ADE80, #37C7B4)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                transform: "translateY(0)",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
              }}
            >
              <FcMoneyTransfer className="icon-style" />
              <span className="text-base font-bold text-white">
                Upload Book
              </span>
            </button>
          </Link> */}
          <div className="flex flex-row space-between center p-1">
            {active && <ConnectWallet theme="dark" />}
            {address ? (
              <Link to="/userprofile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 ml-2 mt-2 text-blue-500 hover:text-purple-500 transition-colors duration-300"
                >
                  <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 11c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                </svg>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="md:hidden">
          <button
            className="text-white hover:text-gray-300"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden mb-5 py-2 flex flex-col items-center">
          {/* <Link to="/" spy={true} smooth={true} offset={-70} duration={500}>
            <button
              className="button-style"
              style={{
                backgroundImage: "linear-gradient(to right, #667EEA, #764BA2)",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                transform: "translateY(0)",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                color: "white",
                borderRadius: "0.25rem",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
              }}
            >
              <FcHome className="icon-style" />
              <span className="text-base font-bold text-white">Home</span>
            </button>
          </Link> */}

          <ConnectWallet theme="dark" />
        </div>
      )}
    </header>
  );
};
