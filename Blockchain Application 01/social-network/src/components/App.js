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

      //load posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]  //sort of like array append
        })
      }
      //console.log({posts: this.state.posts})
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
      postCount:0,
      posts: []
    }
  }

  render() {
    return (
      <div>
        
        <Navbar account={this.state.account}/>


        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px'}}>
              <div className="content mr-auto ml-auto">
                { this.state.posts.map((post,key) => {
                  return (
                    <div className="card mb-4" key={key} >
                      <div className="card-header">
                        <small className="text-muted">{post.author}r</small>
                      </div>
                      <ul id="postList" className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p>{post.content}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <p>TIPS HERE</p>
                        </li>
                      </ul>
                    </div>
                  )
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
