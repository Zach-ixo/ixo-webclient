/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Duration, Uint128, ClaimsResponse, Addr, Config, InfoResponse, ListStakersResponse, TotalPowerAtHeightResponse, VotingPowerAtHeightResponse } from "./DaoVotingNativeStaked.types";
import { BaseClient, DeliverTxResponse } from "./Base.client";
export interface DaoVotingNativeStakedReadOnlyInterface {
  contractAddress: string;
  getConfig: () => Promise<Config>;
  claims: ({
    address
  }: {
    address: string;
  }) => Promise<ClaimsResponse>;
  listStakers: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: string;
  }) => Promise<ListStakersResponse>;
  votingPowerAtHeight: ({
    address,
    height
  }: {
    address: string;
    height?: number;
  }) => Promise<VotingPowerAtHeightResponse>;
  totalPowerAtHeight: ({
    height
  }: {
    height?: number;
  }) => Promise<TotalPowerAtHeightResponse>;
  dao: () => Promise<Addr>;
  info: () => Promise<InfoResponse>;
}
export interface DaoVotingNativeStakedInterface extends DaoVotingNativeStakedReadOnlyInterface {
  contractAddress: string;
  sender: string;
  stake: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  unstake: ({
    amount
  }: {
    amount: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    duration,
    manager,
    owner
  }: {
    duration?: Duration;
    manager?: string;
    owner?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  claim: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class DaoVotingNativeStakedClient extends BaseClient {
  sender: string;
  contractAddress: string;

  constructor(execute: any, sender: string, contractAddress: string) {
    super(execute);
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.stake = this.stake.bind(this);
    this.unstake = this.unstake.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.claim = this.claim.bind(this);
  }

  stake = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      stake: {}
    }, fee, memo, funds);
  };
  unstake = async ({
    amount
  }: {
    amount: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      unstake: {
        amount
      }
    }, fee, memo, funds);
  };
  updateConfig = async ({
    duration,
    manager,
    owner
  }: {
    duration?: Duration;
    manager?: string;
    owner?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_config: {
        duration,
        manager,
        owner
      }
    }, fee, memo, funds);
  };
  claim = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      claim: {}
    }, fee, memo, funds);
  };
}