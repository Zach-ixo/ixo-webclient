import { Box } from 'components/App/App.styles'
import React, { useEffect, useMemo } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { EntityAdditionalInfoForm, DeedProfileForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { TEntityMetadataModel } from 'types/entities'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { selectAllDeedProtocols } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { useQuery } from 'hooks/window'
import { EDeedType } from 'types/protocol'

const SetupMetadata: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const history = useHistory()
  const baseLink = match.path.split('/').slice(0, -1).join('/')

  const { getQuery } = useQuery()
  const type = getQuery('type')

  const deedProtocols = useAppSelector(selectAllDeedProtocols)
  const createEntityState = useCreateEntityState()
  const { entityType, startDate, endDate, updateProfile, updateStartEndDate, clearEntity } = createEntityState
  const profile: TEntityMetadataModel = createEntityState.profile as TEntityMetadataModel

  const deedNameFound = useMemo(
    () => deedProtocols.some((entity) => entity.profile?.name === profile?.name),
    [deedProtocols, profile?.name],
  )

  const canSubmit = useMemo(
    () => !!profile && !!profile.type && !!profile.name && !!profile.description && !deedNameFound,
    [profile, deedNameFound],
  )

  useEffect(() => {
    if (type === 'offer') {
      clearEntity()
      setTimeout(() => {
        handleUpdateProfile('type', EDeedType.Offer)
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const handlePrev = (): void => {
    history.push(`${baseLink}/process`)
  }
  const handleNext = (): void => {
    history.push(`${baseLink}/collection`)
  }

  const handleUpdateProfile = (key: string, value: any): void => {
    updateProfile({
      ...profile,
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
        <DeedProfileForm
          type={profile?.type ?? ''}
          setType={(type: string): void => handleUpdateProfile('type', type)}
          title={profile?.name ?? ''}
          setTitle={(name: string): void => handleUpdateProfile('name', name)}
          description={profile?.description ?? ''}
          error={{
            title: profile?.name && deedNameFound ? 'Duplicated Name' : '',
          }}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <EntityAdditionalInfoForm
            entityType={entityType}
            description={profile?.description ?? ''}
            setDescription={(description): void => handleUpdateProfile('description', description)}
            brand={profile?.brand ?? ''}
            setBrand={(brand): void => handleUpdateProfile('brand', brand)}
            location={profile?.location ?? ''}
            setLocation={(location): void => handleUpdateProfile('location', location)}
            metrics={profile?.metrics ?? []}
            setMetrics={(metrics): void => handleUpdateProfile('metrics', metrics)}
            attributes={profile?.attributes ?? []}
            setAttributes={(attributes): void => handleUpdateProfile('attributes', attributes)}
            startDate={startDate}
            endDate={endDate}
            setStartEndDate={(startDate, endDate) => {
              updateStartEndDate({
                startDate,
                endDate,
              })
            }}
          />
        </Box>

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
