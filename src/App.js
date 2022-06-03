import React, { Component } from "react";
import "./App.css";
import mvrgtoken from "./mvrgtoken";

class App extends Component {
  state = {
    name: "",
    symbol: "",
    totalSupply: "",
  };

  async componentDidMount() {
    const name = await mvrgtoken.methods.name().call();
    const symbol = await mvrgtoken.methods.symbol().call();
    const totalSupply = await mvrgtoken.methods.totalSupply().call();

    this.setState({ name, symbol, totalSupply });
  }

  onSubmit = async (event) => {};

  onClick = async () => {};

  render() {
    return (
      <div>
        <h2>Metaverse Research Group Activearn Token</h2>
        <p>
          Token Name: {this.state.name}<br />
          Token Symbol: {this.state.symbol}<br />
          Total Supply: {this.state.totalSupply}
        </p>
        
      </div>
    );
  }
}

export default App;
