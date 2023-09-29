# Greeting using Blockchain Techology

This is a simple project I created for [Badger Blockchain](https://www.badgerblockchain.com/) which is a club at UW-Madison.

## Requirements

Follow the links for instructions to install if you don't have the project requirements installed on your machine.

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v.18.18
- Optional, but helpful: [git ssh](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitHub-SSH-Key-Setup-Config-Ubuntu-Linux)

## Dependencies

1. In order to obtain this interface on your local machine you must first pull down the repository. You can do this in your vscode terminal
   with the following command:

```bash
git clone https://github.com/badgerblockchain/blockchain-greeting.git
```

Open the folder you just created in vscode (or editor of your choice) to see the files.

2. Install the dependencies outlined in [package.json](package.json) using npm.

```bash
npm install
```

## Metamask 🦊

Before you can start your local blockchain you must download the [Metamask extension](https://metamask.io/) for your default browser.
After getting Metamask on your browser you need to enable test networks. Go to settings and click on the advanced tab. There is an option to show
test networks, and make sure this is enabled. You can switch networks by clicking in the "Ethereum Mainet" dropdown. For this project since you will be running the Ethereum Virtual Machine (EVM) locally, select the network called local 8545. Before you select the network though you must start the local nodes. Now your wallet is ready to be connected!

I recommend to create a new account to perform the transactions on, especially if you have funds in your main account. You can easily add new accounts to your wallet by clicking the
"import account" button. This will be referenced more below.

## Start your first local blockchain

To start your local EVM machine (HardHat network) you must type the cmd:

```
npx hardhat node
```

After this command is execeuted, your computer will be running its own Ethereum node. In brower on Metamask you can now switch to local host 8545. In order to see balances of these nodes in your local testnet Metamask wallet you must do the following:

- Copy a private key from one of the accounts that is displayed in the cli after starting your EVM
- In Metamask, after clicking "Import Account" there will be a field asking for a private key. Paste your key here. This is the wallet where you funds will be added. Use this account to perform transactions.

The next command deploys the smart contract to the local EVM network and sets a default greeting. After this is sent, the Metamask account you just imported should be updated with eth.
Run this script in a different terminal because you EVM needs to be running.

```
npx hardhat run scripts/deploy.js --network localhost
```

Go into the frontend folder which contains Javascript, CSS, and React elements used in the webpage.
Then finally start the server!

_Note_: `./frontend` has a seperate `package.json` file that includes only frontend dependencies.

```bash
cd frontend
npm install
npm start
```

Congratulations! Your first web3 site is active!

## Tips

- If you want to mess around with code and keep the same syntax schema, run `npm run format` to format your code.

## Known Errors

The starting logic for the code is found /frontend/src/App.js starting with the return function. Start to debug here. I will continue to add documentation as I learn more. Any suggestions?

- **NONCE ERROR??** Try resetting your Metamask account. The error occurs because your transaction is stuck on pending. Ethereum is built to wait for your transaction to be mined to prevent mailicious activity. Resetting your Metamask account clears your nonce and gets you out of the pending state so you can update the blockchain.


- **Anything else?** Inspect webpage and go to console to see specific error message. Google and debug.

Contact jpgundrum@wisc.edu if you run into errors/find issues with the code or instruction

## References/Disclaimer

I am not responsible for the majority of this code! The blog post by Nader Dabit which is found [here](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)
heavily inspried me. It is a well thought out tutorial. I recommend to read and watch his youtube video on the topic. Listening to him talk through the steps and give explanations is crucial for comphrension. [His repository](https://github.com/dabit3/full-stack-ethereum) was what I pulled down originally, to understand and eventually replicate his creation. I did use CSS and other React elements
to make it more of my own, so it doesn't look like a direct copy and paste. This is meant for education purposes to get college students exposed to blockchain technology.
