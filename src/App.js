import React, { Component } from "react";
import "./App.css";
import mvrgtoken from "./mvrgtoken";
import web3 from "./web3";

class App extends Component {
  state = {
    name: "",
    symbol: "",
    totalSupply: "",
    message: "",
    connectWalletText: "Connect Wallet",
    address: "",
    addressBalance: "",
    receiverAddress: "",
  };

  async componentDidMount() {
    const name = await mvrgtoken.methods.name().call();
    const symbol = await mvrgtoken.methods.symbol().call();
    const totalSupply = await mvrgtoken.methods.totalSupply().call();

    this.setState({ name, symbol, totalSupply });
  }

  connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ connectWalletText: "Connecting..." });
    this.setState({ address: accounts[0] });
    const balance = await mvrgtoken.methods.balanceOf(accounts[0]).call();
    this.setState({ connectWalletText: "Wallet Connected" });
    this.setState({ addressBalance: balance });
  };

  joinEvent = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Waiting on Join the event transaction success...",
    });

    await mvrgtoken.methods.transfer(this.state.receiverAddress, 100).send({
      from: accounts[0],
      gasLimit: "3000000",
    });
    this.setState({ message: "Join the event transaction success!" });
  };

  render() {
    return (
      <div>
        <h2>Metaverse Research Group Activearn Token</h2>
        <p>
          Token Name: {this.state.name}
          <br />
          Token Symbol: {this.state.symbol}
          <br />
          Total Supply: {this.state.totalSupply}
        </p>
        <hr />
        <p>
          <button onClick={this.connectWallet}>
            {this.state.connectWalletText}
          </button>
          <div>
            <h3>Address: {this.state.address}</h3>
            <h3>Balance: {this.state.addressBalance}</h3>
          </div>
        </p>
        <hr />
        <p>
          Event Name: Med-a-verse
          <br />
          Event Date: 11-05-2022
          <br />
          Event Location: MSKU Medical Faculty
          <br />
          Event Description: In this presentation, we first introduce our
          <br />
          research group and touch on digital twin, virtual reality (vr-ar-xr)
          <br />
          and medicine studies; We also make statements about the future with
          <br />
          the topics of metaverse, blockchain and token economy.
          <br />
        </p>
        <hr />
        <h4>Join the event</h4>
        <div>
          <label>Participant Address: </label>
          <input
            value={this.state.receiverAddress}
            onChange={(event) =>
              this.setState({ receiverAddress: event.target.value })
            }
          />
        </div>
        <br />
        <button className="button" onClick={this.joinEvent}>
          Send the MvRG Token
        </button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
