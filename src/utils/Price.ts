import { QUICK_BLAZ_DAI_PAIR } from "./Constants";
import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from "../../generated/BlazStakingV1/UniswapV2Pair";
import { toDecimal } from "./Decimals";

let BIG_DECIMAL_1E9 = BigDecimal.fromString("1e9");
let BIG_DECIMAL_1E12 = BigDecimal.fromString("1e12");

export function getBLAZUSDRate(): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(QUICK_BLAZ_DAI_PAIR));

  let reserves = pair.getReserves();
  let reserve0 = reserves.value0.toBigDecimal();
  let reserve1 = reserves.value1.toBigDecimal();

  let blazRate = reserve1.div(reserve0).div(BIG_DECIMAL_1E9);
  log.debug("BLAZ rate {}", [blazRate.toString()]);

  return blazRate;
}

//(slp_treasury/slp_supply)*(2*sqrt(lp_dai * lp_ohm))
export function getDiscountedPairUSD(
  lp_amount: BigInt,
  pair_address: string
): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(pair_address));

  let total_lp = pair.totalSupply();
  let lp_token_1 = toDecimal(pair.getReserves().value0, 9);
  let lp_token_2 = toDecimal(pair.getReserves().value1, 18);
  let kLast = lp_token_1.times(lp_token_2).truncate(0).digits;

  let part1 = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18));
  let two = BigInt.fromI32(2);

  let sqrt = kLast.sqrt();
  let part2 = toDecimal(two.times(sqrt), 0);
  let result = part1.times(part2);
  return result;
}

export function getPairUSD(
  lp_amount: BigInt,
  pair_address: string
): BigDecimal {
  let pair = UniswapV2Pair.bind(Address.fromString(pair_address));
  let total_lp = pair.totalSupply();
  let lp_token_0 = pair.getReserves().value0;
  let lp_token_1 = pair.getReserves().value1;
  let ownedLP = toDecimal(lp_amount, 18).div(toDecimal(total_lp, 18));
  let ohm_value = toDecimal(lp_token_0, 9).times(getBLAZUSDRate());
  let total_lp_usd = ohm_value.plus(toDecimal(lp_token_1, 18));

  return ownedLP.times(total_lp_usd);
}