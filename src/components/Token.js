import React, { Component } from "react";
import mvrgtoken from "../mvrgtoken";
import web3 from "../web3";
import styles from "../Wallet.module.css";
import 'antd/dist/antd.css'

class Token extends Component {
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
                <h2>Metaverse Research Group MvRG Token</h2>
                <h2 className={styles.tokenName}>Activern</h2>
                <div className={styles.walletCard}>
                    <h3>Token Name: {this.state.name}</h3>
                    <h3>Token Symbol: {this.state.symbol}</h3>
                    <h3>Total Supply: {this.state.totalSupply}</h3>
                </div>

                <div className={styles.btnWrapper} >
                    <button className={styles.button6} onClick={this.connectWallet}>
                        {this.state.connectWalletText}
                    </button></div>
                
                <p className={styles.addressWrapper}>
                   
                    
                    <div >
                        <h3>Address: {this.state.address}</h3>
                        <h3>Balance: {this.state.addressBalance}</h3>
                    </div>
                </p>
               
                <div className={styles.eventWrapper}>
                    
                        <h3>Event Name:</h3> <p> Med-a-verse</p>
                        <h3>Event Date:</h3> <p> 11-05-2022</p>{" "}
                        <h3>Event Location:</h3>  <p>MSKU Medical Faculty</p>
                    <h3>  Event Description:</h3>
                    <p>
                       In this presentation, we first introduce our
                        research group and touch on digital twin, virtual reality (vr-ar-xr)
                        and medicine studies; We also make statements about the future with
                        the topics of metaverse, blockchain and token economy.
                    </p>
                </div>
              
                <div className={styles.interactionsCard}>
                    <h2 className={styles.header}>Join the event</h2>
                    <div>
                        <h3 className={styles.header}>Participant Address: </h3>
                        <input
                        type="text"
                        value={this.receiverAddress}
                        className={styles.addressInput}
                            onChange={(event) =>
                                this.setState({ receiverAddress: event.target.value })
                            }
                        
                        placeholder="Enter your email"
                        />
        
                        
                    </div>
                    <br />
                    <div className={styles.btnWrapper} >

                    <button className={styles.button6} onClick={this.joinEvent}>
                        Send the MvRG Token
                    </button>
                    </div>
                    <hr />
                </div>
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}

export default Token;
