import { cyberAddress, cyberAbi, marginAbi, marginAddress } from "./constants";
import { AlertPopup } from "./AlertPopup";
import { ethers } from "ethers";
import token from "../assets/token.svg";

import { useState } from "react";
import { Alert } from "@chakra-ui/react";
export const TokenPopUp = ({ onClose }) => {
  const [alarm, setAlarm] = useState(false);
  const getCyberToken = async () => {
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
        const cyberContract = new ethers.Contract(
          cyberAddress,
          cyberAbi,
          signer
        );

        const balance = await cyberContract.balanceOf(
          await signer.getAddress()
        );
        if (balance.gt(ethers.constants.Zero)) {
          alert("Token already present in wallet");
        } else {
          const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: cyberAddress, // The address of the token.
                name: await cyberContract.name(), // A string of the token name.
                symbol: await cyberContract.symbol(), // A ticker symbol or shorthand, up to 5 characters.
                decimals: await cyberContract.decimals(), // The number of decimals in the token.
                image: token,
              },
            },
          });
          const transfer = await cyberContract.transferToken();
          await transfer.wait();

          if (wasAdded) {
            alert("Token added to wallet");
          } else {
            console.log("Your loss!");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getMarginToken = async () => {
    // setAlarm(!alarm);
    // alert("Token added to wallet");
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
        const marginContract = new ethers.Contract(
          marginAddress,
          marginAbi,
          signer
        );

        const balance = await marginContract.balanceOf(
          await signer.getAddress()
        );
        if (balance.gt(ethers.constants.Zero)) {
          alert("Token already present in wallet");
        } else {
          const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: cyberAddress, // The address of the token.
                name: await marginContract.name(), // A string of the token name.
                symbol: await marginContract.symbol(), // A ticker symbol or shorthand, up to 5 characters.
                decimals: await marginContract.decimals(), // The number of decimals in the token.
                image: token,
              },
            },
          });
          const transfer = await marginContract.transferToken();
          await transfer.wait();

          if (wasAdded) {
            alert("Token added to wallet");
          } else {
            console.log("Your loss!");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-0">
      <div className="max-w-md w-full p-6 duration-300 space-x-4 bg-gradient-to-b bg-gray-800 rounded-lg shadow-2xl bg-opacity-80">
        {/* {alarm && (
          <div className="mb-5 bg-green-600 rounded-lg">
            {" "}
            <AlertPopup
              shortText="Token added to wallet"
              description="Token added to wallet"
            />
          </div>
        )} */}
        <button
          className="button-85 bg-gradient-conic font-bold hover:bg-white  focus-visible:ring-0"
          onClick={getCyberToken}
        >
          Cyber Token
        </button>
        <button
          className="button-85 bg-gradient-conic font-bold hover:bg-white  focus-visible:ring-0"
          onClick={getMarginToken}
        >
          Margin Token
        </button>

        <div className="flex mt-10 justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transform hover:scale-110 transition-all duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
