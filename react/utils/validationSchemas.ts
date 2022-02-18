import type { IntlShape } from 'react-intl'
import * as Yup from 'yup'

import { messages } from './messages'

export const VALIDATION_SCHEMAS = (intl: IntlShape) => {
  const translatedMessages = {
    required: intl.formatMessage(messages.formRequiredMessage),
    email: intl.formatMessage(messages.formInvalidEmail),
    number: intl.formatMessage(messages.formInvalidNumberField),
  }

  return {
    affiliateForm: Yup.object().shape({
      name: Yup.string().required(translatedMessages.required),
      email: Yup.string()
        .email(translatedMessages.email)
        .required(translatedMessages.required),
      phone: Yup.number().typeError(translatedMessages.number),
      slug: Yup.string().required(translatedMessages.required),
      refId: Yup.string(),
      storeName: Yup.string(),
      document: Yup.string(),
      documentType: Yup.string(),
      address: Yup.object().shape({
        street: Yup.string(),
        number: Yup.string(),
        neighborhood: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        postalCode: Yup.string(),
        country: Yup.string(),
        reference: Yup.string(),
      }),
      marketing: Yup.object().shape({
        instagram: Yup.string(),
        facebook: Yup.string(),
        whatsapp: Yup.string(),
        gtmId: Yup.string(),
      }),
    }),
  }
}
