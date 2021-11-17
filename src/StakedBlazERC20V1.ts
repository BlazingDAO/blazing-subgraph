import { RebaseCall } from "../generated/StakedBlazERC20V1/StakedBlazERC20V1";
import { BlazERC20 } from "../generated/StakedBlazERC20V1/BlazERC20";
import { createDailyStakingReward } from "./utils/DailyStakingReward";
import { loadOrCreateTransaction } from "./utils/Transactions";
import { Rebase } from "../generated/schema";
import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { BLAZ_ERC20_CONTRACT, STAKING_CONTRACT_V1 } from "./utils/Constants";
import { toDecimal } from "./utils/Decimals";
import { getBLAZUSDRate } from "./utils/Price";

export function rebaseFunction(call: RebaseCall): void {
  let transaction = loadOrCreateTransaction(call.transaction, call.block);
  var rebase = Rebase.load(transaction.id);
  log.debug("Rebase event on TX {} with amount {}", [
    transaction.id,
    toDecimal(call.inputs.profit_, 9).toString(),
  ]);

  if (rebase == null && call.inputs.profit_.gt(BigInt.fromI32(0))) {
    let ohm_contract = BlazERC20.bind(Address.fromString(BLAZ_ERC20_CONTRACT));

    rebase = new Rebase(transaction.id);
    rebase.amount = toDecimal(call.inputs.profit_, 9);
    rebase.stakedBlazs = toDecimal(
      ohm_contract.balanceOf(Address.fromString(STAKING_CONTRACT_V1)),
      9
    );
    rebase.contract = STAKING_CONTRACT_V1;
    rebase.percentage = rebase.amount.div(rebase.stakedBlazs);
    rebase.transaction = transaction.id;
    rebase.timestamp = transaction.timestamp;
    rebase.value = rebase.amount.times(getBLAZUSDRate());
    rebase.save();

    createDailyStakingReward(rebase.timestamp, rebase.amount);
  }
}
