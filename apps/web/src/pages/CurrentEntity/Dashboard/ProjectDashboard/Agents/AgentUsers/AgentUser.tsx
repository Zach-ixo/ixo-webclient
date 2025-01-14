import { DeliverTxResponse } from '@cosmjs/stargate'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetClaimCollection } from 'graphql/claims'
import { useAccount } from 'hooks/account'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GrantEntityAccountClaimsEvaluateAuthz, GrantEntityAccountClaimsSubmitAuthz } from 'lib/protocol/claim'
import { Button } from 'pages/CreateEntity/Components'
import { Avatar } from 'pages/CurrentEntity/Components'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { IAgent } from 'types/agent'
import { AgentRoles } from 'types/models'
import { truncateString } from 'utils/formatters'
import { errorToast, successToast } from 'utils/toast'

const AgentUserCard: React.FC<IAgent & { noAction?: boolean; onClick: () => void }> = ({
  address,
  role,
  noAction,
  onClick,
}) => {
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')
  const { data: claimCollection } = useGetClaimCollection(collectionId)
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { signer } = useAccount()
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAddress = useCurrentEntityAdminAccount(accounts)
  const [granting, setGranting] = useState(false)
  const { execute } = useWallet()
  const agentQuota = useMemo(() => claimCollection?.quota ?? 0, [claimCollection])

  const handleGrant = async () => {
    try {
      setGranting(true)

      if (role === AgentRoles.serviceProviders) {
        const payload = {
          entityDid: entityId,
          name: 'admin',
          adminAddress: adminAddress,
          collectionId,
          granteeAddress: address,
          agentQuota,
          overrideCurretGrants: false,
        }
        const grantEntityAccountClaimSubmitAuthZPayload = await GrantEntityAccountClaimsSubmitAuthz(signer, payload)

        const response = (await execute({ data: grantEntityAccountClaimSubmitAuthZPayload, transactionConfig: { sequence: 1 }})) as unknown as DeliverTxResponse

        if (response.code !== 0) {
          throw response.rawLog
        }
      } else if (role === AgentRoles.evaluators) {
        const payload = {
          entityDid: entityId,
          name: 'admin',
          adminAddress: adminAddress,
          collectionId,
          granteeAddress: address,
          agentQuota,
          overrideCurretGrants: false,
        }
        const grantEntityAccountClaimsEvaluateAuthZPayload = await GrantEntityAccountClaimsEvaluateAuthz(
          signer,
          payload,
        )

        const response = (await execute({ data: grantEntityAccountClaimsEvaluateAuthZPayload, transactionConfig: { sequence: 1 }})) as unknown as DeliverTxResponse

        if (response.code !== 0) {
          throw response.rawLog
        }
      }

      successToast(null, 'Successfully granted!')
    } catch (error: any) {
      console.error('Granting User', error)
      errorToast('Granting User', typeof error === 'string' && error)
    } finally {
      setGranting(false)
    }
  }

  return (
    <FlexBox
      width='300px'
      $direction='column'
      $gap={4}
      p={4}
      $borderRadius='4px'
      border='1px solid #083347'
      background='#01273A'
      cursor='pointer'
      onClick={onClick}
    >
      <FlexBox width='100%' $gap={4} $alignItems='center'>
        <Avatar size={80} />
        <FlexBox $direction='column'>
          <Typography size='lg' weight='bold'>
            {truncateString(address, 16, 'middle')}
          </Typography>
          <Typography size='md'>{role}</Typography>
        </FlexBox>
      </FlexBox>

      {!noAction && (
        <Button variant='secondary' size='md' textTransform='capitalize' onClick={handleGrant} loading={granting}>
          Grant
        </Button>
      )}
    </FlexBox>
  )
}

interface Props {
  title: string
  agents: IAgent[]
  noAction?: boolean
  onClick: (agent: IAgent) => void
}
const AgentUserSection: React.FC<Props> = ({ title, agents, noAction, onClick }) => {
  return (
    <FlexBox width='100%' $direction='column' $gap={6}>
      <FlexBox width='100%'>
        <Typography size='2xl'>{title}</Typography>
      </FlexBox>
      {agents.length > 0 ? (
        <FlexBox width='100%' $gap={6}>
          {agents.map((agent) => (
            <AgentUserCard key={agent.address} {...agent} noAction={noAction} onClick={() => onClick(agent)} />
          ))}
        </FlexBox>
      ) : (
        <FlexBox width='100%' height='100px' $justifyContent='center' $alignItems='center'>
          No Agents
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default AgentUserSection
