import { Skeleton, Tag } from '@vtex/admin-ui'
import type { ResolverRenderProps } from '@vtex/admin-ui/dist/components/DataGrid/resolvers/core'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { messages } from '../../../utils/messages'

type TableColumns = {
  status: string
}

type PaletteColors =
  | 'teal'
  | 'green'
  | 'red'
  | 'cyan'
  | 'gray'
  | 'orange'
  | 'purple'
  | 'lightBlue'
  | undefined

const StatusTableCell = ({
  item,
  context,
}: ResolverRenderProps<null, TableColumns>) => {
  const { status } = item
  const intl = useIntl()
  const tagControls = useMemo((): {
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
  }, [status, intl])

  if (context.status === 'loading') {
    return <Skeleton csx={{ height: 24 }} />
  }

  return <Tag label={tagControls.label} palette={tagControls.palette} />
}

export default StatusTableCell
