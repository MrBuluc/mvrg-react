import React, { Component } from "react";
import "./App.css";
import mvrgtoken from "./mvrgtoken";
import web3 from "./web3";
import styles from "./Wallet.module.css";

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
      <div className="App">
        <h2>Metaverse Research Group MvRG Token</h2>
        <div className={styles.walletCard}>
          <h3>Token Name: {this.state.name}</h3>
          <h3>Token Symbol: {this.state.symbol}</h3>
          <h3>Total Supply: {this.state.totalSupply}</h3>
        </div>
        <hr />
        <p>
          <button className={styles.button6} onClick={this.connectWallet}>
            {this.state.connectWalletText}
          </button>
          <div className={styles.walletCard}>
            <h3>Address: {this.state.address}</h3>
            <h3>Balance: {this.state.addressBalance}</h3>
          </div>
        </p>
        <hr />
        <div className={styles.walletCard}>
          <h3>Event Name: Med-a-verse</h3>
          <h3>Event Date: 11-05-2022</h3>{" "}
          <h3>Event Location: MSKU Medical Faculty</h3>
          <h3>
            Event Description: In this presentation, we first introduce our
            research group and touch on digital twin, virtual reality (vr-ar-xr)
            and medicine studies; We also make statements about the future with
            the topics of metaverse, blockchain and token economy.
          </h3>
        </div>
        <hr />
        <div className={styles.interactionsCard}>
          <h2>Join the event</h2>
          <div>
            <h3>Participant Address: </h3>
            <input
              className={styles.addressInput}
              value={this.state.receiverAddress}
              onChange={(event) =>
                this.setState({ receiverAddress: event.target.value })
              }
            />
          </div>
          <br />
          <button className={styles.button6} onClick={this.joinEvent}>
            Send the MvRG Token
          </button>
          <hr />
        </div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
