const { parseEther, parseUnits, MaxUint256, getBalance } = require("ethers");
const { ethers } = require("hardhat");

const ERC20ABI = require('../ERC20.json');

const UNISWAPV2ROUTER02_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

const main = async () => {
     const [owner, user1, user2] = await ethers.getSigners();

     const provider = ethers.provider();

    console.log(owner.address)
    
    const DAI = new ethers.Contract(DAI_ADDRESS, ERC20ABI, owner)
    
    let DaiBalance = await DAI.balanceOf(owner.address)

    console.log("Dai Balance in owner account", DaiBalance)
    
    let ownerEthBalance = await provider.getBalance(owner.address)

    console.log("Owner Eth Balance in provider account", ownerEthBalance)

    const uniswapTradeExample = await ethers.getContractFactory("UniswapTradeExample")

    const uniswapInstance =await uniswapTradeExample.deploy(UNISWAPV2ROUTER02_ADDRESS)

    await uniswapInstance.deployed()

    console.log("=========swap========")

    await uniswapInstance.swapExactETHForTokens(0, DAI_ADDRESS, {value: parseEther("30")})


////After swap
     DaiBalance = await DAI.balanceOf(owner.address)

    console.log("Dai Balance in owner account", DaiBalance)

     ownerEthBalance = await provider.getBalance(owner.address)

     console.log("Owner Eth Balance in provider account", ownerEthBalance)

};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
