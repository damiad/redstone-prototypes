const { Web3 } = require("web3");
const { fromWei } = require("web3-utils");

const rpcUrl = "https://eth.drpc.org";
const httpProvider = new Web3.providers.HttpProvider(rpcUrl);
const web3 = new Web3(httpProvider);

const contractAddress = "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0";
const address = "0xd15a672319cf0352560ee76d9e89eab0889046d3";
//fromAddress 0x889edc2edab5f40e902b864ad4d7ade8e412f9b1;
const topics = [
  "0xd2282bfa24f3803076af0953f1ed987d0e45edacdc20d6dce52337b1c4588cdb",
  "0x0000000000000000000000000000000000000000000000000000000000000000",
  "0x000000000000000000000000ae7ab96520de3a18e5e111b5eaab095312d7fe84",
];

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "stEthPerToken",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function readFunctionValueAtBlock(targetBlockNumber, retryCount = 5) {
  for (let i = 0; i < retryCount; i++) {
    try {
      const result = await contract.methods
        .stEthPerToken()
        .call(null, targetBlockNumber);
      return fromWei(result, "ether");
    } catch (error) {
      console.error(`Error reading function value (Attempt ${i + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      if (i === retryCount - 1) console.error(error);
    }
  }
}

async function getBlockNumbers(retryCount = 5) {
  for (let i = 0; i < retryCount; i++) {
    try {
      const days = 9;
      const blockRange = days * 24 * 60 * 5; // assuming 5 blocks per minute, if more than increase 5 to 6 or 7
      const currentBlockNumber = Number(await web3.eth.getBlockNumber());
      const transactions = await web3.eth.getPastLogs({
        address: address,
        fromBlock: currentBlockNumber - blockRange,
        toBlock: currentBlockNumber,
        topics: topics,
      });

      const blockNumbers = transactions.map((transaction) => {
        return Number(transaction.blockNumber);
      });
      return blockNumbers;
    } catch (error) {
      console.error(`Error fetching transactions (Attempt ${i + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      if (i === retryCount - 1) console.error(error);
    }
  }
}

function calculateYearlyReturn(startWeekVal, endWeekVal) {
  const weeklyReturn = endWeekVal / startWeekVal;
  const yearlyReturn = weeklyReturn ** (365 / 7);
  console.log("weeklyReturn", weeklyReturn);
  console.log("yearlyReturn", yearlyReturn);
}

async function findPreviousWeekBlockNumber(blockNumbers) {
  const maxDifferenceSeconds = (7 * 24 + 12) * 60 * 60;
  const endBlockNumber = blockNumbers[blockNumbers.length - 1];

  const endBlock = await web3.eth.getBlock(endBlockNumber);
  const endTimestamp = Number(endBlock.timestamp);

  let startBlockIndex = Math.max(blockNumbers.length - 8, 0);
  let startBlock = await web3.eth.getBlock(blockNumbers[startBlockIndex]);
  let startTimestamp = Number(startBlock.timestamp);

  while (endTimestamp - startTimestamp > maxDifferenceSeconds) {
    startBlockIndex++;
    startBlock = await web3.eth.getBlock(blockNumbers[startBlockIndex]);
    startTimestamp = Number(startBlock.timestamp);
  }
  console.log(`Time difference: ${endTimestamp - startTimestamp} seconds`);
  console.log(`maxDifferenceSeconds: ${maxDifferenceSeconds} seconds`);

  return startBlockIndex;
}

async function readHistoricalValues() {
  const blocksToCheck = await getBlockNumbers();
  const startBlockIndex = await findPreviousWeekBlockNumber(blocksToCheck);
  // TODO:if we are sure everything works great (for last 200 days it was OK), then simply use:
  // const startBlockIndex = blocksToCheck.length - 8;
  console.log("startBlockIndex", startBlockIndex);
  const actualBlocksToCheck = [
    blocksToCheck[startBlockIndex],
    blocksToCheck[blocksToCheck.length - 1],
  ];

  const blockValues = await Promise.all(
    actualBlocksToCheck.map((blockNumber) =>
      readFunctionValueAtBlock(blockNumber)
    )
  );

  calculateYearlyReturn(blockValues[0], blockValues[1]);
}

readHistoricalValues();