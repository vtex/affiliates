import type { IntlShape } from 'react-intl'

import type { PaletteColors } from '../typings/tables'
import { messages } from './messages'

export const getSlug = () => {
  const splitPathname = window.location?.pathname.split('/')

  return splitPathname && splitPathname[splitPathname.length - 1]
}

export const getSlugStoreFront = () => {
  const splitPathname = window.location?.pathname.split('/')

  return splitPathname && splitPathname[splitPathname.length - 2]
}

export const setSortOrder = (sortOrder: string | undefined) => {
  return sortOrder === 'DSC' ? 'DESC' : 'ASC'
}

// Ex: The function below should receive a value "Test & test" and return the value "test---test"
export const setFormRegex = (value: string) => {
  const regex = /[\s.;,?!%&]/g

  return value.replace(regex, '-').toLowerCase()
}

export const statusTagControl = (
  intl: IntlShape,
  status?: string
): {
  label: string
  palette: PaletteColors
  size: 'normal' | 'large'
} => {
  if (status === 'order-created') {
    return {
      label: intl.formatMessage(messages.orderStatusCreatedLabel),
      palette: 'gray',
      size: 'large',
    }
  }

  if (status === 'payment-pending') {
    return {
      label: intl.formatMessage(messages.orderStatusPendingLabel),
      palette: 'gray',
      size: 'large',
    }
  }

  if (status === 'payment-approved') {
    return {
      label: intl.formatMessage(messages.orderStatusPaidLabel),
      palette: 'cyan',
      size: 'large',
    }
  }

  if (status === 'invoiced' || status === 'invoice') {
    return {
      label: intl.formatMessage(messages.orderStatusInvoicedLabel),
      palette: 'green',
      size: 'large',
    }
  }

  if (status === 'cancel' || status === 'canceled') {
    return {
      label: intl.formatMessage(messages.orderStatusCancelLabel),
      palette: 'red',
      size: 'large',
    }
  }

  return {
    label: intl.formatMessage(messages.orderStatusNotMapped),
    palette: 'gray',
    size: 'large',
  }
}
