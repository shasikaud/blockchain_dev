import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json';
import Navbar from './Navbar';

class App extends Component {

  //wait for this to happen at DOM before anything else
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert("NON ETHEREUM BROWSER DETECTED - TRY USING METAMASK!")
    }
  }

  //get the ac details of the connected metamask ac
  async loadBlockchainData() {
    const web3 = window.web3
    //load account
    const accounts = await web3.eth.getAccounts()
    //console.log(accounts)
    this.setState({account: accounts[0]})

    //connect to instance of the contract
    const networkId = await web3.eth.net.getId()
    //console.log(networkId)
    const networkData = SocialNetwork.networks[networkId]
    if (networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      //create a copy of the contract instance as a state
      this.setState({socialNetwork})  //if key and value are same, no need to socialNetwork:socialNetwork
      const postCount = await socialNetwork.methods.postCount().call()   //add .call() at the end to call 
      this.setState({postCount})
      //console.log(postCount)
    } else{
      window.alert("CONTRACT NOT DEPLOYED TO THE NETWORK")
    }
  }


  //call methods -> read info from the network | doesnt cost GAS
  //write methods -> write into network | costs GAS

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount:0
    }
  }

  render() {
    return (
      <div>
        
        <Navbar account={this.state.account}/>


        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
