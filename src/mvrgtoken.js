import web3 from "./web3";

const address = "0x7Fb291671A71E0e9aaBDF3cA94367AC6B8c9700d";

const abi = [
  {
    type: "constructor",
    payable: false,
    inputs: [{ type: "uint256", name: "initialSupply" }],
  },
  {
    type: "event",
    anonymous: false,
    name: "Approval",
    inputs: [
      { type: "address", name: "owner", indexed: true },
      { type: "address", name: "spender", indexed: true },
      { type: "uint256", name: "value", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", indexed: true },
      { type: "address", name: "to", indexed: true },
      { type: "uint256", name: "value", indexed: false },
    ],
  },
  {
    type: "function",
    name: "allowance",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [
      { type: "address", name: "owner" },
      { type: "address", name: "spender" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "balanceOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ internaltype: "uint256", type: "uint256", name: "balanceOf" }],
  },
  {
    type: "function",
    name: "decimals",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "decreaseAllowance",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "subtractedValue" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "increaseAllowance",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "addedValue" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "name",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ internaltype: "string", type: "string", name: "name" }],
  },
  {
    type: "function",
    name: "symbol",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ internaltype: "string", type: "string", name: "symbol" }],
  },
  {
    type: "function",
    name: "totalSupply",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [
      { internaltype: "uint256", type: "uint256", name: "totalSupply" },
    ],
  },
  {
    type: "function",
    name: "transfer",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "to" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "transferFrom",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "from" },
      { type: "address", name: "to" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool" }],
  },
];

export default new web3.eth.Contract(abi, address);
