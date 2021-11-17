import { Address } from "@graphprotocol/graph-ts";
import { Stake, Unstake } from "../generated/schema";

import { StakeCall } from "../generated/BlazStakingHelperV1/BlazStakingHelperV1";
import { toDecimal } from "./utils/Decimals";
import { loadOrCreateBlaz, updateBlazBalance } from "./utils/Blaz";
import { loadOrCreateTransaction } from "./utils/Transactions";

export function handleStake(call: StakeCall): void {
  let blaz = loadOrCreateBlaz(call.from as Address);
  let transaction = loadOrCreateTransaction(call.transaction, call.block);
  let value = toDecimal(call.inputs._amount, 9);

  let stake = new Stake(transaction.id);
  stake.transaction = transaction.id;
  stake.blaz = blaz.id;
  stake.amount = value;
  stake.timestamp = transaction.timestamp;
  stake.save();

  updateBlazBalance(blaz, transaction);
}
