import {
  ArrayOfAddr,
  Config,
  Cw20BalanceResponse,
  ProposalModuleCountResponse,
} from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { Config as PreProposeConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { Config as ProposalConfig, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Member, Proposal } from 'types/dao'

export type DaoGroup = {
  coreAddress: string
  type: string //  'membership' || 'staking'
  admin: string
  config: Config
  proposalModule: {
    proposalModuleAddress: string
    preProposalContractAddress: string
    proposalModuleCount: ProposalModuleCountResponse
    proposals: Proposal[]
    preProposeConfig: PreProposeConfig
    proposalConfig: ProposalConfig
    votes: VoteInfo[]
  }
  votingModule: {
    votingModuleAddress: string
    contractCodeId: number
    contractName: string //  'dao_voting_cw20_staked' || 'dao_voting_cw4'

    members: Member[]
    totalWeight: number
  }
  treasury: {
    cw20Balances: Cw20BalanceResponse
    cw20TokenList: ArrayOfAddr
    cw721TokenList: ArrayOfAddr
  }
  storageItems: string[]
  selected?: boolean
}

export type CurrentDao = {
  [coreAddress: string]: DaoGroup
}

export enum CurrentDaoActions {
  UpdateGroup = 'ixo/CurrentDao/UPDATE_DAO_GROUP',
  ClearGroup = 'ixo/CurrentDao/CLEAR_DAO_GROUP',
  SelectGroup = 'ixo/CurrentDao/SELECT_DAO_GROUP',
}

export interface UpdateDaoGroupAction {
  type: typeof CurrentDaoActions.UpdateGroup
  payload: DaoGroup
}

export interface ClearDaoGroupAction {
  type: typeof CurrentDaoActions.ClearGroup
}

export interface SelectDaoGroupAction {
  type: typeof CurrentDaoActions.SelectGroup
  payload: { address: string; multi: boolean }
}

export type CurrentDaoActionTypes = UpdateDaoGroupAction | ClearDaoGroupAction | SelectDaoGroupAction