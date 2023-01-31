import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import {
  AddSettingsModal,
  CreatorSetupModal,
  CreatorSetupModal as ControllerSetupModal,
  ServiceSetupModal,
  ClaimEvaluationMethodSetupModal,
  DDOTagsSetupModal,
} from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import { SetupPageContent } from '../SetupPageContent'
import {
  EntitySettingsConfig,
  TEntityClaimEvaluationMethodModel,
  TEntityControllerModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/protocol'

const SetupSettings: React.FC = (): JSX.Element => {
  const {
    entityType,
    creator,
    controller,
    ddoTags,
    page,
    service,
    updateCreator,
    updateController,
    updateDDOTags,
    updatePage,
    updateService,
  } = useCreateEntityState()
  const [entitySettings, setEntitySettings] = useState<{ [key: string]: any }>(EntitySettingsConfig)
  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)

  const handleOpenEntitySettingModal = (key: string, open: boolean): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // entity settings
  const handleAddEntitySetting = (key: string): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: true,
      },
    }))
  }
  const handleUpdateEntitySetting = (key: string, data: any): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        data,
      },
    }))
  }
  const handleRemoveEntitySetting = (key: string): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: false,
        data: undefined,
      },
    }))
  }

  // hooks - creator
  useEffect(() => {
    if (creator) {
      handleUpdateEntitySetting('creator', creator)
    }
  }, [creator])
  useEffect(() => {
    if (entitySettings.creator?.data) {
      updateCreator(entitySettings.creator.data)
    } // eslint-disable-next-line
  }, [entitySettings.creator?.data])

  // hooks - controller
  useEffect(() => {
    if (controller) {
      handleUpdateEntitySetting('controller', controller)
    }
  }, [controller])
  useEffect(() => {
    if (entitySettings.controller?.data) {
      updateController(entitySettings.controller.data)
    } // eslint-disable-next-line
  }, [entitySettings.controller?.data])

  // hooks - ddoTags
  useEffect(() => {
    if (ddoTags) {
      handleUpdateEntitySetting('ddoTags', ddoTags)
    }
  }, [ddoTags])
  useEffect(() => {
    if (entitySettings.ddoTags?.data) {
      updateDDOTags(entitySettings.ddoTags.data)
    } // eslint-disable-next-line
  }, [entitySettings.ddoTags?.data])

  // hooks - page
  useEffect(() => {
    if (page) {
      handleUpdateEntitySetting('page', page)
    }
  }, [page])
  useEffect(() => {
    if (entitySettings.page?.data) {
      updatePage(entitySettings.page.data)
    } // eslint-disable-next-line
  }, [entitySettings.page?.data])

  // hooks - service
  useEffect(() => {
    if (service) {
      handleUpdateEntitySetting('service', service)
    }
  }, [service])
  useEffect(() => {
    if (entitySettings.service?.data) {
      updateService(entitySettings.service.data)
    } // eslint-disable-next-line
  }, [entitySettings.service?.data])

  if (entitySettings.page.openModal) {
    document.querySelector('#setup-property-tabs')?.setAttribute('style', 'display: none;')
    document.querySelector('#setup-property-actions')?.setAttribute('style', 'display: none;')

    return (
      <SetupPageContent
        entityType={entityType}
        page={entitySettings.page.data}
        onChange={(page: TEntityPageModel): void => handleUpdateEntitySetting('page', page)}
        onClose={(): void => handleOpenEntitySettingModal('page', false)}
      />
    )
  } else {
    document.querySelector('#setup-property-tabs')?.setAttribute('style', 'display: flex;')
    document.querySelector('#setup-property-actions')?.setAttribute('style', 'display: flex;')
  }
  return (
    <>
      <Box className='d-flex flex-column'>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Settings
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(entitySettings)
            .filter(([, value]) => !!value.required || !!value.set)
            .map(([key, value]) => (
              <PropertyBox
                key={key}
                icon={<value.icon />}
                required={value.required}
                set={Array.isArray(value.data) ? value.data.length > 0 : !!value.data}
                label={value.text}
                handleRemove={(): void => handleRemoveEntitySetting(key)}
                handleClick={(): void => handleOpenEntitySettingModal(key, true)}
              />
            ))}

          <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddSettingsModal(true)} />
        </Box>
      </Box>
      <AddSettingsModal
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        onChange={handleAddEntitySetting}
      />
      <CreatorSetupModal
        title='Creator'
        creator={entitySettings.creator.data}
        open={entitySettings.creator.openModal}
        onClose={(): void => handleOpenEntitySettingModal('creator', false)}
        onChange={(creator: TEntityCreatorModel): void => handleUpdateEntitySetting('creator', creator)}
      />
      <ControllerSetupModal
        title='Controller'
        creator={entitySettings.controller.data}
        open={entitySettings.controller.openModal}
        onClose={(): void => handleOpenEntitySettingModal('controller', false)}
        onChange={(controller: TEntityControllerModel): void => handleUpdateEntitySetting('controller', controller)}
      />
      <ServiceSetupModal
        service={entitySettings.service.data}
        open={entitySettings.service.openModal}
        onClose={(): void => handleOpenEntitySettingModal('service', false)}
        onChange={(service: TEntityServiceModel[]): void => handleUpdateEntitySetting('service', service)}
      />
      <DDOTagsSetupModal
        ddoTags={entitySettings.ddoTags.data}
        entityType={entityType}
        open={entitySettings.ddoTags.openModal}
        onClose={(): void => handleOpenEntitySettingModal('ddoTags', false)}
        onChange={(ddoTags: TEntityDDOTagModel[]): void => handleUpdateEntitySetting('ddoTags', ddoTags)}
      />
      <ClaimEvaluationMethodSetupModal
        claimEvaluationMethod={entitySettings.claimEvaluationMethod.data}
        open={entitySettings.claimEvaluationMethod?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('claimEvaluationMethod', false)}
        onChange={(claimEvaluationMethod: TEntityClaimEvaluationMethodModel): void =>
          handleUpdateEntitySetting('claimEvaluationMethod', claimEvaluationMethod)
        }
      />
    </>
  )
}

export default SetupSettings