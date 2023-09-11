import { TokenList } from "./constants";
import { ethers } from "ethers";
import token from "../assets/token.svg";

export const TokenPopUp = ({ onClose }) => {
  const getTokens = async (token) => {
    await transferToken(token.address, token.abi);
  };

  const transferToken = async (tokenAddress, tokenAbi) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const chainId = await signer.getChainId();
        if (chainId !== 0x13881) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: "0x13881",
              },
            ],
          });
        }
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          signer
        );

        const transfer = await tokenContract.tra();
        await transfer.wait();

        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress, // The address of the token.
              name: await tokenContract.name(), // A string of the token name.
              symbol: await tokenContract.symbol(), // A ticker symbol or shorthand, up to 5 characters.
              decimals: await tokenContract.decimals(), // The number of decimals in the token.
              image: token.img,
            },
          },
        });

        if (wasAdded) {
          alert("Token added to wallet");
        } else {
          console.log("Your loss!");
        }
      }
    } catch (err) {
      console.log(err);
      if (err.message === "User rejected the request.") {
        alert("Please accept the transaction to continue");
      }
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-0">
      <div className="max-w-md w-full p-6 duration-300 space-x-4 bg-gradient-to-b bg-gray-800 rounded-lg shadow-2xl bg-opacity-80">
        <div className="flex flex-col space-y-4 max-h-60 overflow-auto">
          {TokenList.map((token, index) => (
            <button
              className="button-85 m-3 bg-gradient-conic font-bold hover:bg-white active:bg-gray-600 focus-visible:ring-0 transform hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => getTokens(token)}
              key={index}
            >
              {token.name}
              <img
                src={token.img}
                alt="token"
                className="w-10 h-10 ml-2 inline-block"
              />
            </button>
          ))}
        </div>

        <div className="flex mt-10 justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transform hover:scale-110 active:scale-95 transition-all duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
