import { Flex, Heading, Text, Set } from '@vtex/admin-ui'
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
    <Flex>
      <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
        <Heading>{intl.formatMessage(messages.totalOrdersLabel)}</Heading>
        <Text variant="display">{total}</Text>
      </Set>
      <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
        <Heading>
          {intl.formatMessage(
            messages.affiliatesOrdersTableOrderTotalColumnLabel
          )}
        </Heading>
        <Text variant="display">
          {intl.formatNumber(totalOrderSum, {
            style: 'currency',
            currency,
          })}
        </Text>
      </Set>
      <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
        <Heading>
          {intl.formatMessage(
            messages.affiliatesOrdersTableOrderTotalCommissionColumnLabel
          )}
        </Heading>
        <Text variant="display">
          {intl.formatNumber(totalCommissionSum, {
            style: 'currency',
            currency,
          })}
        </Text>
      </Set>
    </Flex>
  )
}

export default Totalizers
