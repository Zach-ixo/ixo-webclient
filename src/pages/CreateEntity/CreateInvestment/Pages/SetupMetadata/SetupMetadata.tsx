import { Box } from 'components/App/App.styles'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { InvestmentProfileForm, EntityAdditionalInfoForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { TInvestmentMetadataModel } from 'types/protocol'

const SetupMetadata: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const { entityType, gotoStep, updateMetadata } = createEntityState
  const metadata: TInvestmentMetadataModel = createEntityState.metadata as TInvestmentMetadataModel

  const canSubmit = true

  const handlePrev = (): void => {
    gotoStep(-1)
  }
  const handleNext = (): void => {
    gotoStep(1)
  }

  const handleUpdateMetadata = (key: string, value: any): void => {
    updateMetadata({
      ...metadata,
      [key]: value,
    })
  }

  return (
    <PageWrapper>
      <Box className='d-flex flex-column'>
        {/* <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={localisation} setLocalisation={updateLocalisation} />
        </Box> */}
        <Box className='mb-2' />
        <InvestmentProfileForm
          image={metadata?.image}
          setImage={(image: string): void => handleUpdateMetadata('image', image)}
          logo={metadata?.icon}
          setLogo={(icon: string): void => handleUpdateMetadata('icon', icon)}
          name={metadata?.name}
          setName={(name: string): void => handleUpdateMetadata('name', name)}
          orgName={metadata?.orgName}
          setOrgName={(orgName: string): void => handleUpdateMetadata('orgName', orgName)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
        <EntityAdditionalInfoForm
          entityType={entityType}
          description={metadata?.description ?? ''}
          setDescription={(description): void => handleUpdateMetadata('description', description)}
          brand={metadata?.brand ?? ''}
          setBrand={(brand): void => handleUpdateMetadata('brand', brand)}
          location={metadata?.location ?? ''}
          setLocation={(location): void => handleUpdateMetadata('location', location)}
          metrics={metadata?.metrics ?? []}
          setMetrics={(metrics): void => handleUpdateMetadata('metrics', metrics)}
          attributes={metadata?.attributes ?? []}
          setAttributes={(attributes): void => handleUpdateMetadata('attributes', attributes)}
          startDate={metadata?.startDate ?? ''}
          endDate={metadata?.endDate ?? ''}
          setStartEndDate={(startDate, endDate) => {
            updateMetadata({
              ...metadata,
              startDate,
              endDate,
            })
          }}
        />

        <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button size='full' height={48} variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default SetupMetadata
