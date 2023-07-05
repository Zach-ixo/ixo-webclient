import cx from 'classnames'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import React, { FunctionComponent, useMemo } from 'react'
import { useAppSelector } from 'redux/hooks'
import styled from 'styled-components'
import { FormCardProps } from 'redux/createEntityOld/createEntity.types'

const FormContainer = styled.div`
  border-top: 1px solid #e8edee;
  margin-top: 4rem;
  padding-top: 1.25rem;
`

const ImportButton = styled.button`
  border: 1px solid #56ccf2;
  border-radius: 4px;
  color: ${(props) => props.theme.ixoNewBlue};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  background: transparent;
  width: 115px;
  height: 50px;
  &.active {
    background: ${(props): string => props.theme.ixoNewBlue};
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    color: ${(props: any): string => props.theme.ixoLightGreyBlue};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  column-gap: 1rem;
`

interface Props extends FormCardProps {
  sourceNet: string
  existingEntityDid: string
  error: string
  handleMethod: (method: string) => void
  method: string
  handleNewClick: () => void
  handleCopyClick: () => void
}

// eslint-disable-next-line react/display-name
const ExistingEntityCard: FunctionComponent<Props> = React.forwardRef(
  (
    {
      sourceNet,
      existingEntityDid,
      error,
      handleSubmitted,
      handleUpdateContent,
      handleError,
      handleMethod,
      method,
      handleNewClick,
      handleCopyClick,
    },
    ref,
  ) => {
    const formData = {
      sourceNet,
      existingEntityDid,
    }
    const { relayersConfig } = useAppSelector((state) => state.configs)

    const schema = {
      type: 'object',
      properties: {
        sourceNet: {
          type: 'string',
          title: 'Select a Source Network',
          enum: relayersConfig.map((relayer: any) => relayer.name),
          enumNames: relayersConfig.map((relayer: any) => relayer.displayName),
          // default: relayersConfig[0],
        },
        existingEntityDid: { type: 'string', title: 'Use an Existing Entity' },
      },
    }

    const uiSchema = {
      sourceNet: {
        'ui:placeholder': 'Select Network',
      },
      entityDid: {
        'ui:widget': 'text',
        'ui:placeholder': 'Paste a DID',
      },
    }

    const extraErrors = useMemo(() => {
      if (!error) {
        return {}
      }
      handleMethod(null!)
      return {
        existingEntityDid: {
          __errors: [error],
        },
      }
      // eslint-disable-next-line
    }, [error])

    return (
      <FormContainer>
        <MultiControlForm
          formData={formData}
          ref={ref}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmitted}
          onFormDataChange={(formData: FormData): void => {
            handleMethod(null!)
            handleUpdateContent(formData)
          }}
          onError={handleError}
          liveValidate={false}
          extraErrors={extraErrors}
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          <ButtonContainer>
            <ImportButton
              type='button'
              onClick={handleCopyClick}
              disabled={!existingEntityDid || !sourceNet}
              className={cx([
                {
                  active: method === 'copy',
                },
              ])}
            >
              Copy
            </ImportButton>
            <ImportButton
              type='button'
              onClick={handleNewClick}
              className={cx([
                {
                  active: method === 'new',
                },
              ])}
            >
              New
            </ImportButton>
          </ButtonContainer>
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default ExistingEntityCard
