const ethers = require("ethers");
const dotenv = require("dotenv");
const path = require("path");
const redstone = require("redstone-api");
const constants = require("../utils/constants");
const {
  calculatePoolSize,
  calcPricesInEachOther,
  calculateAndWriteToCSV,
} = require("../utils/common");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

cryptoASymbol = "WETH";
cryptoBSymbol = "DAI";

const fee = 3000;
const gasFee = fee / 1e6;
let DEX = "Uniswap V2";

const cryptoA = constants[cryptoASymbol];
const cryptoB = constants[cryptoBSymbol];

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
);
const abi = [
  "function getAmountsOut(uint256 amountIn, address[] memory path) public view returns (uint256[] memory amounts)",
];
const pairAbi = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function token0() external view returns (address)",
];

async function getPricesInEachOther(fromCrypto, toCrypto) {
  const factoryAbi = [
    "function getPair(address tokenA, address tokenB) external view returns (address pair)",
  ];
  const factoryContract = new ethers.Contract(
    factoryAddress,
    factoryAbi,
    provider
  );
  const pairAddress = await factoryContract.getPair(
    fromCrypto.address,
    toCrypto.address
  );
  const pairContract = new ethers.Contract(pairAddress, pairAbi, provider);
  const reserves = await pairContract.getReserves();
  const token0 = await pairContract.token0();
  let reserves0 = reserves[0];
  let reserves1 = reserves[1];

  if (toCrypto.address.toLowerCase() === token0.toLowerCase())
    [reserves0, reserves1] = [reserves1, reserves0];
  const poolSize = await calculatePoolSize(
    ethers.utils.formatUnits(reserves0, fromCrypto.decimals),
    ethers.utils.formatUnits(reserves1, toCrypto.decimals),
    fromCrypto,
    toCrypto
  );
  // await getApproximateTokensAmountInPool(pairAddress, fromCrypto, toCrypto);
  const [secondPriceInFirst, firstPriceInSecond] = calcPricesInEachOther(
    reserves0,
    reserves1,
    fromCrypto.decimals,
    toCrypto.decimals
  );
  return [poolSize, firstPriceInSecond, secondPriceInFirst];
}

async function getOutAmount(fromAmount, fromCrypto, toCrypto, contract) {
  const amounts = await contract.getAmountsOut(
    ethers.utils.parseUnits(fromAmount.toString(), fromCrypto.decimals),
    [fromCrypto.address, toCrypto.address]
  );
  return ethers.utils.formatUnits(amounts[1].toString(), toCrypto.decimals);
}

async function calculateSlippage(fromCrypto, toCrypto) {
  const [poolSize, firstPriceInSecond, secondPriceInFirst] =
    await getPricesInEachOther(fromCrypto, toCrypto);

  calculateAndWriteToCSV(
    DEX,
    fromCrypto,
    toCrypto,
    poolSize,
    secondPriceInFirst,
    firstPriceInSecond,
    gasFee,
    getOutAmount,
    contract
  );
}

async function findSlippage() {
  await calculateSlippage(cryptoA, cryptoB);
}

let address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Uniswap V2 Router address
let factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; // Uniswap V2 Factory address
let contract = new ethers.Contract(address, abi, provider);
async function main() {
  DEX = "Uniswap V2";
  await findSlippage().catch((err) => {
    console.error("Error occurred:", err);
  });

  DEX = "SushiSwap";
  address = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f"; // SushiSwap Router02 address
  factoryAddress = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"; // SushiSwap Factory address
  contract = new ethers.Contract(address, abi, provider);
  await findSlippage().catch((err) => {
    console.error("Error occurred:", err);
  });
}

main().catch((err) => {
  console.error("Error occurred:", err);
});
