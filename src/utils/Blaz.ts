import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { Blaz, Transaction } from "../../generated/schema";
import { BlazERC20 } from "../../generated/DAIBondV1/BlazERC20";
import { StakedBlazERC20V1 } from "../../generated/DaiBondV1/StakedBlazERC20V1";
import { DAIBondV1 } from "../../generated/DaiBondV1/DaiBondV1";
import { BLAZDAIBondV1 } from "../../generated/DaiBondV1/BLAZDAIBondV1";

import {
  DAI_BOND_CONTRACT_V1,
  BLAZ_DAI_LP_BOND_CONTRACT1,
  BLAZ_DAI_LP_BOND_CONTRACT1_BLOCK,
  BLAZ_ERC20_CONTRACT,
  SBLAZ_ERC20_CONTRACT,
} from "./Constants";
import { loadOrCreateBlazBalance } from "./BlazBalances";
import { toDecimal } from "./Decimals";
import { getBLAZUSDRate } from "./Price";
import { loadOrCreateContractInfo } from "./ContractInfo";
import { getHolderAux } from "./Aux";

export function loadOrCreateBlaz(address: Address): Blaz {
  let blaz = Blaz.load(address.toHex());
  if (blaz == null) {
    let holders = getHolderAux();
    holders.value = holders.value.plus(BigInt.fromI32(1));
    holders.save();

    blaz = new Blaz(address.toHex());
    blaz.active = true;
    blaz.save();
  }
  return blaz as Blaz;
}

export function updateBlazBalance(blaz: Blaz, transaction: Transaction): void {
  let balance = loadOrCreateBlazBalance(blaz, transaction.timestamp);

  let blaz_contract = BlazERC20.bind(Address.fromString(BLAZ_ERC20_CONTRACT));
  let sBlaz_contract = StakedBlazERC20V1.bind(
    Address.fromString(SBLAZ_ERC20_CONTRACT)
  );
  balance.blazBalance = toDecimal(
    blaz_contract.balanceOf(Address.fromString(blaz.id)),
    9
  );
  let sBlazV1Balance = toDecimal(
    sBlaz_contract.balanceOf(Address.fromString(blaz.id)),
    9
  );
  balance.sBlazBalance = sBlazV1Balance;

  let stakes = balance.stakes;

  let cInfoSBlazBalance_v1 = loadOrCreateContractInfo(
    blaz.id + transaction.timestamp.toString() + "sBlazERC20"
  );
  cInfoSBlazBalance_v1.name = "sBLAZ";
  cInfoSBlazBalance_v1.contract = SBLAZ_ERC20_CONTRACT;
  cInfoSBlazBalance_v1.amount = sBlazV1Balance;
  cInfoSBlazBalance_v1.save();
  stakes.push(cInfoSBlazBalance_v1.id);

  balance.stakes = stakes;

  if (
    blaz.active &&
    balance.blazBalance.lt(BigDecimal.fromString("0.01")) &&
    balance.sBlazBalance.lt(BigDecimal.fromString("0.01"))
  ) {
    let holders = getHolderAux();
    holders.value = holders.value.minus(BigInt.fromI32(1));
    holders.save();
    blaz.active = false;
  } else if (
    blaz.active == false &&
    (balance.blazBalance.gt(BigDecimal.fromString("0.01")) ||
      balance.sBlazBalance.gt(BigDecimal.fromString("0.01")))
  ) {
    let holders = getHolderAux();
    holders.value = holders.value.plus(BigInt.fromI32(1));
    holders.save();
    blaz.active = true;
  }

  // BLAZ-DAI
  let bonds = balance.bonds;
  let bondOHMDai_contract = BLAZDAIBondV1.bind(
    Address.fromString(BLAZ_DAI_LP_BOND_CONTRACT1)
  );
  let pending = bondOHMDai_contract.bondInfo(Address.fromString(blaz.id));
  if (pending.value1.gt(BigInt.fromString("0"))) {
    let pending_bond = toDecimal(pending.value1, 9);
    balance.bondBalance = balance.bondBalance.plus(pending_bond);

    let bondInfo = loadOrCreateContractInfo(
      blaz.id + transaction.timestamp.toString() + "BLAZDAIBondV1"
    );
    bondInfo.name = "BLAZ-DAI";
    bondInfo.contract = BLAZ_DAI_LP_BOND_CONTRACT1;
    bondInfo.amount = pending_bond;
    bondInfo.save();
    bonds.push(bondInfo.id);

    log.debug("Blaz {} pending BLAZDAIBondV1 {} on tx {}", [
      blaz.id,
      toDecimal(pending.value1, 9).toString(),
      transaction.id,
    ]);
  }

  // DAI
  let bondDai_contract = DAIBondV1.bind(
    Address.fromString(DAI_BOND_CONTRACT_V1)
  );
  let pendingDai = bondDai_contract.bondInfo(Address.fromString(blaz.id));
  if (pendingDai.value1.gt(BigInt.fromString("0"))) {
    let pending_bond = toDecimal(pendingDai.value1, 9);
    balance.bondBalance = balance.bondBalance.plus(pending_bond);

    let bondInfo = loadOrCreateContractInfo(
      blaz.id + transaction.timestamp.toString() + "DAIBondV3"
    );
    bondInfo.name = "DAI";
    bondInfo.contract = DAI_BOND_CONTRACT_V1;
    bondInfo.amount = pending_bond;
    bondInfo.save();
    bonds.push(bondInfo.id);

    log.debug("Blaz {} pending DAIBond V1 {} on tx {}", [
      blaz.id,
      toDecimal(pendingDai.value1, 9).toString(),
      transaction.id,
    ]);
  }
  // Price
  let usdRate = getBLAZUSDRate();
  balance.dollarBalance = balance.blazBalance
    .times(usdRate)
    .plus(balance.sBlazBalance.times(usdRate))
    .plus(balance.bondBalance.times(usdRate));
  balance.save();

  blaz.lastBalance = balance.id;
  blaz.save();
}
