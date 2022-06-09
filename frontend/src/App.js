import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import {Helmet} from "react-helmet";
import MetaMaskOnboarding from '@metamask/onboarding'; // only executes if user doesn't have metamask install; add to package json
// TODO did not add: to README dependenciesnpm install @metamask/onboarding

//import detectEthereumProvider from '@metamask/detect-provider' // LOOKING INTO SOMETHING -> npm i @metamask/detect-provider

//const { NonceManager } = require("@ethersproject/experimental"); // experimental trying to elim the nonce err
//import logo from './logo.svg';
import './App.css'; // imports css styles

import image from './badger_pic.png'

import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {

  const [greeting, setGreetingValue] = useState('')

  const onboarding = new MetaMaskOnboarding();         // used to help user download metamask if not installed
  const hasMetaMask = useRef(false)                    // determines whether user should be linked to metamask install

  // https://docs.metamask.io/guide/create-dapp.html#basic-action-part-1    further reading
  
  // executes upon load and starts the executes isMetaMaskInstalled()
  useEffect(() => {
    hasMetaMask.current = isMetaMaskInstalled()
  },[]);

  // checks if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask); // returns false if metamask is not installed; else true
  };

  ////**** return function at the bottom drives the rest of the code ****////

// Executes when "Connect Wallet" gets clicked. Checks if a user has the metamask extension. If not a 
// tab gets opened taking them to the web store where they can download it. If the user has a metamask account
// ethers will use window.ethereum to see which accounts are conencted to the site. If this is a user's first time
// connecting metamask will open a page for them to select a wallet (make sure to pick the one you imported!)
// If a user was connected from before a message will be displayed indicating what their account addr is
  const onClickConnect = async () => {
    try {
      if(hasMetaMask.current === false){ // if false then chrome tab will open for you to download
        onboarding.startOnboarding();
      }
      else{ // connects user wallet
        // const provider = await detectEthereumProvider()
       // alert(provider)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("user account: " + accounts) // used in debugging
        alert("User's account " + accounts + " is connected")
      }
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      
    } catch (error) {
      console.error(error);
    }
  };

   // Function executes when "Fetch Gretting" is clicked. Calls the smart contract, reads the current greeting value
  async function fetchGreeting(){
    if (typeof window.ethereum !== 'undefined') {                               // line that checks if the user has Metamask installed; not bad to have double check
      const provider = new ethers.providers.Web3Provider(window.ethereum)       // step in obtaining contract var which can call the Greeter.sol methods
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()     // obtain current set Greeting
        alert(data)

        console.log('data: ', data)             // print out set Greeting
      } catch (err) {
        console.log("Error: ", err)
      }
    } 
  }

// Function executes when "Set Gretting" is clicked. calls the smart contract, sends an update via transaction
  async function setGreeting(){
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      // We are updating the blockchain, therefore we needed to add another step when creating the contract.
      // We need to have a way to create a transaction. In order to do that we need to sign the transaction using a signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()                                     // signs

      // nonce = new NonceManager(signer) // trying to get rid of nonce error
      // nonce.setTransction("0x01")

      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer) // notice how it is "signer" for a change on the blockchain
      const transaction = await contract.setGreeting(greeting)                  // uses gas
      setGreetingValue('')
      await transaction.wait()        // wait for the transaction to be confirmed on the blockchain; in a prod env this might take a while

    }
  }

  
  
  return (
    
    <div className="App">
      <Helmet>
        <title>Badger Blocks</title> {/* text that is on the chrome tab */}
      </Helmet>
      <header className="App-header">
        <img src={image} alt=""/>
        <h1 className ='primary'>Greetings using Blockchain</h1>
        <button className="connect_wallet" onClick={onClickConnect}>Connect Wallet</button> {/*when button is clicked it invokes the fetch Greeting method */}
          <button className="btn_props" onClick={fetchGreeting}>Fetch Greeting</button> {/*when button is clicked it invokes the fetch Greeting method */}
          <div id = "set"></div>
          <button className="btn_props" onClick={setGreeting}>Set Greeting</button>     {/*when button is clicked it invokes the set Greeting method */}
          <input className="text_box"
            onChange={e => setGreetingValue(e.target.value)}
            placeholder="my new message"
            id ="set"
            value={greeting}
        />
      </header>
    </div>
  );

}
export default App;
