import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { questionSchema, questionUiSchema, currencyEnum } from '../constants'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { FormCardProps, QuestionCardBaseProps } from 'types/protocol'

interface Props extends FormCardProps, QuestionCardBaseProps {
  currency: string
}

const CurrencyQuestion: React.FunctionComponent<Props> = React.forwardRef(
  ({ title, description, label, attributeType, currency, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const formData = {
      title,
      description,
      label,
      attributeType,
      currency,
    }

    const schema = {
      ...questionSchema,
      required: [...questionSchema.required, 'currency'],
      properties: {
        ...questionSchema.properties,
        currency: {
          type: 'array',
          title: 'Currency',
          items: {
            type: 'string',
            enumNames: currencyEnum.map((item) => item.match(/(\w+) \((\d+)\)/)![1]).sort(),
            enum: currencyEnum.sort(),
          },
          uniqueItems: true,
          // maxItems: 1,
        },
        // amount: {
        //   type: 'number',
        //   title: 'Amount',
        //   multipleOf: 0.01,
        // },
      },
      // dependencies: {
      //   currency: {
      //     oneOf: amountSchema,
      //   },
      // },
    } as any

    const uiSchema = {
      ...questionUiSchema,
      currency: {},
    }

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        customObjectFieldTemplate={ObjectFieldTemplate2Column}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)
CurrencyQuestion.displayName = 'CurrencyQuestion'

export default CurrencyQuestion
