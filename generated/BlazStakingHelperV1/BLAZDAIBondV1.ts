// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class BondCreated extends ethereum.Event {
  get params(): BondCreated__Params {
    return new BondCreated__Params(this);
  }
}

export class BondCreated__Params {
  _event: BondCreated;

  constructor(event: BondCreated) {
    this._event = event;
  }

  get deposit(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get payout(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get expires(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get priceInUSD(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class BondPriceChanged extends ethereum.Event {
  get params(): BondPriceChanged__Params {
    return new BondPriceChanged__Params(this);
  }
}

export class BondPriceChanged__Params {
  _event: BondPriceChanged;

  constructor(event: BondPriceChanged) {
    this._event = event;
  }

  get priceInUSD(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get internalPrice(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get debtRatio(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class BondRedeemed extends ethereum.Event {
  get params(): BondRedeemed__Params {
    return new BondRedeemed__Params(this);
  }
}

export class BondRedeemed__Params {
  _event: BondRedeemed;

  constructor(event: BondRedeemed) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get payout(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get remaining(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ControlVariableAdjustment extends ethereum.Event {
  get params(): ControlVariableAdjustment__Params {
    return new ControlVariableAdjustment__Params(this);
  }
}

export class ControlVariableAdjustment__Params {
  _event: ControlVariableAdjustment;

  constructor(event: ControlVariableAdjustment) {
    this._event = event;
  }

  get initialBCV(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newBCV(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get adjustment(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get addition(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class OwnershipPulled extends ethereum.Event {
  get params(): OwnershipPulled__Params {
    return new OwnershipPulled__Params(this);
  }
}

export class OwnershipPulled__Params {
  _event: OwnershipPulled;

  constructor(event: OwnershipPulled) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipPushed extends ethereum.Event {
  get params(): OwnershipPushed__Params {
    return new OwnershipPushed__Params(this);
  }
}

export class OwnershipPushed__Params {
  _event: OwnershipPushed;

  constructor(event: OwnershipPushed) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BLAZDAIBondV1__adjustmentResult {
  value0: boolean;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: boolean,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class BLAZDAIBondV1__bondInfoResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class BLAZDAIBondV1__termsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    return map;
  }
}

export class BLAZDAIBondV1 extends ethereum.SmartContract {
  static bind(address: Address): BLAZDAIBondV1 {
    return new BLAZDAIBondV1("BLAZDAIBondV1", address);
  }

  BLAZ(): Address {
    let result = super.call("BLAZ", "BLAZ():(address)", []);

    return result[0].toAddress();
  }

  try_BLAZ(): ethereum.CallResult<Address> {
    let result = super.tryCall("BLAZ", "BLAZ():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  DAO(): Address {
    let result = super.call("DAO", "DAO():(address)", []);

    return result[0].toAddress();
  }

  try_DAO(): ethereum.CallResult<Address> {
    let result = super.tryCall("DAO", "DAO():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  adjustment(): BLAZDAIBondV1__adjustmentResult {
    let result = super.call(
      "adjustment",
      "adjustment():(bool,uint256,uint256,uint256,uint256)",
      []
    );

    return new BLAZDAIBondV1__adjustmentResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_adjustment(): ethereum.CallResult<BLAZDAIBondV1__adjustmentResult> {
    let result = super.tryCall(
      "adjustment",
      "adjustment():(bool,uint256,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BLAZDAIBondV1__adjustmentResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  bondCalculator(): Address {
    let result = super.call("bondCalculator", "bondCalculator():(address)", []);

    return result[0].toAddress();
  }

  try_bondCalculator(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "bondCalculator",
      "bondCalculator():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bondInfo(param0: Address): BLAZDAIBondV1__bondInfoResult {
    let result = super.call(
      "bondInfo",
      "bondInfo(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new BLAZDAIBondV1__bondInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_bondInfo(
    param0: Address
  ): ethereum.CallResult<BLAZDAIBondV1__bondInfoResult> {
    let result = super.tryCall(
      "bondInfo",
      "bondInfo(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BLAZDAIBondV1__bondInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  bondPrice(): BigInt {
    let result = super.call("bondPrice", "bondPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bondPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("bondPrice", "bondPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bondPriceInUSD(): BigInt {
    let result = super.call("bondPriceInUSD", "bondPriceInUSD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bondPriceInUSD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "bondPriceInUSD",
      "bondPriceInUSD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  currentDebt(): BigInt {
    let result = super.call("currentDebt", "currentDebt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_currentDebt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("currentDebt", "currentDebt():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  debtDecay(): BigInt {
    let result = super.call("debtDecay", "debtDecay():(uint256)", []);

    return result[0].toBigInt();
  }

  try_debtDecay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("debtDecay", "debtDecay():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  debtRatio(): BigInt {
    let result = super.call("debtRatio", "debtRatio():(uint256)", []);

    return result[0].toBigInt();
  }

  try_debtRatio(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("debtRatio", "debtRatio():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  deposit(_amount: BigInt, _maxPrice: BigInt, _depositor: Address): BigInt {
    let result = super.call(
      "deposit",
      "deposit(uint256,uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_amount),
        ethereum.Value.fromUnsignedBigInt(_maxPrice),
        ethereum.Value.fromAddress(_depositor)
      ]
    );

    return result[0].toBigInt();
  }

  try_deposit(
    _amount: BigInt,
    _maxPrice: BigInt,
    _depositor: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "deposit",
      "deposit(uint256,uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_amount),
        ethereum.Value.fromUnsignedBigInt(_maxPrice),
        ethereum.Value.fromAddress(_depositor)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isLiquidityBond(): boolean {
    let result = super.call("isLiquidityBond", "isLiquidityBond():(bool)", []);

    return result[0].toBoolean();
  }

  try_isLiquidityBond(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isLiquidityBond",
      "isLiquidityBond():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lastDecay(): BigInt {
    let result = super.call("lastDecay", "lastDecay():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastDecay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lastDecay", "lastDecay():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  maxPayout(): BigInt {
    let result = super.call("maxPayout", "maxPayout():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxPayout(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxPayout", "maxPayout():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  payoutFor(_value: BigInt): BigInt {
    let result = super.call("payoutFor", "payoutFor(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);

    return result[0].toBigInt();
  }

  try_payoutFor(_value: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("payoutFor", "payoutFor(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  pendingPayoutFor(_depositor: Address): BigInt {
    let result = super.call(
      "pendingPayoutFor",
      "pendingPayoutFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );

    return result[0].toBigInt();
  }

  try_pendingPayoutFor(_depositor: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pendingPayoutFor",
      "pendingPayoutFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  percentVestedFor(_depositor: Address): BigInt {
    let result = super.call(
      "percentVestedFor",
      "percentVestedFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );

    return result[0].toBigInt();
  }

  try_percentVestedFor(_depositor: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "percentVestedFor",
      "percentVestedFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  policy(): Address {
    let result = super.call("policy", "policy():(address)", []);

    return result[0].toAddress();
  }

  try_policy(): ethereum.CallResult<Address> {
    let result = super.tryCall("policy", "policy():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  principle(): Address {
    let result = super.call("principle", "principle():(address)", []);

    return result[0].toAddress();
  }

  try_principle(): ethereum.CallResult<Address> {
    let result = super.tryCall("principle", "principle():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  recoverLostToken(_token: Address): boolean {
    let result = super.call(
      "recoverLostToken",
      "recoverLostToken(address):(bool)",
      [ethereum.Value.fromAddress(_token)]
    );

    return result[0].toBoolean();
  }

  try_recoverLostToken(_token: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "recoverLostToken",
      "recoverLostToken(address):(bool)",
      [ethereum.Value.fromAddress(_token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  redeem(_recipient: Address, _stake: boolean): BigInt {
    let result = super.call("redeem", "redeem(address,bool):(uint256)", [
      ethereum.Value.fromAddress(_recipient),
      ethereum.Value.fromBoolean(_stake)
    ]);

    return result[0].toBigInt();
  }

  try_redeem(
    _recipient: Address,
    _stake: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall("redeem", "redeem(address,bool):(uint256)", [
      ethereum.Value.fromAddress(_recipient),
      ethereum.Value.fromBoolean(_stake)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  staking(): Address {
    let result = super.call("staking", "staking():(address)", []);

    return result[0].toAddress();
  }

  try_staking(): ethereum.CallResult<Address> {
    let result = super.tryCall("staking", "staking():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  stakingHelper(): Address {
    let result = super.call("stakingHelper", "stakingHelper():(address)", []);

    return result[0].toAddress();
  }

  try_stakingHelper(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "stakingHelper",
      "stakingHelper():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  standardizedDebtRatio(): BigInt {
    let result = super.call(
      "standardizedDebtRatio",
      "standardizedDebtRatio():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_standardizedDebtRatio(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "standardizedDebtRatio",
      "standardizedDebtRatio():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  terms(): BLAZDAIBondV1__termsResult {
    let result = super.call(
      "terms",
      "terms():(uint256,uint256,uint256,uint256,uint256,uint256)",
      []
    );

    return new BLAZDAIBondV1__termsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt()
    );
  }

  try_terms(): ethereum.CallResult<BLAZDAIBondV1__termsResult> {
    let result = super.tryCall(
      "terms",
      "terms():(uint256,uint256,uint256,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BLAZDAIBondV1__termsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt()
      )
    );
  }

  totalDebt(): BigInt {
    let result = super.call("totalDebt", "totalDebt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalDebt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalDebt", "totalDebt():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  treasury(): Address {
    let result = super.call("treasury", "treasury():(address)", []);

    return result[0].toAddress();
  }

  try_treasury(): ethereum.CallResult<Address> {
    let result = super.tryCall("treasury", "treasury():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  useHelper(): boolean {
    let result = super.call("useHelper", "useHelper():(bool)", []);

    return result[0].toBoolean();
  }

  try_useHelper(): ethereum.CallResult<boolean> {
    let result = super.tryCall("useHelper", "useHelper():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _BLAZ(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _principle(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _treasury(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _DAO(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _bondCalculator(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _maxPrice(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _depositor(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class InitializeBondTermsCall extends ethereum.Call {
  get inputs(): InitializeBondTermsCall__Inputs {
    return new InitializeBondTermsCall__Inputs(this);
  }

  get outputs(): InitializeBondTermsCall__Outputs {
    return new InitializeBondTermsCall__Outputs(this);
  }
}

export class InitializeBondTermsCall__Inputs {
  _call: InitializeBondTermsCall;

  constructor(call: InitializeBondTermsCall) {
    this._call = call;
  }

  get _controlVariable(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _vestingTerm(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _minimumPrice(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _maxPayout(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _fee(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _maxDebt(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _initialDebt(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class InitializeBondTermsCall__Outputs {
  _call: InitializeBondTermsCall;

  constructor(call: InitializeBondTermsCall) {
    this._call = call;
  }
}

export class PullManagementCall extends ethereum.Call {
  get inputs(): PullManagementCall__Inputs {
    return new PullManagementCall__Inputs(this);
  }

  get outputs(): PullManagementCall__Outputs {
    return new PullManagementCall__Outputs(this);
  }
}

export class PullManagementCall__Inputs {
  _call: PullManagementCall;

  constructor(call: PullManagementCall) {
    this._call = call;
  }
}

export class PullManagementCall__Outputs {
  _call: PullManagementCall;

  constructor(call: PullManagementCall) {
    this._call = call;
  }
}

export class PushManagementCall extends ethereum.Call {
  get inputs(): PushManagementCall__Inputs {
    return new PushManagementCall__Inputs(this);
  }

  get outputs(): PushManagementCall__Outputs {
    return new PushManagementCall__Outputs(this);
  }
}

export class PushManagementCall__Inputs {
  _call: PushManagementCall;

  constructor(call: PushManagementCall) {
    this._call = call;
  }

  get newOwner_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class PushManagementCall__Outputs {
  _call: PushManagementCall;

  constructor(call: PushManagementCall) {
    this._call = call;
  }
}

export class RecoverLostTokenCall extends ethereum.Call {
  get inputs(): RecoverLostTokenCall__Inputs {
    return new RecoverLostTokenCall__Inputs(this);
  }

  get outputs(): RecoverLostTokenCall__Outputs {
    return new RecoverLostTokenCall__Outputs(this);
  }
}

export class RecoverLostTokenCall__Inputs {
  _call: RecoverLostTokenCall;

  constructor(call: RecoverLostTokenCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RecoverLostTokenCall__Outputs {
  _call: RecoverLostTokenCall;

  constructor(call: RecoverLostTokenCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class RedeemCall extends ethereum.Call {
  get inputs(): RedeemCall__Inputs {
    return new RedeemCall__Inputs(this);
  }

  get outputs(): RedeemCall__Outputs {
    return new RedeemCall__Outputs(this);
  }
}

export class RedeemCall__Inputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }

  get _recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _stake(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class RedeemCall__Outputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceManagementCall extends ethereum.Call {
  get inputs(): RenounceManagementCall__Inputs {
    return new RenounceManagementCall__Inputs(this);
  }

  get outputs(): RenounceManagementCall__Outputs {
    return new RenounceManagementCall__Outputs(this);
  }
}

export class RenounceManagementCall__Inputs {
  _call: RenounceManagementCall;

  constructor(call: RenounceManagementCall) {
    this._call = call;
  }
}

export class RenounceManagementCall__Outputs {
  _call: RenounceManagementCall;

  constructor(call: RenounceManagementCall) {
    this._call = call;
  }
}

export class SetAdjustmentCall extends ethereum.Call {
  get inputs(): SetAdjustmentCall__Inputs {
    return new SetAdjustmentCall__Inputs(this);
  }

  get outputs(): SetAdjustmentCall__Outputs {
    return new SetAdjustmentCall__Outputs(this);
  }
}

export class SetAdjustmentCall__Inputs {
  _call: SetAdjustmentCall;

  constructor(call: SetAdjustmentCall) {
    this._call = call;
  }

  get _addition(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get _increment(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _target(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _buffer(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SetAdjustmentCall__Outputs {
  _call: SetAdjustmentCall;

  constructor(call: SetAdjustmentCall) {
    this._call = call;
  }
}

export class SetBondTermsCall extends ethereum.Call {
  get inputs(): SetBondTermsCall__Inputs {
    return new SetBondTermsCall__Inputs(this);
  }

  get outputs(): SetBondTermsCall__Outputs {
    return new SetBondTermsCall__Outputs(this);
  }
}

export class SetBondTermsCall__Inputs {
  _call: SetBondTermsCall;

  constructor(call: SetBondTermsCall) {
    this._call = call;
  }

  get _parameter(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _input(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetBondTermsCall__Outputs {
  _call: SetBondTermsCall;

  constructor(call: SetBondTermsCall) {
    this._call = call;
  }
}

export class SetStakingCall extends ethereum.Call {
  get inputs(): SetStakingCall__Inputs {
    return new SetStakingCall__Inputs(this);
  }

  get outputs(): SetStakingCall__Outputs {
    return new SetStakingCall__Outputs(this);
  }
}

export class SetStakingCall__Inputs {
  _call: SetStakingCall;

  constructor(call: SetStakingCall) {
    this._call = call;
  }

  get _staking(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _helper(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetStakingCall__Outputs {
  _call: SetStakingCall;

  constructor(call: SetStakingCall) {
    this._call = call;
  }
}
