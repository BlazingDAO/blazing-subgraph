import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { BLAZDAIBondV1 } from "../../generated/BLAZDAIBondV1/BLAZDAIBondV1";
import { DAIBondV1 } from "../../generated/DAIBondV1/DAIBondV1";

import { BondDiscount, Transaction } from "../../generated/schema";
import { BLAZ_DAI_LP_BOND_CONTRACT1, DAI_BOND_CONTRACT_V1 } from "./Constants";
import { hourFromTimestamp } from "./Dates";
import { toDecimal } from "./Decimals";
import { getBLAZUSDRate } from "./Price";

export function loadOrCreateBondDiscount(timestamp: BigInt): BondDiscount {
  let hourTimestamp = hourFromTimestamp(timestamp);

  let bondDiscount = BondDiscount.load(hourTimestamp);
  if (bondDiscount == null) {
    bondDiscount = new BondDiscount(hourTimestamp);
    bondDiscount.timestamp = timestamp;
    bondDiscount.dai_discount = BigDecimal.fromString("0");
    bondDiscount.blazdai_discount = BigDecimal.fromString("0");
    bondDiscount.save();
  }
  return bondDiscount as BondDiscount;
}

export function updateBondDiscounts(transaction: Transaction): void {
  let bd = loadOrCreateBondDiscount(transaction.timestamp);
  let blazRate = getBLAZUSDRate();

  let bond = BLAZDAIBondV1.bind(Address.fromString(BLAZ_DAI_LP_BOND_CONTRACT1));
  let price_call = bond.try_bondPriceInUSD();
  if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
    bd.blazdai_discount = blazRate.div(toDecimal(price_call.value, 18));
    bd.blazdai_discount = bd.blazdai_discount.minus(BigDecimal.fromString("1"));
    bd.blazdai_discount = bd.blazdai_discount.times(
      BigDecimal.fromString("100")
    );
    log.debug("BLAZ-DAI Discount BLAZ price {}  Bond Price {}  Discount {}", [
      blazRate.toString(),
      price_call.value.toString(),
      bd.blazdai_discount.toString(),
    ]);
  }

  //DAI
  let daiBond = DAIBondV1.bind(Address.fromString(DAI_BOND_CONTRACT_V1));
  price_call = daiBond.try_bondPriceInUSD();
  if (price_call.reverted === false && price_call.value.gt(BigInt.fromI32(0))) {
    bd.dai_discount = blazRate.div(toDecimal(price_call.value, 18));
    bd.dai_discount = bd.dai_discount.minus(BigDecimal.fromString("1"));
    bd.dai_discount = bd.dai_discount.times(BigDecimal.fromString("100"));
    log.debug("DAI Discount BLAZ price {}  Bond Price {}  Discount {}", [
      blazRate.toString(),
      price_call.value.toString(),
      bd.dai_discount.toString(),
    ]);
  }

  bd.save();
}
