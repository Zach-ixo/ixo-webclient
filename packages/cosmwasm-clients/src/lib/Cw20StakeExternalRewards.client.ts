/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {  Uint128, Binary, PendingRewardsResponse, InfoResponse, OwnershipForAddr } from "./Cw20StakeExternalRewards.types";
import { BaseClient, DeliverTxResponse } from "./Base.client";
export interface Cw20StakeExternalRewardsReadOnlyInterface {
  contractAddress: string;
  info: () => Promise<InfoResponse>;
  getPendingRewards: ({
    address
  }: {
    address: string;
  }) => Promise<PendingRewardsResponse>;
  ownership: () => Promise<OwnershipForAddr>;
}

export interface Cw20StakeExternalRewardsInterface extends Cw20StakeExternalRewardsReadOnlyInterface {
  contractAddress: string;
  sender: string;
  stakeChangeHook: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  claim: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  receive: ({
    amount,
    msg,
    sender
  }: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  fund: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateRewardDuration: ({
    newDuration
  }: {
    newDuration: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateOwnership: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class Cw20StakeExternalRewardsClient extends BaseClient {
  sender: string;
  contractAddress: string;

  constructor(execute: any, sender: string, contractAddress: string) {
    super(execute);
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.stakeChangeHook = this.stakeChangeHook.bind(this);
    this.claim = this.claim.bind(this);
    this.receive = this.receive.bind(this);
    this.fund = this.fund.bind(this);
    this.updateRewardDuration = this.updateRewardDuration.bind(this);
    this.updateOwnership = this.updateOwnership.bind(this);
  }

  stakeChangeHook = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      stake_change_hook: {}
    }, fee, memo, funds);
  };
  claim = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      claim: {}
    }, fee, memo, funds);
  };
  receive = async ({
    amount,
    msg,
    sender
  }: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      receive: {
        amount,
        msg,
        sender
      }
    }, fee, memo, funds);
  };
  fund = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      fund: {}
    }, fee, memo, funds);
  };
  updateRewardDuration = async ({
    newDuration
  }: {
    newDuration: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_reward_duration: {
        new_duration: newDuration
      }
    }, fee, memo, funds);
  };
  updateOwnership = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_ownership: {}
    }, fee, memo, funds);
  };
}