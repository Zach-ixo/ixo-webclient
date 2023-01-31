import { FlexBox, theme } from 'components/App/App.styles'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { TInvestmentMetadataModel } from 'types/protocol'
import InvestmentCard from './InvestmentCard'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'

const ReviewInvestment: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const metadata: TInvestmentMetadataModel = createEntityState.metadata as TInvestmentMetadataModel
  const { gotoStep } = createEntityState

  const handleSignToCreate = async (): Promise<void> => {
    //
  }

  return (
    <FlexBox width={`${theme.breakpoints.md}px`} gap={10} alignItems='stretch'>
      <InvestmentCard
        image={metadata?.image ?? ''}
        icon={metadata?.icon ?? ''}
        name={metadata?.name ?? ''}
        endDate={metadata?.endDate ?? ''}
      />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary'>
            This is the last step before creating this Investment on the ixo Blockchain.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Review the Investment details
            </Typography>{' '}
            you have configured.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              View the Investment Instrument/s
            </Typography>{' '}
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
            <Typography variant='secondary' color='blue'>
              connect a different account
            </Typography>{' '}
            as the Investment Creator.
          </Typography>
        </FlexBox>
        <FlexBox width='100%' gap={4}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)} style={{ width: '100%' }}>
            Back
          </Button>
          <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }}>
            Sign To Create
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewInvestment