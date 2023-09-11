import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import nfticon from "../assets/DEFI.jpg";
import "../index.css";

export const Header = () => {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [nextPage, setNextpage] = useState(false);
  const pageToggle = () => {
    setNextpage(!nextPage);
  };
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
      <nav className="flex items-center justify-between px-4">
        <Link to="/">
          <div className="flex items-center cursor-pointer hover:border-blue-500 rounded-md p-2">
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

        <div className="hidden md:flex md:items-center md:space-x-4">
          {nextPage ? (
            <Link to="/" spy={true} smooth={true} offset={-70} duration={500}>
              <button
                className="button-48 rounded-md shadow-lg shadow-slate-600"
                onClick={pageToggle}
              >
                <span className="text-lg font-bold">MAINNET</span>
              </button>
            </Link>
          ) : (
            <Link
              to="/TestNet"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button
                className="button-48 rounded-md shadow-lg shadow-slate-600"
                onClick={pageToggle}
              >
                <span className="text-lg font-bold">TESTNET</span>
              </button>
            </Link>
          )}
          <Link
            to="/testnetpool"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <button
              className="button-48 rounded-md shadow-lg shadow-slate-600"
              onClick={pageToggle}
            >
              <span className="text-lg font-bold">Create Pool</span>
            </button>
          </Link>

          <div className="flex flex-row space-x-4">
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

        <div className="md:hidden relative">
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
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg">
              <Link to="/" spy={true} smooth={true} offset={-70} duration={500}>
                <button
                  className="button-48 w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white"
                  onClick={pageToggle}
                >
                  MAINNET
                </button>
              </Link>
              <Link
                to="/TestNet"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <button
                  className="button-48 w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white"
                  onClick={pageToggle}
                >
                  TESTNET
                </button>
              </Link>
              <Link
                to="/testnetpool"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <button
                  className="button-48 w-full  px-4 py-2 text-left hover:bg-blue-500 hover:text-white"
                  onClick={pageToggle}
                >
                  Create Pool
                </button>
              </Link>
              <Link to="#" spy={true} smooth={true} offset={-70} duration={500}>
                <div
                  className="button-48 w-full  px-4 py-2 text-left hover:bg-blue-500 hover:text-white"
                  onClick={pageToggle}
                >
                  <ConnectWallet theme="dark" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
