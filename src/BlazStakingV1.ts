import { Address } from "@graphprotocol/graph-ts";
import { Stake, Unstake } from "../generated/schema";

import {
  StakeCall,
  UnstakeCall,
} from "../generated/BlazStakingV1/BlazStakingV1";
import { toDecimal } from "./utils/Decimals";
import { loadOrCreateBlaz, updateBlazBalance } from "./utils/Blaz";
import { loadOrCreateTransaction } from "./utils/Transactions";
import { updateProtocolMetrics } from "./utils/ProtocolMetrics";

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
  updateProtocolMetrics(transaction);
}

export function handleUnstake(call: UnstakeCall): void {
  let blaz = loadOrCreateBlaz(call.from as Address);
  let transaction = loadOrCreateTransaction(call.transaction, call.block);
  let value = toDecimal(call.inputs._amount, 9);

  let unstake = new Unstake(transaction.id);
  unstake.transaction = transaction.id;
  unstake.blaz = blaz.id;
  unstake.amount = value;
  unstake.timestamp = transaction.timestamp;
  unstake.save();

  updateBlazBalance(blaz, transaction);
  updateProtocolMetrics(transaction);
}
