import { FlexBox, SvgBox } from 'components/App/App.styles'
import React, { useState } from 'react'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import InvestmentCard from './InvestmentCard'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import { deviceWidth } from 'constants/device'
import { NavLink, useHistory } from 'react-router-dom'
import { useQuery } from 'hooks/window'
import { useTheme } from 'styled-components'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as ExclamationIcon } from 'assets/images/icon-exclamation-circle.svg'
import { errorToast } from 'utils/toast'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { CreateCollection } from 'lib/protocol'
import { useAccount } from 'hooks/account'

const ReviewInvestment: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const history = useHistory()
  const { getQuery } = useQuery()
  const success = getQuery('success')

  const { signingClient, signer } = useAccount()
  const {
    entityType,
    profile,
    endDate,
    service: serviceData,
    linkedEntity: linkedEntityData,
    linkedResource: linkedResourceData,
    claim,
    gotoStep,
    gotoStepByNo,
    clearEntity,
  } = useCreateEntityState()
  const { UploadLinkedResource, UploadLinkedClaim, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const [submitting, setSubmitting] = useState(false)

  const handleSignToCreate = async (): Promise<void> => {
    try {
      setSubmitting(true)

      const accordedRight: AccordedRight[] = []
      let service: Service[] = []
      let linkedEntity: LinkedEntity[] = []
      let linkedResource: LinkedResource[] = []
      let linkedClaim: LinkedClaim[] = []

      // AccordedRight

      // Service
      service = serviceData

      // LinkedEntity
      linkedEntity = Object.values(linkedEntityData)

      // LinkedResource
      linkedResource = linkedResource.concat(Object.values(linkedResourceData))
      linkedResource = linkedResource.concat(await UploadLinkedResource())

      // LinkedClaim
      linkedClaim = linkedClaim.concat(await UploadLinkedClaim())

      // Create Protocol for dao
      const protocolDid = await CreateProtocol()
      if (!protocolDid) {
        // eslint-disable-next-line no-throw-literal
        throw 'Error at creating protocol'
      }

      // Create DAO entity
      const { did: entityDid, adminAccount } = await CreateEntityBase(entityType, protocolDid, {
        service,
        linkedResource,
        accordedRight,
        linkedEntity,
        linkedClaim,
        relayerNode: process.env.REACT_APP_RELAYER_NODE,
      })
      if (!entityDid) {
        // eslint-disable-next-line no-throw-literal
        throw 'Create Investment Entity failed'
      }

      // Create Claim Collection
      const claimTemplateIds = Object.values(claim)
        .map((claim) => (claim.template?.id ? claim.template?.id.split('#')[0] : undefined))
        .filter(Boolean) as string[]
      await CreateCollection(
        signingClient,
        signer,
        claimTemplateIds.map((claimTemplateId) => ({
          entityDid,
          protocolDid: claimTemplateId,
          paymentsAccount: adminAccount,
        })),
      )

      history.push({ pathname: history.location.pathname, search: `?success=true` })
    } catch (e) {
      console.error('handleSignToCreate', e)
      errorToast('Error at Signing', typeof e === 'string' && e)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <InvestmentCard
        image={profile?.image ?? ''}
        logo={profile?.logo ?? ''}
        name={profile?.name ?? ''}
        endDate={endDate}
      />
      <FlexBox direction='column' justifyContent='space-between' gap={4} width='100%' style={{ flex: 1 }}>
        {!success && (
          <>
            <FlexBox direction='column' width='100%' gap={4}>
              <Typography variant='secondary'>
                This is the last step before creating this Investment on the ixo Blockchain.
              </Typography>
              <Typography variant='secondary'>
                <NavLink to={'/create/entity/investment/profile'} onClick={() => gotoStepByNo(2)}>
                  Review the Investment details
                </NavLink>{' '}
                you have configured.
              </Typography>
              <Typography variant='secondary'>
                <NavLink to={'/create/entity/investment/instrument'} onClick={() => gotoStepByNo(2)}>
                  View the Investment Instrument/s
                </NavLink>{' '}
                you have programmed.
              </Typography>
              <Typography variant='secondary'>
                <Typography variant='secondary' color='blue'>
                  Confirm the Headline Metric
                </Typography>{' '}
                that will be displayed on the Investment card.
              </Typography>
              <Typography variant='secondary'>
                When you are ready to commit, sign with your DID Account keys, or{' '}
                <Typography variant='secondary' color='black'>
                  connect a different account
                </Typography>{' '}
                as the Investment Creator.
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button variant='secondary' onClick={(): void => gotoStep(-1)} style={{ width: '100%' }}>
                Back
              </Button>
              <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
                Sign To Create
              </Button>
            </FlexBox>
          </>
        )}
        {success === 'true' && (
          <>
            <FlexBox
              direction='column'
              justifyContent='center'
              alignItems='center'
              width='100%'
              height='100%'
              gap={4}
              textAlign='center'
            >
              <SvgBox color={theme.ixoLightGreen} svgWidth={30} svgHeight={30}>
                <CheckCircleIcon />
              </SvgBox>
              <Typography variant='secondary' size='2xl'>
                {profile?.name} Successfully created!
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button
                variant='primary'
                onClick={() => {
                  history.push(`/explore?type=${entityType}`)
                  clearEntity()
                }}
                style={{ width: '100%' }}
              >
                View in the Explorer
              </Button>
            </FlexBox>
          </>
        )}
        {success === 'false' && (
          <>
            <FlexBox
              direction='column'
              justifyContent='center'
              alignItems='center'
              width='100%'
              height='100%'
              gap={4}
              textAlign='center'
            >
              <SvgBox color={theme.ixoDarkOrange} svgWidth={30} svgHeight={30}>
                <ExclamationIcon />
              </SvgBox>
              <Typography variant='secondary' size='2xl'>
                Something went wrong. Please try again.
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button variant='secondary' onClick={() => history.goBack()} style={{ width: '100%' }}>
                Back
              </Button>
              <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
                Sign To Create
              </Button>
            </FlexBox>
          </>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewInvestment
