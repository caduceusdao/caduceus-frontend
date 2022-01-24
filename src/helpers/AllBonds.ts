import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as OhmDaiImg } from "src/assets/tokens/OHM-DAI.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";
import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";
import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { BigNumberish } from "ethers";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "dai",
  displayName: "DAI",
  bondToken: "DAI",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Localhost]: true, [NetworkID.Testnet]: true , [NetworkID.Fujinet]: true,[NetworkID.BscTestnet]: true  },
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xc43db16ed7b57597170b76d3aff29708bc608483", // Olympus Bond Depository: DAI bond
      reserveAddress: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E", // DAI address
    },
    [NetworkID.Testnet]: {
      bondAddress: addresses[NetworkID.Testnet].DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.Testnet].DAI_ADDRESS,
    },
    [NetworkID.Fujinet]: {
      bondAddress: addresses[NetworkID.Fujinet].DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.Fujinet].DAI_ADDRESS,
    },
    [NetworkID.Localhost]: {
      bondAddress: addresses[NetworkID.Localhost].DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.Localhost].DAI_ADDRESS,
    },
    [NetworkID.BscTestnet]: {
      bondAddress: addresses[NetworkID.BscTestnet].DAI_BOND_ADDRESS,
      reserveAddress: addresses[NetworkID.BscTestnet].DAI_ADDRESS,
    },
  },
});

// export const eth = new CustomBond({
//   name: "ftm",
//   displayName: "wFTM",
//   lpUrl: "",
//   bondType: BondType.StableAsset,
//   bondToken: "wFTM",
//   isAvailable: { [NetworkID.Mainnet]: true },
//   bondIconSvg: wETHImg,
//   bondContractABI: EthBondContract,
//   reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xd7cbA20A464C10FB03Bbc265D962ADa8e29af118",
//       reserveAddress: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "",
//       reserveAddress: "",
//     },
//   },
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     const ethBondContract = this.getContractForBond(networkID, provider);
//     const token = this.getContractForReserve(networkID, provider);

//     let [ethPrice, ethAmount]: [BigNumberish, BigNumberish] = await Promise.all([
//       ethBondContract.assetPrice(),
//       token.balanceOf(addresses[networkID].TREASURY_ADDRESS),
//     ]);

//     ethPrice = Number(ethPrice.toString()) / Math.pow(10, 8);
//     ethAmount = Number(ethAmount.toString()) / Math.pow(10, 18);
//     return ethAmount * ethPrice;
//   },
// });

export const ohm_dai = new LPBond({
  name: "exod_dai_lp",
  displayName: "EXOD-DAI LP",
  bondToken: "DAI",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true, [NetworkID.Fujinet]: true,[NetworkID.BscTestnet]: true },
  bondIconSvg: OhmDaiImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x5b7e66542800ca1a27402dd00f4325460553c5eb", // Olympus Bond Depository: Ohm-Dai LP bond
      reserveAddress: "0xc0c1dff0fe24108586e11ec9e20a7cbb405cb769", // LP pair address(UniswapV2Pair)
    },
    [NetworkID.Testnet]: {
      bondAddress: addresses[NetworkID.Testnet].DAI_LP_BOND_ADDRESS, // Olympus Bond Depository: Ohm-Dai LP bond
      reserveAddress: addresses[NetworkID.Testnet].DAI_LP_RESERVE_ADDRESS, // LP pair address(UniswapV2Pair)
    },
    [NetworkID.Fujinet]: {
      bondAddress: addresses[NetworkID.Fujinet].DAI_LP_BOND_ADDRESS, // Olympus Bond Depository: Ohm-Dai LP bond
      reserveAddress: addresses[NetworkID.Fujinet].DAI_LP_RESERVE_ADDRESS, // LP pair address(UniswapV2Pair)
    },
    [NetworkID.BscTestnet]: {
      bondAddress: addresses[NetworkID.BscTestnet].DAI_LP_BOND_ADDRESS, // Olympus Bond Depository: Ohm-Dai LP bond
      reserveAddress: addresses[NetworkID.BscTestnet].DAI_LP_RESERVE_ADDRESS, // LP pair address(UniswapV2Pair)
    },
    [NetworkID.Localhost]: {
      bondAddress: addresses[31337].DAI_BOND_ADDRESS, // // Olympus Bond Depository: Ohm-Dai LP bond
      reserveAddress: addresses[31337].DAI_ADDRESS, // LP pair address(UniswapV2Pair)
    },
  },
  lpUrl:
    "https://spookyswap.finance/add/0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E/0x3b57f3FeAaF1e8254ec680275Ee6E7727C7413c7",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai, ohm_dai];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
export const allExpiredBonds: (StableBond | CustomBond | LPBond)[] = [];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
