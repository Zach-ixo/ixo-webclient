import { Box } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { ReactComponent as EntityIcon } from 'assets/images/icon-entity.svg'
import { ReactComponent as CreatorIcon } from 'assets/images/icon-creator.svg'
import { PageWrapper, Selections, SearchIcon } from './SelectCreationProcess.styles'
import { Button, CateSelector, ChainSelector, Input } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { apiEntityToEntity } from 'utils/entities'
import { useTheme } from 'styled-components'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useAppSelector } from 'redux/hooks'
import { selectRelayerByChainId } from 'redux/configs/configs.selectors'
import { useGetEntityById } from 'graphql/entities'

const SelectCreationProcess: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const SearchInputStyles = {
    fontFamily: theme.secondaryFontFamily,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28,
  }
  const {
    gotoStep,
    updateProfile,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedEntity,
    updateLinkedResource,
    updateStartEndDate,
  } = useCreateEntityState()
  const [isClone, setIsClone] = useState(false)
  const [existingDid, setExistingDid] = useState('')
  const [chainId, setChainId] = useState(undefined)
  const { data: selectedEntity } = useGetEntityById(existingDid)

  const relayer = useAppSelector(selectRelayerByChainId(chainId!))

  const canClone = useMemo(() => chainId && selectedEntity?.type === 'dao', [chainId, selectedEntity])

  const handleCreate = (): void => {
    gotoStep(1)
  }

  const handleClone = (): void => {
    apiEntityToEntity({ entity: selectedEntity }, (key: string, value: any, merge) => {
      switch (key) {
        case 'profile':
          updateProfile(value)
          break
        case 'creator':
          updateCreator(value)
          break
        case 'administrator':
          updateAdministrator(value)
          break
        case 'page':
          updatePage(value)
          break
        case 'tags':
          updateDDOTags(value)
          break
        case 'service':
          updateService(value)
          break
        case 'linkedEntity':
          updateLinkedEntity(value)
          break
        case 'linkedResource':
          updateLinkedResource(
            value.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type)),
          )
          break
        default:
          break
      }
    })
    // additional
    updateStartEndDate({ startDate: selectedEntity.startDate, endDate: selectedEntity.endDate })
    gotoStep(1)
  }

  return (
    <PageWrapper>
      <Selections>
        <CateSelector icon={<CreatorIcon />} label='Create a New Entity' onClick={handleCreate} />
        <CateSelector
          icon={<EntityIcon />}
          label='Clone an Existing Entity'
          active={isClone}
          onClick={(): void => setIsClone((pre) => !pre)}
        />
      </Selections>

      {isClone && (
        <Box className='d-flex align-items-center' style={{ gap: 16 }}>
          <ChainSelector chainId={chainId!} onChange={setChainId as any} />
          <Input
            inputValue={existingDid}
            handleChange={setExistingDid}
            placeholder='Type to Search or enter a DID'
            preIcon={<SearchIcon />}
            width='400px'
            height='48px'
            style={SearchInputStyles}
          />
          <Button onClick={handleClone} disabled={!canClone}>
            Continue
          </Button>
        </Box>
      )}
    </PageWrapper>
  )
}

export default SelectCreationProcess
