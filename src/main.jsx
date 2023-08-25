import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  frameWallet,
} from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="d974fd84e15a8fb6456c8c94112b56da"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        frameWallet(),
      ]}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
