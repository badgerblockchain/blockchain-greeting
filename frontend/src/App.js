import { useState } from 'react';
import { ethers } from 'ethers';
import {Helmet} from "react-helmet";
//import logo from './logo.svg';
import './App.css'; // imports css styles

import image from './badger_pic.png'

import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {

  const [greeting, setGreetingValue] = useState('')

   // request access to the user's MetaMask account
  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


   // call the smart contract, read the current greeting value
  async function fetchGreeting(){
    if (typeof window.ethereum !== 'undefined') {                               // line that checks if the user has Metamask installed
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

// call the smart contract, send an update
  async function setGreeting(){
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      // We are updating the blockchain, therefore we needed to add another step when creating the contract.
      // We need to have a way to create a transaction. In order to do that we need to sign the transaction using a signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()                                     // signs
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
          <button className="btn_props" onClick={fetchGreeting}>Fetch Greeting</button> {/*when button is clicked it invokes the fetch Greeting method */}
          <div id = "set"></div>
          <button className="btn_props" onClick={setGreeting}>Set Greeting</button>     {/*when button is clicked it invokes the set Greeting method */}
          <input className="text_box"
            onChange={e => setGreetingValue(e.target.value)}
            placeholder="Set greeting"
            id ="set"
            value={greeting}
        />
      </header>
    </div>
  );

}
export default App;
