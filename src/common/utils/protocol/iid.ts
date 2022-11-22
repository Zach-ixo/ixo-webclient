import { Coin, EncodeObject } from '@cosmjs/proto-signing'
import { DeliverTxResponse } from '@cosmjs/stargate'
import {
  ixo,
  SigningStargateClient,
  createQueryClient,
} from '@ixo/impactxclient-sdk'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { getVerificationMethod, KeyTypes, fee } from './common'

const RPC_ENDPOINT = process.env.REACT_APP_RPC_URL

export const CreateIidDoc = async (
  client: SigningStargateClient,
  { address, did, pubKey },
  keyType: KeyTypes,
): Promise<DeliverTxResponse> => {
  try {
    const verifications = [
      ixo.iid.v1beta1.Verification.fromPartial({
        relationships: ['authentication'],
        method: getVerificationMethod(did, pubKey, did, keyType),
      }),
      ixo.iid.v1beta1.Verification.fromPartial({
        relationships: ['authentication'],
        method: getVerificationMethod(
          `${did}#${address}`,
          pubKey,
          did,
          keyType,
        ),
      }),
    ]

    // if (userToAddToVerifications) {
    //   const eUser = getUser(userToAddToVerifications)
    //   const eUserAccount = (await eUser.getAccounts())[0]
    //   const eUserAddress = eUserAccount.address
    //   const eUserPubKey = eUserAccount.pubkey
    //   const eUserdid = eUser.did

    //   verifications.push(
    //     ixo.iid.Verification.fromPartial({
    //       relationships: ['authentication'],
    //       method: getVerificationMethod(eUserdid, eUserPubKey, eUserdid),
    //     }),
    //   )
    //   verifications.push(
    //     ixo.iid.Verification.fromPartial({
    //       relationships: ['authentication'],
    //       method: getVerificationMethod(
    //         `${eUserdid}#${eUserAddress}`,
    //         eUserPubKey,
    //         eUserdid,
    //       ),
    //     }),
    //   )
    // }

    const message: EncodeObject = {
      typeUrl: '/ixo.iid.v1beta1.MsgCreateIidDocument',
      value: ixo.iid.v1beta1.MsgCreateIidDocument.fromPartial({
        id: did,
        verifications,
        signer: address,
        controllers: [did],
      }),
    }
    const response: DeliverTxResponse = await client.signAndBroadcast(
      address,
      [message],
      fee,
    )
    console.log('CreateIidDoc', 'response', response)
    return response
  } catch (e) {
    console.error('CreateIidDoc', e)
    return undefined
  }
}

export const CheckIidDoc = async (did: string): Promise<IidDocument> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT)
    const { iidDocument } = await client.ixo.iid.v1beta1.iidDocument({
      id: did,
    })
    console.log('CheckIidDoc', iidDocument)
    return iidDocument
  } catch (e) {
    console.error('CheckIidDoc', e)
    return undefined
  }
}

export const GetBalances = async (address: string): Promise<Coin[]> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT)
    const { balances } = await client.cosmos.bank.v1beta1.allBalances({
      address,
    })
    return balances
  } catch (e) {
    console.error('GetBalances', e)
    return []
  }
}

// const getAccountInfo = async (): Promise<{
//   accountNumber?: number
//   sequence?: number
// }> => {
//   try {
//     if (!address) {
//       throw `queryClient is not initialized!`
//     }
//     const { account } = await qc.cosmos.auth.v1beta1.account({ address })
//     const { accountNumber, sequence } = accountFromAny(account)
//     return { accountNumber, sequence }
//   } catch (e) {
//     console.error('getAccountInfo:', e)
//     return {}
//   }
// }
