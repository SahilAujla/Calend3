import { useState, useEffect } from "react";
import Head from "next/head";
import detectEthereumProvider from "@metamask/detect-provider";
import Calendar from "../components/calendar";

function App() {
  const [account, setAccount] = useState(false);

  useEffect(() => {
    isConnected();
  }, []);

  const isConnected = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: "eth_accounts" });
    // eth_accounts method returns an array that either is empty (if no account was linked to the dapp earlier)
    // or contains only one element that is the account that was most recently connected with the dapp.

    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  };

  const connect = async () => {
    try {
      const provider = await detectEthereumProvider();

      // returns an array of accounts
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      // check if array at least one element
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Head>
        <title>Calend3</title>
        <meta name="description" content="Web3 appointment scheduler" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="App-header">
        <h1>Calend3</h1>
        <p class="slogan">web3 appointment scheduler</p>
      </header>
      {!account && <button onClick={connect}>connect wallet</button>}
      {account && <Calendar />}
    </div>
  );
}

export default App;
