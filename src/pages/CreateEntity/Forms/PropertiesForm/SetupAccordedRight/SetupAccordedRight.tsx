import { Box } from 'components/App/App.styles'
import { AddAccordedRightModal, PaymentsSetupModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { EntityAccordedRightConfig, TEntityAccordedRightModel, TEntityPaymentModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

interface Props {
  accordedRight: { [key: string]: TEntityAccordedRightModel }
  updateAccordedRight: (accordedRight: { [id: string]: TEntityAccordedRightModel }) => void
}

const SetupAccordedRight: React.FC<Props> = ({ accordedRight, updateAccordedRight }): JSX.Element => {
  const [entityAccordedRight, setEntityAccordedRight] = useState<{ [key: string]: any }>({})
  const [openAddAccordedRightModal, setOpenAddAccordedRightModal] = useState(false)

  // popups - accorded rights modal
  const handleOpenEntityAccordedRightModal = (key: string, open: boolean): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }

  // entity accorded rights
  const handleAddEntityAccordedRight = (key: string): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: { ...EntityAccordedRightConfig[key] },
    }))
  }
  const handleUpdateEntityAccordedRight = (key: string, data: any): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: { ...pre[key], data },
    }))
  }
  const handleRemoveEntityAccordedRight = (id: string): void => {
    setEntityAccordedRight((pre) => omitKey(pre, id))
  }

  // hooks - accordedRight
  useEffect(() => {
    if (Object.values(accordedRight).length > 0) {
      setEntityAccordedRight(accordedRight)
    }
  }, [accordedRight])
  useEffect(() => {
    updateAccordedRight(entityAccordedRight ?? {})
    // eslint-disable-next-line
  }, [entityAccordedRight])

  return (
    <>
      <Box className='d-flex flex-column'>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Accorded Rights
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(accordedRight).map(([key, value]) => {
            const Icon = EntityAccordedRightConfig[key]?.icon
            const label = EntityAccordedRightConfig[key]?.text
            return (
              <PropertyBox
                key={key}
                icon={Icon && <Icon />}
                label={label}
                set={!!(value as any)?.data}
                handleRemove={(): void => handleRemoveEntityAccordedRight(key)}
                handleClick={(): void => handleOpenEntityAccordedRightModal(key, true)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddAccordedRightModal(true)} />
        </Box>
      </Box>
      <AddAccordedRightModal
        open={openAddAccordedRightModal}
        onClose={(): void => setOpenAddAccordedRightModal(false)}
        handleChange={handleAddEntityAccordedRight}
      />
      <PaymentsSetupModal
        payments={entityAccordedRight?.payments?.data}
        open={entityAccordedRight?.payments?.openModal}
        onClose={(): void => handleOpenEntityAccordedRightModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void => handleUpdateEntityAccordedRight('payments', payments)}
      />
    </>
  )
}

export default SetupAccordedRight