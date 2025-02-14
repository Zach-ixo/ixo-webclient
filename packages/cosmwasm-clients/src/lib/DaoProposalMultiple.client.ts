/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { Duration, PreProposeInfo, VotingStrategy, Uint64, MultipleChoiceOptions, Coin, MultipleChoiceVote, Addr, Config, VoteResponse, InfoResponse, ProposalListResponse, ProposalResponse, VoteListResponse, ProposalCreationPolicy, HooksResponse } from "./DaoProposalMultiple.types";
import { BaseClient, DeliverTxResponse } from "./Base.client";
export interface DaoProposalMultipleReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<Config>;
  proposal: ({
    proposalId
  }: {
    proposalId: number;
  }) => Promise<ProposalResponse>;
  listProposals: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: number;
  }) => Promise<ProposalListResponse>;
  reverseProposals: ({
    limit,
    startBefore
  }: {
    limit?: number;
    startBefore?: number;
  }) => Promise<ProposalListResponse>;
  getVote: ({
    proposalId,
    voter
  }: {
    proposalId: number;
    voter: string;
  }) => Promise<VoteResponse>;
  listVotes: ({
    limit,
    proposalId,
    startAfter
  }: {
    limit?: number;
    proposalId: number;
    startAfter?: string;
  }) => Promise<VoteListResponse>;
  proposalCount: () => Promise<Uint64>;
  proposalCreationPolicy: () => Promise<ProposalCreationPolicy>;
  proposalHooks: () => Promise<HooksResponse>;
  voteHooks: () => Promise<HooksResponse>;
  dao: () => Promise<Addr>;
  info: () => Promise<InfoResponse>;
  nextProposalId: () => Promise<Uint64>;
}
export interface DaoProposalMultipleInterface extends DaoProposalMultipleReadOnlyInterface {
  contractAddress: string;
  sender: string;
  propose: ({
    choices,
    description,
    proposer,
    title
  }: {
    choices: MultipleChoiceOptions;
    description: string;
    proposer?: string;
    title: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  vote: ({
    proposalId,
    rationale,
    vote
  }: {
    proposalId: number;
    rationale?: string;
    vote: MultipleChoiceVote;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  execute: ({
    proposalId
  }: {
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  close: ({
    proposalId
  }: {
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    allowRevoting,
    closeProposalOnExecutionFailure,
    dao,
    maxVotingPeriod,
    minVotingPeriod,
    onlyMembersExecute,
    votingStrategy
  }: {
    allowRevoting: boolean;
    closeProposalOnExecutionFailure: boolean;
    dao: string;
    maxVotingPeriod: Duration;
    minVotingPeriod?: Duration;
    onlyMembersExecute: boolean;
    votingStrategy: VotingStrategy;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateRationale: ({
    proposalId,
    rationale
  }: {
    proposalId: number;
    rationale?: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updatePreProposeInfo: ({
    info
  }: {
    info: PreProposeInfo;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  addProposalHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  removeProposalHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  addVoteHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  removeVoteHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class DaoProposalMultipleClient extends BaseClient {
  sender: string;
  contractAddress: string;

  constructor(execute: any, sender: string, contractAddress: string) {
    super(execute);
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.propose = this.propose.bind(this);
    this.vote = this.vote.bind(this);
    this.execute = this.execute.bind(this);
    this.close = this.close.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.updateRationale = this.updateRationale.bind(this);
    this.updatePreProposeInfo = this.updatePreProposeInfo.bind(this);
    this.addProposalHook = this.addProposalHook.bind(this);
    this.removeProposalHook = this.removeProposalHook.bind(this);
    this.addVoteHook = this.addVoteHook.bind(this);
    this.removeVoteHook = this.removeVoteHook.bind(this);
  }

  propose = async ({
    choices,
    description,
    proposer,
    title
  }: {
    choices: MultipleChoiceOptions;
    description: string;
    proposer?: string;
    title: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      propose: {
        choices,
        description,
        proposer,
        title
      }
    }, fee, memo, funds);
  };
  vote = async ({
    proposalId,
    rationale,
    vote
  }: {
    proposalId: number;
    rationale?: string;
    vote: MultipleChoiceVote;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      vote: {
        proposal_id: proposalId,
        rationale,
        vote
      }
    }, fee, memo, funds);
  };
  executeProposal = async ({
    proposalId
  }: {
    proposalId: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      execute: {
        proposal_id: proposalId
      }
    }, fee, memo, funds);
  };
  close = async ({
    proposalId
  }: {
    proposalId: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      close: {
        proposal_id: proposalId
      }
    }, fee, memo, funds);
  };
  updateConfig = async ({
    allowRevoting,
    closeProposalOnExecutionFailure,
    dao,
    maxVotingPeriod,
    minVotingPeriod,
    onlyMembersExecute,
    votingStrategy
  }: {
    allowRevoting: boolean;
    closeProposalOnExecutionFailure: boolean;
    dao: string;
    maxVotingPeriod: Duration;
    minVotingPeriod?: Duration;
    onlyMembersExecute: boolean;
    votingStrategy: VotingStrategy;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_config: {
        allow_revoting: allowRevoting,
        close_proposal_on_execution_failure: closeProposalOnExecutionFailure,
        dao,
        max_voting_period: maxVotingPeriod,
        min_voting_period: minVotingPeriod,
        only_members_execute: onlyMembersExecute,
        voting_strategy: votingStrategy
      }
    }, fee, memo, funds);
  };
  updateRationale = async ({
    proposalId,
    rationale
  }: {
    proposalId: number;
    rationale?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_rationale: {
        proposal_id: proposalId,
        rationale
      }
    }, fee, memo, funds);
  };
  updatePreProposeInfo = async ({
    info
  }: {
    info: PreProposeInfo;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_pre_propose_info: {
        info
      }
    }, fee, memo, funds);
  };
  addProposalHook = async ({
    address
  }: {
    address: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      add_proposal_hook: {
        address
      }
    }, fee, memo, funds);
  };
  removeProposalHook = async ({
    address
  }: {
    address: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      remove_proposal_hook: {
        address
      }
    }, fee, memo, funds);
  };
  addVoteHook = async ({
    address
  }: {
    address: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      add_vote_hook: {
        address
      }
    }, fee, memo, funds);
  };
  removeVoteHook = async ({
    address
  }: {
    address: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      remove_vote_hook: {
        address
      }
    }, fee, memo, funds);
  };
}