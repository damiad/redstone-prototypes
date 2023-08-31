const constants = {
  USDC: {
    symbol: "USDC",
    name: "usd-coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
  },
  WETH: {
    symbol: "WETH",
    name: "weth",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    decimals: 18,
  },
  DAI: {
    symbol: "DAI",
    name: "dai",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
  },
  OHM: {
    symbol: "OHM",
    name: "olympus",
    address: "0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5",
    decimals: 9,
  },
  BAL: {
    symbol: "BAL",
    name: "balancer",
    address: "0xba100000625a3754423978a60c9317c58a424e3D",
    decimals: 18,
  },
  unshETH: {
    symbol: "unshETH",
    name: "unsheth",
    address: "0xE60779CC1b2c1d0580611c526a8DF0E3f870EC48",
    decimals: 18,
  },
  ADA: {
    symbol: "ADA",
    name: "cardano",
    address: "0xc14777C94229582E5758C5a79b83DDE876b9BE98",
    decimals: 18,
  },
  UNI: {
    symbol: "UNI",
    name: "uniswap",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    decimals: 18,
  },
  ELON: {
    symbol: "ELON",
    name: "dogelon-mars",
    address: "0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3",
    decimals: 18,
  },
  DIA: {
    symbol: "DIA",
    name: "dia-data",
    address: "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419",
    decimals: 18,
  },
  WBTC: {
    symbol: "WBTC",
    name: "wrapped-bitcoin",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
  },
  PNK: {
    symbol: "PNK",
    name: "kleros",
    address: "0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d",
    decimals: 18,
  },
  MPL: {
    symbol: "MPL",
    name: "maple",
    address: "0x33349B282065b0284d756F0577FB39c158F935e6",
    decimals: 18,
  },
  USDT: {
    symbol: "USDT",
    name: "tether",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
  },
  HBTC: {
    symbol: "HBTC",
    name: "huobi-btc",
    address: "0x0316EB71485b0Ab14103307bf65a021042c6d380",
    decimals: 18,
  },
  ETH: {
    symbol: "ETH",
    name: "ethereum",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
  },
  sETH: {
    symbol: "sETH",
    name: "seth",
    address: "0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb",
    decimals: 18,
  },
  BEN: {
    symbol: "BEN",
    name: "ben",
    address: "0x9bf1D7D63dD7a4ce167CF4866388226EEefa702E",
    decimals: 18,
  },
  RLB: {
    symbol: "RLB",
    name: "rollbit-coin",
    address: "0x046EeE2cc3188071C02BfC1745A6b17c656e3f3d",
    decimals: 18,
  },
  PUNDIX: {
    symbol: "PUNDIX",
    name: "pundi-x-new",
    address: "0x0FD10b9899882a6f2fcb5c371E17e70FdEe00C38",
    decimals: 18,
  },
  HEX: {
    symbol: "HEX",
    name: "hex",
    address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
    decimals: 8,
  },
  BONE: {
    symbol: "BONE",
    name: "bone-shibaswap",
    address: "0x9813037ee2218799597d83D4a5B6F3b6778218d9",
    decimals: 18,
  },
  XEN: {
    symbol: "XEN",
    name: "xen-crypto",
    address: "0x06450dEe7FD2Fb8E39061434BAbCFC05599a6Fb8",
    decimals: 18,
  },
  APE: {
    symbol: "APE",
    name: "apecoin",
    address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
    decimals: 18,
  },
  PSYOP: {
    symbol: "PSYOP",
    name: "psyop",
    address: "0x3007083EAA95497cD6B2b809fB97B6A30bdF53D3",
    decimals: 18,
  },
  OX: {
    symbol: "OX",
    name: "open-exchange-token",
    address: "0x78a0A62Fba6Fb21A83FE8a3433d44C73a4017A6f",
    decimals: 18,
  },
  FINALE: {
    symbol: "FINALE",
    name: "ben-s-finale",
    address: "0xC7a2572fA8FDB0f7E81d6D3c4e3CCF78FB0DC374",
    decimals: 18,
  },
  LINK: {
    symbol: "LINK",
    name: "chainlink",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    decimals: 18,
  },
  PEPE: {
    symbol: "PEPE",
    name: "pepe",
    address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    decimals: 18,
  },
  ARKM: {
    symbol: "ARKM",
    name: "arkham",
    address: "0x6E2a43be0B1d33b726f0CA3b8de60b3482b8b050",
    decimals: 18,
  },
  DAVE: {
    symbol: "DAVE",
    name: "dave-coin",
    address: "0x7f4c5447af6A96d8eeAEE1d932338cFc57890dbD",
    decimals: 18,
  },
  MKR: {
    symbol: "MKR",
    name: "maker",
    address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    decimals: 18,
  },
  YOU: {
    symbol: "YOU",
    name: "youwho",
    address: "0xb92ba0A6a843379499770dE82Aa936d6bA0fd8CA",
    decimals: 18,
  },
  NXRA: {
    symbol: "NXRA",
    name: "allianceblock-nexera",
    address: "0x644192291cc835a93d6330b24ea5f5fedd0eef9e",
    decimals: 18,
  },
  UNIBOT: {
    symbol: "UNIBOT",
    name: "unibot",
    address: "0xf819d9Cb1c2A819Fd991781A822dE3ca8607c3C9",
    decimals: 18,
  },
  LOOTBOT: {
    symbol: "LOOTBOT",
    name: "lootbot",
    address: "0xb478c6245e3d85d6ec3486b62ea872128d562541",
    decimals: 18,
  },
  WAGIEBOT: {
    symbol: "WAGIEBOT",
    name: "wagie-bot",
    address: "0xd2c869382c7ac9f87ff73548d029d67c0f9dee31",
    decimals: 9,
  },
  BROCK: {
    symbol: "BROCK",
    name: "bitrock",
    address: "0xde67d97b8770dc98c746a3fc0093c538666eb493",
    decimals: 9,
  },
  GENIE: {
    symbol: "GENIE",
    name: "geniebot",
    address: "0x56978e609f2cab06f77c5c8fd75166fcd8f09bd8",
    decimals: 18,
  },
  ILV: {
    symbol: "ILV",
    name: "illuvium",
    address: "0x767fe9edc9e0df98e07454847909b5e959d7ca0e",
    decimals: 18,
  },
  SYN: {
    symbol: "SYN",
    name: "synapse",
    address: "0x0f2d719407fdbeff09d87557abb7232601fd9f29",
    decimals: 18,
  },
  COMP: {
    symbol: "COMP",
    name: "compound",
    address: "0xc00e94cb662c3520282e6f5717214004a7f26888",
    decimals: 18,
  },
  SUSHI: {
    symbol: "SUSHI",
    name: "sushi",
    address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    decimals: 18,
  },
  ALCX: {
    symbol: "ALCX",
    name: "alchemix",
    address: "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF",
    decimals: 18,
  },
  FXS: {
    symbol: "FXS",
    name: "frax-share",
    address: "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0",
    decimals: 18,
  },
  FOLD: {
    symbol: "FOLD",
    name: "manifold-finance",
    address: "0xd084944d3c05cd115c09d072b9f44ba3e0e45921",
    decimals: 18,
  },
  SDL: {
    symbol: "SDL",
    name: "stake-link",
    address: "0xa95c5ebb86e0de73b4fb8c47a45b792cfea28c23",
    decimals: 18,
  },
  RADAR: {
    symbol: "RADAR",
    name: "dappradar",
    address: "0x44709a920fccf795fbc57baa433cc3dd53c44dbe",
    decimals: 18,
  },
  BIT: {
    symbol: "BIT",
    name: "bitdao",
    address: "0x1a4b46696b2bb4794eb3d4c26f1c55f9170fa4c5",
    decimals: 18,
  },
  ICE: {
    symbol: "ICE",
    name: "popsicle-finance",
    address: "0xf16e81dce15b08f326220742020379b855b87df9",
    decimals: 18,
  },
  CVX: {
    symbol: "CVX",
    name: "convex-finance",
    address: "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
    decimals: 18,
  },
  SPELL: {
    symbol: "SPELL",
    name: "spell-token",
    address: "0x090185f2135308bad17527004364ebcc2d37e5f6",
    decimals: 18,
  },
  AUCTION: {
    symbol: "AUCTION",
    name: "bounce",
    address: "0xa9b1eb5908cfc3cdf91f9b8b3a74108598009096",
    decimals: 18,
  },
  NFD: {
    symbol: "NFD",
    name: "feisty-doge-nft",
    address: "0xdfdb7f72c1f195c5951a234e8db9806eb0635346",
    decimals: 18,
  },
  USH: {
    symbol: "USH",
    name: "unshething-token",
    address: "0xe60779cc1b2c1d0580611c526a8df0e3f870ec48",
    decimals: 18,
  },
  SNX: {
    symbol: "SNX",
    name: "synthetix-network-token",
    address: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
    decimals: 18,
  },
  FRAX: {
    symbol: "FRAX",
    name: "frax",
    address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    decimals: 18,
  },
  VST: {
    symbol: "VST",
    name: "vesta-stable",
    address: "0x64343594ab9b56e99087bfa6f2335db24c2d1f17",
    decimals: 18,
  },
  crvUSD: {
    symbol: "crvUSD",
    name: "crvusd",
    address: "0xf939E0A03FB07F59A73314E73794Be0E57ac1b4E",
    decimals: 18,
  },
  FRXETH: {
    symbol: "FRXETH",
    name: "frax-ether",
    address: "0x5e8422345238f34275888049021821e8e08caa1f",
    decimals: 18,
  },
  swETH: {
    symbol: "swETH",
    name: "sweth",
    address: "0xf951e335afb289353dc249e82926178eac7ded78",
    decimals: 18,
  },
  GHO: {
    symbol: "GHO",
    name: "gho",
    address: "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
    decimals: 18,
  },
  wstETH: {
    symbol: "wstETH",
    name: "wrapped-steth",
    address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    decimals: 18,
  },
  bbAUSD: {
    symbol: "bb-A-USD",
    name: "balancer-booster-aave-usd",
    address: "0xc443c15033fcb6cf72cc24f1bda0db070ddd9786",
    decimals: 18,
  },

  pricesUnrelated: [1e4, 1e6, 1e8],
  pricesRelated: [1e-3, 1e-2, 1e-1],
};

module.exports = constants;
