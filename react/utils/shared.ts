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

export const statusTagControl = (
  intl: IntlShape,
  status?: string
): {
  label: string
  palette: PaletteColors
} => {
  if (status === 'order-created') {
    return {
      label: intl.formatMessage(messages.orderStatusCreatedLabel),
      palette: 'gray',
    }
  }

  if (status === 'payment-approved') {
    return {
      label: intl.formatMessage(messages.orderStatusPaidLabel),
      palette: undefined,
    }
  }

  if (status === 'invoiced') {
    return {
      label: intl.formatMessage(messages.orderStatusInvoicedLabel),
      palette: 'green',
    }
  }

  return {
    label: intl.formatMessage(messages.orderStatusCancelLabel),
    palette: 'red',
  }
}
