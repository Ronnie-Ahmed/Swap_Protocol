import walletconnect from "../assets/walletconnect.png";

import { useConnectionStatus } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
export const Home = () => {
  const status = useConnectionStatus();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  // const address = useAddress();
  const [selectedToken, setSelectedToken] = useState("Select a token");
  const [selectedToken2, setSelectedToken2] = useState("Select a token");

  const [SelectedTokenImage, setSelectedTokenImage] = useState(null);
  const [SelectedTokenImage2, setSelectedTokenImage2] = useState(null);
  const [tokenList, settokenList] = useState([]);

  const [amount, setAmount] = useState(0);
  const fetchTokenList = async () => {
    try {
      const t = await fetch("https://tokens.coingecko.com/uniswap/all.json");
      const token = await t.json();
      settokenList(token.tokens);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTokenList();
  }, []);
  const token1 = async () => {
    tooglevalue();
    console.log(tokenList);
  };
  const token2 = async () => {
    tooglevalue2();
    console.log(tokenList);
  };
  const tooglevalue = () => {
    setOpenModal(!openModal);
  };
  const tooglevalue2 = () => {
    setOpenModal2(!openModal2);
  };
  const handleTokenSelect = (token) => {
    setSelectedToken(token.name);
    setSelectedTokenImage(token.logoURI);

    closeModal();
  };
  const handleTokenSelect2 = (token) => {
    setSelectedToken2(token.name);
    setSelectedTokenImage2(token.logoURI);

    closeModal2();
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const closeModal2 = () => {
    setOpenModal2(false);
  };

  return (
    <div className="flex flex-column justify-center items-center ">
      {status === "undefined " ||
      status === "disconnected" ||
      status === "disconnected" ||
      status === "connecting" ? (
        <div className="flex items-center mt-32 justify-center m-5 mx-4 px-1 md:mx-16 rounded-lg transform transition-all duration-300 shadow-2xl shadow-cyan-400 hover:scale-105 mb-8">
          <div className="flex flex-col items-center m-5">
            <img
              src={walletconnect}
              alt="loading"
              className="w-60 h-60 object-cover rounded-full mb-4 transition-transform transform-gpu hover:scale-110"
            />
            <h1 className="text-3xl font-bold">Connect Wallet</h1>
            <h1 className="text-3xl font-bold">Use Mumbai Testnet</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-32 justify-center m-5 mx-4 px-1 md:mx-16 rounded-lg transform transition-all duration-300 shadow-2xl shadow-cyan-400">
          <div className="w-full max-w-md  rounded-lg shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b">
              <button
                className="px-4 py-2 text-md font-bold shadow-2xl mr-2 text-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={token1}
              >
                <div className="flex flex-row items-center">
                  <span className="text-xl font-semibold m-1">
                    {selectedToken}
                  </span>
                  {SelectedTokenImage != null && (
                    <img
                      src={SelectedTokenImage}
                      alt={`${selectedToken} Logo`}
                      className="w-12 h-12 mb-3"
                    />
                  )}
                </div>
                {openModal && (
                  <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center">
                    <div
                      className=" rounded-lg shadow-lg p-8 w-3/5"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #14b8a6, #fbbf24, #ef4444)",
                      }}
                    >
                      <h2 className="text-xl font-semibold mb-4">
                        Close The Window
                      </h2>

                      <ul className="space-y-3 max-h-60 overflow-y-auto">
                        {/* Implement a maximum height and scrolling */}
                        {tokenList.map((token, index) => (
                          <li
                            key={index}
                            className="flex items-center px-4 py-3 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => handleTokenSelect(token)}
                          >
                            <img
                              src={token.logoURI} // Assuming logoURI contains the image URL
                              alt={`${token.name} Logo`}
                              className="w-8 h-8 mr-3"
                            />
                            <span className="text-sm">
                              {token.name} ({token.symbol})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </button>

              <input
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amount}
                className="flex-1 px-4 py-2 bg-transparent border focus:ring-2 focus:ring-blue-400"
                placeholder="Amount"
              />
            </div>
            <div className="p-4 flex items-center  justify-between">
              <button
                className="px-4 py-2 text-md font-bold shadow-2xl mr-2 text-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={token2}
              >
                <div className="flex flex-row items-center">
                  <span className="text-xl font-semibold m-1">
                    {selectedToken2}
                  </span>
                  {SelectedTokenImage2 != null && (
                    <img
                      src={SelectedTokenImage2}
                      alt={`${selectedToken2} Logo`}
                      className="w-12 h-12 mb-3"
                    />
                  )}
                </div>
                {openModal2 && (
                  <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center">
                    <div
                      className=" rounded-lg shadow-lg p-8 w-3/5"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #14b8a6, #fbbf24, #ef4444)",
                      }}
                    >
                      <h2 className="text-xl font-semibold mb-4">
                        Close The Window
                      </h2>

                      <ul className="space-y-3 max-h-60 overflow-y-auto">
                        {/* Implement a maximum height and scrolling */}
                        {tokenList.map((token, index) => (
                          <li
                            key={index}
                            className="flex items-center px-4 py-3 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => handleTokenSelect2(token)}
                          >
                            <img
                              src={token.logoURI} // Assuming logoURI contains the image URL
                              alt={`${token.name} Logo`}
                              className="w-8 h-8 mr-3"
                            />
                            <span className="text-sm">
                              {token.name} ({token.symbol})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </button>
              <div className="flex flex-col">
                <p className="text-gray-500 text-center">Amount ETH</p>
                <p className="text-gray-500 text-center">Estimated Gas ETH</p>
              </div>
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 mb-4 text-md font-semibold text-white shadow-2xl shadow-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-600"
            onClick={() => {
              // Handle button click action here
            }}
          >
            Swap Token
          </button>
        </div>
      )}
    </div>
  );
};
