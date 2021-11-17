import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { BlazERC20 } from "../../generated/BlazStakingV1/BlazERC20";
import { StakedBlazERC20V1 } from "../../generated/BlazStakingV1/StakedBlazERC20V1";
import { BlazStakingV1 } from "../../generated/BlazStakingV1/BlazStakingV1";
import { BlazCirculatingSupply } from "../../generated/BlazStakingV1/BlazCirculatingSupply";
import { ERC20 } from "../../generated/BlazStakingV1/ERC20";
import { UniswapV2Pair } from "../../generated/BlazStakingV1/UniswapV2Pair";

import { ProtocolMetric, Transaction } from "../../generated/schema";
import {
  CIRCULATING_SUPPLY_CONTRACT,
  CIRCULATING_SUPPLY_CONTRACT_BLOCK,
  DAI_ERC20_CONTRACT,
  BLAZ_ERC20_CONTRACT,
  SBLAZ_ERC20_CONTRACT,
  STAKING_CONTRACT_V1,
  TREASURY_ADDRESS,
  SPOOKY_BLAZ_DAI_PAIR,
} from "./Constants";
import { dayFromTimestamp } from "./Dates";
import { toDecimal } from "./Decimals";
import { getBLAZUSDRate, getDiscountedPairUSD, getPairUSD } from "./Price";
import { getHolderAux } from "./Aux";
import { updateBondDiscounts } from "./BondDiscounts";

export function loadOrCreateProtocolMetric(timestamp: BigInt): ProtocolMetric {
  let dayTimestamp = dayFromTimestamp(timestamp);

  let protocolMetric = ProtocolMetric.load(dayTimestamp);
  if (protocolMetric == null) {
    protocolMetric = new ProtocolMetric(dayTimestamp);
    protocolMetric.timestamp = timestamp;
    protocolMetric.blazCirculatingSupply = BigDecimal.fromString("0");
    protocolMetric.sBlazCirculatingSupply = BigDecimal.fromString("0");
    protocolMetric.totalSupply = BigDecimal.fromString("0");
    protocolMetric.blazPrice = BigDecimal.fromString("0");
    protocolMetric.marketCap = BigDecimal.fromString("0");
    protocolMetric.totalValueLocked = BigDecimal.fromString("0");
    protocolMetric.treasuryRiskFreeValue = BigDecimal.fromString("0");
    protocolMetric.treasuryMarketValue = BigDecimal.fromString("0");
    protocolMetric.nextEpochRebase = BigDecimal.fromString("0");
    protocolMetric.nextDistributedBlaz = BigDecimal.fromString("0");
    protocolMetric.currentAPY = BigDecimal.fromString("0");
    protocolMetric.treasuryDaiRiskFreeValue = BigDecimal.fromString("0");
    protocolMetric.treasuryDaiMarketValue = BigDecimal.fromString("0");
    protocolMetric.holders = BigInt.fromI32(0);

    protocolMetric.save();
  }
  return protocolMetric as ProtocolMetric;
}

function getTotalSupply(): BigDecimal {
  let blaz_contract = BlazERC20.bind(Address.fromString(BLAZ_ERC20_CONTRACT));
  let total_supply = toDecimal(blaz_contract.totalSupply(), 9);
  log.debug("Total Supply {}", [total_supply.toString()]);
  return total_supply;
}

function getCirculatingSupply(
  transaction: Transaction,
  total_supply: BigDecimal
): BigDecimal {
  let circ_supply = BigDecimal.fromString("0");
  if (
    transaction.blockNumber.gt(
      BigInt.fromString(CIRCULATING_SUPPLY_CONTRACT_BLOCK)
    )
  ) {
    let circulatingSupply_contract = BlazCirculatingSupply.bind(
      Address.fromString(CIRCULATING_SUPPLY_CONTRACT)
    );
    circ_supply = toDecimal(
      circulatingSupply_contract.BLAZCirculatingSupply(),
      9
    );
  } else {
    circ_supply = total_supply;
  }
  log.debug("Circulating Supply {}", [total_supply.toString()]);
  return circ_supply;
}

function getSBlazSupply(transaction: Transaction): BigDecimal {
  let sblaz_supply = BigDecimal.fromString("0");

  let sblaz_contract_v1 = StakedBlazERC20V1.bind(
    Address.fromString(SBLAZ_ERC20_CONTRACT)
  );
  sblaz_supply = toDecimal(sblaz_contract_v1.circulatingSupply(), 9);

  log.debug("sBLAZ Supply {}", [sblaz_supply.toString()]);
  return sblaz_supply;
}

function getMV_RFV(transaction: Transaction): BigDecimal[] {
  let daiERC20 = ERC20.bind(Address.fromString(DAI_ERC20_CONTRACT));

  let blazDaiPair = UniswapV2Pair.bind(
    Address.fromString(SPOOKY_BLAZ_DAI_PAIR)
  );
  let treasury_address = TREASURY_ADDRESS;
  let daiBalance = daiERC20.balanceOf(Address.fromString(treasury_address));

  //BLAZ-DAI
  let blazDaiBalance = blazDaiPair.balanceOf(
    Address.fromString(treasury_address)
  );
  let blazDaiTotalLP = toDecimal(blazDaiPair.totalSupply(), 18);
  let blazDaiPOL = toDecimal(blazDaiBalance, 18)
    .div(blazDaiTotalLP)
    .times(BigDecimal.fromString("100"));
  let blazDai_value = getPairUSD(blazDaiBalance, SPOOKY_BLAZ_DAI_PAIR);
  let blazDai_rfv = getDiscountedPairUSD(blazDaiBalance, SPOOKY_BLAZ_DAI_PAIR);

  let stableValue = daiBalance;
  let stableValueDecimal = toDecimal(stableValue, 18);

  let lpValue = blazDai_value;
  let rfvLpValue = blazDai_rfv;

  let mv = stableValueDecimal.plus(lpValue);
  let rfv = stableValueDecimal.plus(rfvLpValue);

  log.debug("Treasury Market Value {}", [mv.toString()]);
  log.debug("Treasury RFV {}", [rfv.toString()]);
  log.debug("Treasury DAI value {}", [toDecimal(daiBalance, 18).toString()]);
  log.debug("Treasury BLAZ-DAI RFV {}", [blazDai_rfv.toString()]);

  return [
    mv,
    rfv,
    // treasuryDaiRiskFreeValue = DAI RFV * DAI + aDAI
    blazDai_rfv.plus(toDecimal(daiBalance, 18)),
    // treasuryDaiMarketValue = DAI LP * DAI + aDAI
    blazDai_value.plus(toDecimal(daiBalance, 18)),
    // POL
    blazDaiPOL,
  ];
}

function getNextBLAZRebase(transaction: Transaction): BigDecimal {
  let staking_contract_v1 = BlazStakingV1.bind(
    Address.fromString(STAKING_CONTRACT_V1)
  );
  let distribution_v1 = toDecimal(staking_contract_v1.epoch().value3, 9);
  log.debug("next_distribution v2 {}", [distribution_v1.toString()]);
  let next_distribution = distribution_v1;
  log.debug("next_distribution total {}", [next_distribution.toString()]);
  return next_distribution;
}

function getAPY_Rebase(
  sBLAZ: BigDecimal,
  distributedBLAZ: BigDecimal
): BigDecimal[] {
  let nextEpochRebase = distributedBLAZ
    .div(sBLAZ)
    .times(BigDecimal.fromString("100"));

  let nextEpochRebase_number = Number.parseFloat(nextEpochRebase.toString());
  let currentAPY =
    Math.pow(nextEpochRebase_number / 100 + 1, 365 * 3 - 1) * 100;

  let currentAPYdecimal = BigDecimal.fromString(currentAPY.toString());

  log.debug("next_rebase {}", [nextEpochRebase.toString()]);
  log.debug("current_apy total {}", [currentAPYdecimal.toString()]);

  return [currentAPYdecimal, nextEpochRebase];
}

function getRunway(
  sBLAZ: BigDecimal,
  rfv: BigDecimal,
  rebase: BigDecimal
): BigDecimal[] {
  let runway2dot5k = BigDecimal.fromString("0");
  let runway5k = BigDecimal.fromString("0");
  let runway7dot5k = BigDecimal.fromString("0");
  let runway10k = BigDecimal.fromString("0");
  let runway20k = BigDecimal.fromString("0");
  let runway50k = BigDecimal.fromString("0");
  let runway70k = BigDecimal.fromString("0");
  let runway100k = BigDecimal.fromString("0");
  let runwayCurrent = BigDecimal.fromString("0");

  if (
    sBLAZ.gt(BigDecimal.fromString("0")) &&
    rfv.gt(BigDecimal.fromString("0")) &&
    rebase.gt(BigDecimal.fromString("0"))
  ) {
    let treasury_runway = Number.parseFloat(rfv.div(sBLAZ).toString());

    let runway2dot5k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.0029438) / 3;
    let runway5k_num = Math.log(treasury_runway) / Math.log(1 + 0.003579) / 3;
    let runway7dot5k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.0039507) / 3;
    let runway10k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.00421449) / 3;
    let runway20k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.00485037) / 3;
    let runway50k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.00569158) / 3;
    let runway70k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.00600065) / 3;
    let runway100k_num =
      Math.log(treasury_runway) / Math.log(1 + 0.00632839) / 3;
    let nextEpochRebase_number = Number.parseFloat(rebase.toString()) / 100;
    let runwayCurrent_num =
      Math.log(treasury_runway) / Math.log(1 + nextEpochRebase_number) / 3;

    runway2dot5k = BigDecimal.fromString(runway2dot5k_num.toString());
    runway5k = BigDecimal.fromString(runway5k_num.toString());
    runway7dot5k = BigDecimal.fromString(runway7dot5k_num.toString());
    runway10k = BigDecimal.fromString(runway10k_num.toString());
    runway20k = BigDecimal.fromString(runway20k_num.toString());
    runway50k = BigDecimal.fromString(runway50k_num.toString());
    runway70k = BigDecimal.fromString(runway70k_num.toString());
    runway100k = BigDecimal.fromString(runway100k_num.toString());
    runwayCurrent = BigDecimal.fromString(runwayCurrent_num.toString());
  }

  return [
    runway2dot5k,
    runway5k,
    runway7dot5k,
    runway10k,
    runway20k,
    runway50k,
    runway70k,
    runway100k,
    runwayCurrent,
  ];
}

export function updateProtocolMetrics(transaction: Transaction): void {
  let pm = loadOrCreateProtocolMetric(transaction.timestamp);

  //Total Supply
  pm.totalSupply = getTotalSupply();

  //Circ Supply
  pm.blazCirculatingSupply = getCirculatingSupply(transaction, pm.totalSupply);

  //sBlaz Supply
  pm.sBlazCirculatingSupply = getSBlazSupply(transaction);

  //BLAZ Price
  pm.blazPrice = getBLAZUSDRate();

  //BLAZ Market Cap
  pm.marketCap = pm.blazCirculatingSupply.times(pm.blazPrice);

  //Total Value Locked
  pm.totalValueLocked = pm.sBlazCirculatingSupply.times(pm.blazPrice);

  //Treasury RFV and MV
  let mv_rfv = getMV_RFV(transaction);
  pm.treasuryMarketValue = mv_rfv[0];
  pm.treasuryRiskFreeValue = mv_rfv[1];
  pm.treasuryDaiRiskFreeValue = mv_rfv[2];
  pm.treasuryDaiMarketValue = mv_rfv[3];
  pm.treasuryBlazDaiPOL = mv_rfv[4];

  // Rebase rewards, APY, rebase
  pm.nextDistributedBlaz = getNextBLAZRebase(transaction);
  let apy_rebase = getAPY_Rebase(
    pm.sBlazCirculatingSupply,
    pm.nextDistributedBlaz
  );
  pm.currentAPY = apy_rebase[0];
  pm.nextEpochRebase = apy_rebase[1];

  //Runway
  let runways = getRunway(
    pm.sBlazCirculatingSupply,
    pm.treasuryRiskFreeValue,
    pm.nextEpochRebase
  );
  pm.runway2dot5k = runways[0];
  pm.runway5k = runways[1];
  pm.runway7dot5k = runways[2];
  pm.runway10k = runways[3];
  pm.runway20k = runways[4];
  pm.runway50k = runways[5];
  pm.runway70k = runways[6];
  pm.runway100k = runways[7];
  pm.runwayCurrent = runways[8];

  //Holders
  pm.holders = getHolderAux().value;

  pm.save();

  updateBondDiscounts(transaction);
}
