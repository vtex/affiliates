import { Flex, Text, Set, Card, Divider } from '@vtex/admin-ui'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { messages } from '../../../utils/messages'

type TotalizersProps = {
  totalizers: {
    total: number
    totalCommissionSum: number
    totalOrderSum: number
  }
}

const Totalizers = ({ totalizers }: TotalizersProps) => {
  const intl = useIntl()
  const {
    culture: { currency },
  } = useRuntime()

  const { total, totalCommissionSum, totalOrderSum } = totalizers

  return (
    <Card>
      <Flex justify="space-between">
        <Flex grow={1}>
          <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
            <Text variant="pageTitle">
              {intl.formatMessage(messages.totalOrdersLabel)}
            </Text>
            <Text variant="pageTitle">{total}</Text>
          </Set>
        </Flex>
        <Flex grow={1}>
          <Divider orientation="vertical" csx={{ marginX: 6 }} />
          <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
            <Text variant="pageTitle">
              {intl.formatMessage(
                messages.affiliatesOrdersTableOrderTotalColumnLabel
              )}
            </Text>
            <Text variant="pageTitle">
              {intl.formatNumber(totalOrderSum, {
                style: 'currency',
                currency,
              })}
            </Text>
          </Set>
        </Flex>
        <Flex grow={1}>
          <Divider orientation="vertical" csx={{ marginX: 6 }} />
          <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
            <Text variant="pageTitle">
              {intl.formatMessage(
                messages.affiliatesOrdersTableOrderTotalCommissionColumnLabel
              )}
            </Text>
            <Text variant="pageTitle">
              {intl.formatNumber(totalCommissionSum, {
                style: 'currency',
                currency,
              })}
            </Text>
          </Set>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Totalizers
