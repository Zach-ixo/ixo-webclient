import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { CodeMirror, Input } from 'pages/CreateEntity/Components'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import JSON5 from 'json5'
import { makeWasmMessage } from 'utils/messages'
import { validateCosmosMsg } from 'utils/validation'

const messageValidation = (value: string) => {
  let msg
  try {
    msg = JSON5.parse(value)
  } catch (e: any) {
    return e.message as string
  }
  if (msg.wasm) msg = makeWasmMessage(msg)
  const validCosmos = validateCosmosMsg(msg)

  if (!validCosmos.valid) {
    return 'INVALID_COSMOS_MSG'
  } else {
    return true
  }
}

export interface CustomData {
  message: string
}
const initialState: CustomData = {
  message: '{}',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupCustomModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<CustomData>(initialState)

  const validate = useMemo(() => messageValidation(formData.message) === true, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      width='600px'
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' direction='column' gap={2}>
        <CodeMirror value={formData.message} onChange={(value) => handleUpdateFormData('message', value)} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupCustomModal
