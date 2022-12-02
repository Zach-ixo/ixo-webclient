import { createQueryClient, ixo, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { fee, RPC_ENDPOINT } from './common'

export const GetProjectAccounts = async (projectDid: string) => {
  try {
    if (RPC_ENDPOINT) {
      const queryClient = await createQueryClient(RPC_ENDPOINT)
      const res = await queryClient.ixo.project.v1.projectAccounts({ projectDid })
      return res?.accountMap?.map
    }
  } catch (e) {
    console.error('GetProjectAccounts', e)
    return undefined
  }
}

export const CreateAgent = async (
  client: SigningStargateClient,
  payload: { did: string; projectDid: string; projectAddress: string; role: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, projectDid, projectAddress, role } = payload
    const message = {
      typeUrl: '/ixo.project.v1.MsgCreateAgent',
      value: ixo.project.v1.MsgCreateAgent.fromPartial({
        txHash: '',
        senderDid: did,
        projectDid,
        data: ixo.project.v1.CreateAgentDoc.fromPartial({ agentDid: did, role }),
        projectAddress,
      }),
    }
    const response: DeliverTxResponse = await client.signAndBroadcast(projectAddress, [message], fee)
    return response
  } catch (e) {
    console.error('CreateAgent', e)
    return undefined
  }
}

export const WithdrawFunds = async (
  client: SigningStargateClient,
  payload: { did: string; address: string; projectDid: string; amount: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, address, projectDid, amount } = payload
    const message = {
      typeUrl: '/ixo.project.v1.MsgWithdrawFunds',
      value: ixo.project.v1.MsgWithdrawFunds.fromPartial({
        senderDid: did,
        data: ixo.project.v1.WithdrawFundsDoc.fromPartial({
          projectDid: projectDid,
          recipientDid: did,
          amount: amount,
          isRefund: true,
        }),
        senderAddress: address,
      }),
    }
    console.info('WithdrawFunds', message)
    const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('WithdrawFunds', e)
    return undefined
  }
}

export const UpdateProjectStatus = async (
  client: SigningStargateClient,
  payload: {
    did: string
    status: 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED'
    projectDid: string
    projectAddress: string
  },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, status, projectDid, projectAddress } = payload
    const message = {
      typeUrl: '/ixo.project.v1.MsgUpdateProjectStatus',
      value: ixo.project.v1.MsgUpdateProjectStatus.fromPartial({
        txHash: '',
        senderDid: did,
        projectDid: projectDid,
        data: ixo.project.v1.UpdateProjectStatusDoc.fromPartial({ status }),
        projectAddress: projectAddress,
      }),
    }
    const response = await client.signAndBroadcast(projectAddress, [message], fee)
    return response
  } catch (e) {
    console.error('UpdateProjectStatus', e)
    return undefined
  }
}