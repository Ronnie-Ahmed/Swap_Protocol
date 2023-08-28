import walletconnect from "../assets/walletconnect.png";

import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";

import { TokenPopUp } from "../Components/TokenPopUp";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  erc20Abi,
  TokenList,
  UniswapAddress,
  uniswapAbi,
} from "../Components/constants";
// import { getTokenInfo } from "erc20-token-list";
export const TestNet = () => {
  const [isTokenOpen, setIsTokenOpen] = useState(false);

  const status = useConnectionStatus();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const address = useAddress();
  // const address = useAddress();
  const [selectedToken, setSelectedToken] = useState("Select a token");
  const [selectedToken2, setSelectedToken2] = useState("Select a token");

  const [SelectedTokenImage, setSelectedTokenImage] = useState(null);
  const [SelectedTokenImage2, setSelectedTokenImage2] = useState(null);
  const [token1address, settoken1address] = useState(null);
  const [token2address, settoken2address] = useState(null);
  const [amountETH, setAmountETH] = useState(0);
  const [estimatedgas, setEstimatedGas] = useState(0);
  const [contractAddress, setContractAddress] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");

  const handleSubmitForm = (formData) => {
    setIsTokenOpen(false);
  };

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [amount]);

  const calculatePrice = async () => {
    try {
      if (token1address !== null && token2address !== null && amount !== 0) {
        const params = {
          sellToken: token1address,
          buyToken: token2address,
          sellAmount: amount * 10 ** 18,
        };
        setContractAddress(params.sellToken);
        const queryParams = new URLSearchParams(params).toString();

        const headers = {
          "0x-api-key": "6779ff19-4156-4732-b327-5256f34a79f1",
        };
        const response = await fetch(
          `https://api.0x.org/swap/v1/price?${queryParams}`,
          { headers }
        );
        const info = await response.json();
        setEstimatedGas(info.estimatedGas);
        setAmountETH(info.price);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token.name);
    settoken1address(token.address);
    setSelectedTokenImage(token.img);
    setOpenModal(false);
  };
  const handleTokenSelect2 = (token) => {
    setSelectedToken2(token.name);
    settoken2address(token.address);

    setSelectedTokenImage2(token.img);
  };
  const filteredTokens = TokenList.filter((token) =>
    token.ticker.toUpperCase().includes(searchQuery.toUpperCase())
  );
  const filteredTokens2 = TokenList.filter((token) =>
    token.ticker.toUpperCase().includes(searchQuery2.toUpperCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleSearch2 = (query) => {
    setSearchQuery2(query);
  };
  // const getQuote = async (account) => {
  //   try {
  //     if (token1address !== null && token2address !== null && amount !== 0) {
  //       const params = {
  //         sellToken: token1address,
  //         buyToken: token2address,
  //         sellAmount: amount * 10 ** 18,
  //         takerAddress: account,
  //       };

  //       const queryParams = new URLSearchParams(params).toString();

  //       const headers = {
  //         "0x-api-key": "6779ff19-4156-4732-b327-5256f34a79f1",
  //       };
  //       // const response = await fetch(
  //       //   `https://api.0x.org/swap/v1/quote?${queryParams}`,
  //       //   { headers }
  //       // );
  //       const response = await fetch(
  //         `https://api.0x.org/swap/v1/quote?buyToken=${params.buyToken}&sellAmount=${params.sellAmount}&sellToken=${params.sellToken}&takerAddress=${params.takerAddress}`,
  //         { headers }
  //       );
  //       const info = await response.json();
  //       return info;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const swapToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(UniswapAddress, uniswapAbi, signer);
    const swapToken = await contract.swap(
      token1address,
      token2address,
      ethers.utils.parseEther(amount.toString()),
      1,
      address
    );
    console.log("swapToken", swapToken);
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
          <div className="w-full mb-5 max-w-md rounded-lg bg-gradient-to-br from-teal-500 via-yellow-500 to-red-500 bg-opacity-70 border border-gray-300 backdrop-blur-md shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b">
              <div
                className="px-4 py-2 text-md font-bold cursor-pointer shadow-2xl mr-2 text-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setOpenModal(!openModal)}
              >
                <div className="flex flex-row items-center p-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
                  <span className="text-xl font-bold text-gray-900 m-1">
                    {selectedToken}
                  </span>
                  {SelectedTokenImage != null && (
                    <img
                      src={SelectedTokenImage}
                      alt={`${selectedToken} Logo`}
                      className="w-12 h-12 mb-3 rounded-full"
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
                      <input
                        type="text"
                        placeholder="Search tokens..."
                        className="px-4 py-2 mb-4 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => handleSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <ul className="space-y-3 max-h-60 overflow-y-auto">
                        {/* Implement a maximum height and scrolling */}
                        {filteredTokens.map((token, index) => (
                          <li
                            key={index}
                            className="flex items-center px-4 py-3 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => handleTokenSelect(token)}
                          >
                            <img
                              src={token.img} // Assuming logoURI contains the image URL
                              alt={`${token.ticker} Logo`}
                              className="w-8 h-8 mr-3"
                            />
                            <span className="text-sm">{token.ticker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <input
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amount}
                className="flex-1 px-4 py-2 bg-opacity-70 bg-white border border-gray-300 backdrop-blur-md focus:ring-2 focus:ring-blue-400 rounded-lg transition duration-300 ease-in-out hover:shadow-md focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Amount"
              />
            </div>
            <div className="p-4 flex items-center  justify-between">
              <div
                className="px-4 py-2 text-md font-bold cursor-pointer shadow-2xl mr-2 text-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setOpenModal2(!openModal2)}
              >
                <div className="flex flex-row items-center p-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
                  <span className="text-xl font-bold text-gray-900 m-1">
                    {selectedToken2}
                  </span>
                  {SelectedTokenImage2 != null && (
                    <img
                      src={SelectedTokenImage2}
                      alt={`${selectedToken2} Logo`}
                      className="w-12 h-12 mb-3 rounded-full"
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
                      <input
                        type="text"
                        placeholder="Search tokens..."
                        className="px-4 py-2 mb-4 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => handleSearch2(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <ul className="space-y-3 max-h-60 overflow-y-auto">
                        {/* Implement a maximum height and scrolling */}
                        {filteredTokens2.map((token, index) => (
                          <li
                            key={index}
                            className="flex items-center px-4 py-3 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => handleTokenSelect2(token)}
                          >
                            <img
                              src={token.img} // Assuming logoURI contains the image URL
                              alt={`${token.name} Logo`}
                              className="w-8 h-8 mr-3"
                            />
                            <span className="text-sm">{token.ticker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col rounded-md bg-black">
                <p className="text-white font-bold text-center">
                  Amount : {amountETH}
                </p>
                <p className="text-white font-bold text-center">
                  Estimated Gas ETH: {estimatedgas}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row space-x-14">
            <button className="button-86" role="button" onClick={swapToken}>
              Swap Token
            </button>
            <button
              className="button-87 "
              role="button"
              onClick={() => setIsTokenOpen(true)}
            >
              GET FREE TOKEN
            </button>
          </div>
        </div>
      )}
      {isTokenOpen && (
        <TokenPopUp
          onClose={() => setIsTokenOpen(false)}
          onClick={handleSubmitForm}
        />
      )}
    </div>
  );
};
