import {
  Box,
  Column,
  Columns,
  FlexSpacer,
  Skeleton,
  Text,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import type { AffiliatesOrdersData } from '../../../typings/tables'
import { messages } from '../../../utils/messages'

type OrderInfoProps = {
  order: AffiliatesOrdersData | undefined
}

const OrderInfo: FC<OrderInfoProps> = ({ order }) => {
  const intl = useIntl()
  const {
    culture: { currency },
  } = useRuntime()

  if (!order) {
    return (
      <Box csx={{ width: 'full', height: 192 }}>
        <Skeleton />
      </Box>
    )
  }

  const {
    affiliateId,
    status,
    lastInteractionIn,
    orderDate,
    orderTotal,
    orderTotalCommission,
  } = order

  return (
    <Columns spacing={1}>
      <Column units={4}>
        <Text variant="title1">
          {`${intl.formatMessage(
            messages.affiliatesOrdersTableAffiliateIdColumnLabel
          )}: `}
        </Text>
        <Text variant="action2" tone="info">
          {affiliateId}
        </Text>
        <FlexSpacer />
        <Text variant="title1">
          {`${intl.formatMessage(
            messages.affiliatesOrdersTableStatusColumnLabel
          )}: `}
        </Text>
        <Text variant="action2" tone="info">
          {status}
        </Text>
      </Column>
      <Column units={4}>
        <Text variant="title1">{`${intl.formatMessage(
          messages.creationDateLabel
        )}: `}</Text>
        <Text variant="action2" tone="info">
          {intl.formatDate(orderDate)}
        </Text>
        <FlexSpacer />
        <Text variant="title1">
          {`${intl.formatMessage(
            messages.affiliatesOrdersTableLastUpdatedColumnLabel
          )}: `}
        </Text>
        <Text variant="action2" tone="info">
          {intl.formatDate(lastInteractionIn)}
        </Text>
      </Column>
      <Column units={4}>
        <Text variant="title1">
          {`${intl.formatMessage(
            messages.affiliatesOrdersTableOrderTotalColumnLabel
          )}: `}
        </Text>
        <Text variant="action2" tone="info">
          {intl.formatNumber(orderTotal, { style: 'currency', currency })}
        </Text>
        <FlexSpacer />
        <Text variant="title1">
          {`${intl.formatMessage(
            messages.affiliatesOrdersTableOrderTotalCommissionColumnLabel
          )}: `}
        </Text>
        <Text variant="action2" tone="info">
          {intl.formatNumber(orderTotalCommission, {
            style: 'currency',
            currency,
          })}
        </Text>
      </Column>
    </Columns>
  )
}

export default OrderInfo
