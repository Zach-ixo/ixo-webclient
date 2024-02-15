import { Coin } from "@cosmjs/proto-signing"
import { StdFee } from "@cosmjs/stargate"
import { cosmwasm } from "@ixo/impactxclient-sdk"
import { Vote } from "@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types"
import { CosmosMsgForEmpty } from "types/dao"
import { strToArray } from "utils/encoding"

type DaoPreProposeSingleVoteProps = {
    proposalId: string
    rationale?: string
    vote: Vote
}


type DaoPreProposeSingleProposeProps = {
    description: string
    deedDid: string
    msgs: CosmosMsgForEmpty[]
    title: string
}

export class DaoPreProposeSingle {
    contractAddress: string
    senderAddress: string

    constructor(contractAddress: string, senderAddress: string) {
        this.contractAddress = contractAddress
        this.senderAddress = senderAddress
    }

    private formatMessage(msg: string, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const message = {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
                contract: this.contractAddress,
                funds,
                msg: strToArray(msg),
                sender: this.senderAddress,
            }),
        }
        return { messages: [message], fee, memo }
    }
    vote({ proposalId, rationale, vote }: DaoPreProposeSingleVoteProps, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const messageObject = {
            vote: {
                proposal_id: proposalId, rationale, vote
            }
        }
        return this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)
    }

    propose({ description, deedDid, msgs, title }: DaoPreProposeSingleProposeProps, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const messageObject = {
            propose: {
                msg: {
                    propose: {
                        description: (description || '') + `#deed:${deedDid}`,
                        msgs,
                        title
                    }
                }
            }
        }
        return this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)
    }
}
