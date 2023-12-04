import React, { useContext, useEffect } from 'react'
// import Long from 'long'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import GovernanceTable, { GovernanceTableRow } from './Components/GovernanceTable'
import { Container, SectionTitleContainer, SectionTitle, ActionButton } from '../EntityEconomy.styles'
import GovernanceProposal from './Components/GovernanceProposal'
import { getProposals, getProposers } from 'redux/entityEconomy/entityEconomy.actions'
import { ProposalStatus, ProposalsType } from 'redux/entityEconomy/entityEconomy.types'
// import { MsgSubmitProposal } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
// import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
// import { Any } from 'cosmjs-types/google/protobuf/any'
import { selectGovernanceProposals, selectVotingPeriodProposals } from 'redux/entityEconomy/entityEconomy.selectors'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'

const EconomyGovernance: React.FunctionComponent = () => {
  const { isDark } = useContext(DashboardThemeContext)
  const dispatch = useAppDispatch()
  const governanceProposals = useAppSelector(selectGovernanceProposals)
  const votingPeriodProposals = useAppSelector(selectVotingPeriodProposals)

  useEffect(() => {
    dispatch(getProposals() as any)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (governanceProposals.length > 0) {
      dispatch(getProposers(governanceProposals.map((proposal: ProposalsType) => proposal.proposalId)) as any)
    }
    // eslint-disable-next-line
  }, [governanceProposals])

  const calcPercentage = (limit: number, value: number): number => {
    if (!limit) return 0
    return Number(((value / limit) * 100).toFixed(0))
  }

  const mapToGovernanceTable = (proposals: ProposalsType[]): GovernanceTableRow[] => {
    return proposals.map((proposal: ProposalsType): GovernanceTableRow => {
      const { status, tally, proposalId, submitTime, content } = proposal

      let result = ''
      switch (status) {
        case ProposalStatus.PROPOSAL_STATUS_PASSED:
          result += `Passed (${calcPercentage(tally.available - tally.abstain, tally.yes)})`
          break
        case ProposalStatus.PROPOSAL_STATUS_FAILED:
          result += `Failed (${calcPercentage(tally.available - tally.abstain, tally.yes)})`
          break
        case ProposalStatus.PROPOSAL_STATUS_REJECTED:
          result += `Vetoed (${calcPercentage(tally.available - tally.abstain, tally.noWithVeto)})`
          break
        case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
          result += `No Quorum`
          break
        case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
          result += 'Deposit Period'
          break
        case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
          result += 'Voting Period'
          break
        default:
          break
      }
      const vote = `${tally.yes} Yes / ${tally.no} No / ${tally.noWithVeto} Veto`
      return {
        proposalId: '#' + proposalId,
        date: submitTime,
        result,
        description: content.description,
        vote,
        type: content['@type'].split('.').pop(),
      } as any
    })
  }

  const handleNewProposal = (): void => {
    // const coreAddress = 'asdfasdf'
    // history.push(`/create/entity/${entityId}/proposal/${coreAddress}/info`)
  }

  /**
   * @deprecated
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNewProposalOld = async (): Promise<void> => {
    // // const type = 'TextProposal' // 'ParameterChangeProposal'
    // const title = 'Set base network inflation at 20%'
    // const description =
    //   'The Impact Hub is a bonded Proof of Stake (bPoS) network with bonding denominated in IXO tokens. A higher bonded ratio of IXO tokens, relative to total supply, increases the network security. Inflation in the token supply provides the incentive for del'
    // // const changes = [
    // //   {
    // //     subspace: 'mint',
    // //     key: 'InflationMax',
    // //     value: '"0.200000000000000000"',
    // //   },
    // //   {
    // //     subspace: 'mint',
    // //     key: 'InflationMin',
    // //     value: '"0.070000000000000000"',
    // //   },
    // //   {
    // //     subspace: 'mint',
    // //     key: 'InflationRateChange',
    // //     value: '"0.130000000000000000"',
    // //   },
    // // ]
    // try {
    //   const [accounts, offlineSigner] = await keplr.connectAccount()
    //   const address = accounts[0].address
    //   const client = await keplr.initStargateClient(offlineSigner)
    //   const payload = {
    //     msgAny: {
    //       typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
    //       value: MsgSubmitProposal.fromPartial({
    //         content: Any.fromPartial({
    //           typeUrl: '/cosmos.gov.v1beta1.TextProposal',
    //           value: TextProposal.encode(
    //             TextProposal.fromPartial({
    //               title: title,
    //               description: description,
    //             }),
    //           ).finish(),
    //         }),
    //         initialDeposit: [
    //           {
    //             amount: '1000000',
    //             denom: 'uixo',
    //           },
    //         ],
    //         proposer: address,
    //       }),
    //     },
    //     chain_id: process.env.REACT_APP_CHAIN_ID,
    //     fee: {
    //       amount: [{ amount: String(5000), denom: 'uixo' }],
    //       gas: String(200000),
    //     },
    //     memo: '',
    //   }
    //   try {
    //     const result = await keplr.sendTransaction(client, address, payload)
    //     if (result) {
    //       Toast.successToast(null, `Transaction Successful`)
    //     } else {
    //       Toast.errorToast(null, `Transaction Failed`)
    //     }
    //   } catch (e) {
    //     Toast.errorToast(null, `Transaction Failed`)
    //     throw e
    //   }
    // } catch (e) {
    // }
  }

  /**
   * @deprecated
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleVoteOld = async (proposalId: string, answer: number): Promise<void> => {
    // try {
    //   const [accounts, offlineSigner] = await keplr.connectAccount()
    //   const address = accounts[0].address
    //   const client = await keplr.initStargateClient(offlineSigner)
    //   const payload = {
    //     msgAny: {
    //       typeUrl: '/cosmos.gov.v1beta1.MsgVote',
    //       value: MsgVote.fromPartial({
    //         proposalId: Long.fromString(proposalId),
    //         voter: address,
    //         option: answer,
    //       }),
    //     },
    //     chain_id: process.env.REACT_APP_CHAIN_ID,
    //     fee: {
    //       amount: [{ amount: String(5000), denom: 'uixo' }],
    //       gas: String(200000),
    //     },
    //     memo: '',
    //   }
    //   try {
    //     const result = await keplr.sendTransaction(client, address, payload)
    //     if (result) {
    //       Toast.successToast(null, `Transaction Successful`)
    //     } else {
    //       Toast.errorToast(null, `Transaction Failed`)
    //     }
    //   } catch (e) {
    //     Toast.errorToast(null, `Transaction Failed`)
    //     throw e
    //   }
    // } catch (e) {
    // }
  }

  const handleVote = async (proposalId: string, answer: number): Promise<void> => {
    return
  }

  return (
    <Container isDark={isDark}>
      <SectionTitleContainer>
        <SectionTitle>Current Governance Proposals</SectionTitle>
        <ActionButton onClick={handleNewProposal}>New Proposal</ActionButton>
      </SectionTitleContainer>

      {votingPeriodProposals.length > 0 &&
        votingPeriodProposals.map((proposal: ProposalsType, i: number) => (
          <GovernanceProposal
            key={i}
            proposalId={proposal.proposalId}
            type={proposal.content['@type'].split('.').pop()!}
            announce={proposal.content.title}
            proposedBy={proposal.proposer}
            submissionDate={proposal.submitTime}
            closeDate={proposal.DepositEndTime}
            tally={proposal.tally}
            totalDeposit={proposal.totalDeposit[0]}
            status={'open'}
            // status={proposal.status}
            handleVote={handleVote}
          />
        ))}

      {votingPeriodProposals.length > 0 && (
        <>
          <SectionTitleContainer>
            <SectionTitle>Past Governance Proposals</SectionTitle>
          </SectionTitleContainer>
          <GovernanceTable data={mapToGovernanceTable(votingPeriodProposals)} />
        </>
      )}
    </Container>
  )
}

export default EconomyGovernance
