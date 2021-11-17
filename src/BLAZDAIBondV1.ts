import {
  DepositCall,
  RedeemCall,
} from "../generated/BLAZDAIBondV1/BLAZDAIBondV1";
import { Deposit, Redemption } from "../generated/schema";
import { loadOrCreateTransaction } from "./utils/Transactions";
import { loadOrCreateBlaz, updateBlazBalance } from "./utils/Blaz";
import { toDecimal } from "./utils/Decimals";
import {
  BLAZ_DAI_LP_BOND_TOKEN,
  SPOOKY_BLAZ_DAI_PAIR,
} from "./utils/Constants";
import { loadOrCreateToken } from "./utils/Tokens";
import { createDailyBondRecord } from "./utils/DailyBond";
import { getPairUSD } from "./utils/Price";

export function handleDeposit(call: DepositCall): void {
  let blaz = loadOrCreateBlaz(call.transaction.from);
  let transaction = loadOrCreateTransaction(call.transaction, call.block);
  let token = loadOrCreateToken(BLAZ_DAI_LP_BOND_TOKEN);

  let amount = toDecimal(call.inputs._amount, 18);
  let deposit = new Deposit(transaction.id);
  deposit.transaction = transaction.id;
  deposit.blaz = blaz.id;
  deposit.amount = amount;
  deposit.value = getPairUSD(call.inputs._amount, SPOOKY_BLAZ_DAI_PAIR);
  deposit.maxPremium = toDecimal(call.inputs._maxPrice);
  deposit.token = token.id;
  deposit.timestamp = transaction.timestamp;
  deposit.save();

  createDailyBondRecord(
    deposit.timestamp,
    token,
    deposit.amount,
    deposit.value
  );
  updateBlazBalance(blaz, transaction);
}

export function handleRedeem(call: RedeemCall): void {
  let blaz = loadOrCreateBlaz(call.transaction.from);
  let transaction = loadOrCreateTransaction(call.transaction, call.block);

  let redemption = Redemption.load(transaction.id);
  if (redemption == null) {
    redemption = new Redemption(transaction.id);
  }
  redemption.transaction = transaction.id;
  redemption.blaz = blaz.id;
  redemption.token = loadOrCreateToken(BLAZ_DAI_LP_BOND_TOKEN).id;
  redemption.timestamp = transaction.timestamp;
  redemption.save();
  updateBlazBalance(blaz, transaction);
}
