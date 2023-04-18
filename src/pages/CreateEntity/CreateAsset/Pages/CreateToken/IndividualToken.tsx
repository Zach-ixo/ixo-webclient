// TODO: review all below

import {
  AddLinkedResourceModal,
  AddSettingsModal,
  CreatorSetupModal,
  LinkedResourceSetupModal,
  LiquiditySetupModal,
  PaymentsSetupModal,
  ServiceSetupModal,
} from 'components/Modals'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { Box, theme } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { TCreateEntityModel } from 'redux/createEntity/createEntity.types'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import {
  EntityLinkedResourceConfig,
  EntitySettingsConfig,
  TAssetMetadataModel,
  TEntityLinkedResourceModel,
  TEntityLiquidityModel,
  TEntityPaymentModel,
} from 'types/protocol'
import {
  LocalisationForm,
  EntityAttributesForm,
  TokenProfileForm,
  EntityDescriptionForm,
  EntityMetricsForm,
} from '../../../Forms'
import { Badge, PropertyBox, PropertyBoxWrapper } from '../../../Forms/PropertiesForm/PropertiesForm.styles'
import { Wrapper, Row } from './IndividualToken.styles'
import { SetupPageContent } from '../../../Forms/PropertiesForm/SetupPageContent'
import { Typography } from 'components/Typography'

interface Props {
  SN: number
  token: TCreateEntityModel
  goBack: () => void
}

const IndividualToken: React.FC<Props> = ({ SN, token, goBack }): JSX.Element => {
  const { entityType, updateAssetInstance } = useCreateEntityState()
  const [localisation, setLocalisation] = useState(token.localisation)
  const [metadata, setMetadata] = useState<TAssetMetadataModel>(token.metadata as TAssetMetadataModel)
  const [entitySettings, setEntitySettings] = useState<{
    [key: string]: any
  }>(EntitySettingsConfig)
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: TEntityLinkedResourceModel
  }>({})
  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  // const [claims, setClaims] = useState(token.claims)

  const [metaView, setMetaView] = useState<'description' | 'metrics' | 'attributes'>('description')
  const [propertyView, setPropertyView] = useState<string>('Settings')

  useEffect(() => {
    if (token.creator) {
      setEntitySettings((settings) => ({
        ...settings,
        creator: { ...settings.creator, data: token.creator },
      }))
    }
    if (token.administrator) {
      setEntitySettings((settings) => ({
        ...settings,
        administrator: { ...settings.administrator, data: token.administrator },
      }))
    }
    if (token.page) {
      setEntitySettings((settings) => ({
        ...settings,
        page: { ...settings.page, data: token.page },
      }))
    }
    if (token.service) {
      setEntitySettings((settings) => ({
        ...settings,
        service: { ...settings.service, data: token.service },
      }))
    }
    // if (token.payments && token.payments.length > 0) {
    //   setEntitySettings((settings) => ({
    //     ...settings,
    //     payments: { ...settings.payments, data: token.payments, set: true },
    //   }))
    // }
    // if (token.liquidity && token.liquidity.length > 0) {
    //   setEntitySettings((settings) => ({
    //     ...settings,
    //     liquidity: { ...settings.liquidity, data: token.liquidity, set: true },
    //   }))
    // }
    if (Object.values(token.linkedResource).length > 0) {
      setEntityLinkedResource(token.linkedResource)
    }
  }, [token])

  // popups
  const handleOpenEntitySettingModal = (key: string, open: boolean): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  const handleOpenEntityLinkedResourceModal = (key: string, open: boolean): void => {
    setEntityLinkedResource((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }

  // entity settings
  const handleAddEntitySetting = (key: string): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: true,
      },
    }))
  }
  const handleUpdateEntitySetting = (key: string, data: any): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        data,
      },
    }))
  }
  const handleRemoveEntitySetting = (key: string): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: false,
        data: undefined,
      },
    }))
  }
  // entity linked resources
  const handleAddEntityLinkedResource = (type: string): void => {
    const id = uuidv4()
    setEntityLinkedResource((pre) => ({
      ...pre,
      [id]: { id, type, path: '', name: '', description: '' },
    }))
  }
  const handleUpdateEntityLinkedResource = (id: string, data: TEntityLinkedResourceModel): void => {
    setEntityLinkedResource((pre) => ({ ...pre, [id]: data }))
  }
  const handleRemoveEntityLinkedResource = (id: string): void => {
    setEntityLinkedResource((pre) => omitKey(pre, id))
  }

  const handleUpdateMetadata = (key: string, value: any): void => {
    setMetadata({
      ...metadata,
      [key]: value,
    })
  }

  const handleSubmit = (): void => {
    // TODO:
    const data = {
      ...token,
      metadata,
      creator: entitySettings.creator?.data,
      administrator: entitySettings.administrator?.data,
      tags: entitySettings.tags?.data,
      page: entitySettings.page?.data,
      service: entitySettings.service?.data,
      payments: entitySettings.payments?.data,
      liquidity: entitySettings.liquidity?.data,
      linkedResource: entityLinkedResource,
    }
    updateAssetInstance(SN - 1, data)
    goBack()
  }

  const renderPropertyHeading = (text: string): JSX.Element => (
    <Typography className='mb-3' variant='secondary' size='2xl'>
      {text}
    </Typography>
  )
  const renderTabs = (): JSX.Element => (
    <Box className='d-flex mb-2' style={{ gap: 20, cursor: 'pointer', height: 32 }}>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'description' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('description')}
      >
        Description
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'metrics' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('metrics')}
      >
        Metrics
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'attributes' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('attributes')}
      >
        Attributes
      </Typography>
    </Box>
  )
  const renderSettingsRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Settings')}
      <Box className='d-flex flex-wrap' style={{ gap: 10 }}>
        {Object.entries(entitySettings)
          .filter(([, value]) => !!value.required || !!value.set)
          .map(([key, value]) => (
            <PropertyBoxWrapper key={key}>
              {!value.required && value.set && (
                <Box className='remove' onClick={(): void => handleRemoveEntitySetting(key)}>
                  —
                </Box>
              )}
              <PropertyBox
                size={90}
                bgColor={
                  value.required
                    ? theme.ixoGrey700
                    : (Array.isArray(value.data) ? value.data.length > 0 : !!value.data)
                    ? theme.ixoNewBlue
                    : theme.ixoGrey700
                }
                onClick={(): void => handleOpenEntitySettingModal(key, true)}
              >
                <value.icon />
                <Typography weight='bold' size='md' color={'white'}>
                  {value.text}
                </Typography>
              </PropertyBox>
            </PropertyBoxWrapper>
          ))}
        <PropertyBox size={90} bgColor={theme.ixoGrey300} onClick={(): void => setOpenAddSettingsModal(true)}>
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )
  const renderLinkedResourcesRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Linked Resources')}
      <Box className='d-flex flex-wrap' style={{ gap: 10 }}>
        {Object.entries(entityLinkedResource).map(([key, value]) => {
          const Icon = EntityLinkedResourceConfig[value.type]?.icon
          return (
            <PropertyBoxWrapper key={key}>
              <Box className='remove' onClick={(): void => handleRemoveEntityLinkedResource(key)}>
                —
              </Box>
              <PropertyBox
                size={90}
                bgColor={(!!value.name && theme.ixoNewBlue) || undefined}
                onClick={(): void => handleOpenEntityLinkedResourceModal(key, true)}
              >
                {Icon && <Icon />}
                <Typography weight='bold' size='md' color={'white'}>
                  {value.name}
                </Typography>
              </PropertyBox>
            </PropertyBoxWrapper>
          )
        })}
        <PropertyBox size={90} bgColor={theme.ixoGrey300} onClick={(): void => setOpenAddLinkedResourceModal(true)}>
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )

  if (entitySettings.page.openModal) {
    return (
      <SetupPageContent
        entityType={entityType}
        page={entitySettings.page.data}
        onClose={(): void => handleOpenEntitySettingModal('page', false)}
      />
    )
  }
  return (
    <Wrapper>
      <Row>
        <Typography variant='secondary' size='xl'>
          Change the attributes of an individual token.
        </Typography>
      </Row>

      <Row style={{ gap: 50 }}>
        <Box className='d-flex flex-column'>
          <Box className='d-flex align-items-center justify-content-between'>
            <Typography weight='medium' size='xl'>
              Localisation:
            </Typography>
            <LocalisationForm localisation={localisation} setLocalisation={setLocalisation} />
          </Box>
          <Box className='mb-2' />
          <TokenProfileForm
            image={metadata?.image}
            setImage={(image): void => handleUpdateMetadata('image', image)}
            denom={metadata?.denom}
            type={metadata?.type}
            logo={metadata?.icon}
            setLogo={(icon): void => handleUpdateMetadata('icon', icon)}
            tokenName={metadata?.tokenName}
            setTokenName={(tokenName): void => handleUpdateMetadata('tokenName', tokenName)}
            name={metadata?.name}
            maxSupply={metadata?.maxSupply}
            SN={SN}
          />
        </Box>
        <Box className='d-flex flex-column' style={{ width: 400 }}>
          {renderTabs()}
          <Box style={{ flex: '1 auto', marginBottom: 30 }}>
            {metaView === 'description' && (
              <EntityDescriptionForm
                entityType={entityType}
                description={metadata?.description}
                setDescription={(description): void => handleUpdateMetadata('description', description)}
                brand={metadata?.brand}
                location={metadata?.location}
                startDate={(metadata as any)?.startDate}
                endDate={(metadata as any)?.endDate}
              />
            )}
            {metaView === 'metrics' && (
              <EntityMetricsForm
                metrics={metadata?.metrics}
                setMetrics={(metrics): void => handleUpdateMetadata('metrics', metrics)}
              />
            )}
            {metaView === 'attributes' && (
              <EntityAttributesForm
                attributes={metadata?.attributes}
                setAttributes={(attributes): void => handleUpdateMetadata('attributes', attributes)}
                edit
              />
            )}
          </Box>
        </Box>
      </Row>

      <Row style={{ gap: 8 }}>
        {['Settings', 'Linked Resources', 'Claims', 'Accorded Rights', 'Linked Entities'].map((key) => (
          <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
            <Typography size='lg' weight='medium' color={'white'}>
              {key}
            </Typography>
          </Badge>
        ))}
      </Row>

      <Row>
        <Box className='d-flex flex-column' style={{ gap: 30 }}>
          {propertyView === 'Settings' && renderSettingsRow()}
          {propertyView === 'Linked Resources' && renderLinkedResourcesRow()}
        </Box>
      </Row>

      <Row className='d-flex' style={{ gap: 30 }}>
        <Button variant='secondary' onClick={goBack}>
          Back
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Continue
        </Button>
      </Row>

      <CreatorSetupModal
        creator={entitySettings.creator?.data}
        open={entitySettings.creator?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('creator', false)}
      />
      <ServiceSetupModal
        service={entitySettings.service?.data}
        open={entitySettings.service?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('service', false)}
      />
      <LiquiditySetupModal
        liquidity={entitySettings.liquidity?.data}
        open={entitySettings.liquidity?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void => handleUpdateEntitySetting('liquidity', liquidity)}
      />
      <PaymentsSetupModal
        payments={entitySettings.payments?.data}
        open={entitySettings.payments?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void => handleUpdateEntitySetting('payments', payments)}
      />
      {Object.entries(entityLinkedResource).map(([key, value]) => (
        <LinkedResourceSetupModal
          key={key}
          linkedResource={value}
          open={false}
          onClose={(): void => handleOpenEntityLinkedResourceModal(key, false)}
          onChange={(linkedResource: TEntityLinkedResourceModel): void =>
            handleUpdateEntityLinkedResource(key, linkedResource)
          }
        />
      ))}

      <AddSettingsModal
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        onChange={handleAddEntitySetting}
        addedKeys={Object.keys(entitySettings)}
      />
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        onChange={handleAddEntityLinkedResource}
      />
    </Wrapper>
  )
}

export default IndividualToken
