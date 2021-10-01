import React, { Component,useEffect,useState } from 'react';
import logo from '../logo.png';
import Swap from '../abis/Swap.json'
import Token from '../abis/Token.json'
import './App.css';
import Web3 from 'web3';
import Navbars from './Navbar';
function App() {
  let [account, setAccount] = useState()
  let [balance, setBalance] = useState()
  let [token, setToken] = useState()
  let [tokenbalance, settokenBalance] = useState()


  const loadBlockchainData = async () => {
    let token;
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    setAccount(account = accounts[0])
   setBalance(balance = await web3.eth.getBalance(account));
    console.log(account,balance)
    //Load Token

    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    tokenData ?  token = new web3.eth.Contract(tokenData.abi, tokenData.address):window.alert('Token contract not deployed')
    setToken({token})
    console.log(token.methods)
    settokenBalance(tokenbalance = await token.methods.balanceOf(accounts[0]).call());
    
    
  }
  const loadWeb3=async ()=>{
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  }
 
  const init = async () => {
    await loadWeb3();
    await loadBlockchainData()
  }
  useEffect(() => {
    init()
  }, [])
    return (
      <div>
      <Navbars account ={account}/>
       <h2>SWAP EXCHANGE</h2>







      </div>
    );
  
}

export default App;
