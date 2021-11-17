import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Blaz, BlazBalance } from "../../generated/schema";

export function loadOrCreateBlazBalance(
  blaz: Blaz,
  timestamp: BigInt
): BlazBalance {
  let id = timestamp.toString() + blaz.id;
  let balance = BlazBalance.load(id);
  if (balance == null) {
    balance = new BlazBalance(id);
    balance.blaz = blaz.id;
    balance.timestamp = timestamp;
    balance.sBlazBalance = BigDecimal.fromString("0");
    balance.blazBalance = BigDecimal.fromString("0");
    balance.bondBalance = BigDecimal.fromString("0");
    balance.dollarBalance = BigDecimal.fromString("0");
    balance.stakes = [];
    balance.bonds = [];
    balance.save();
  }
  return balance as BlazBalance;
}
