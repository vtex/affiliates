import { Flex, Text, Stack, Card, Divider } from '@vtex/admin-ui'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { messages } from '../../../utils/messages'
import TotalValueDisclaimer from './TotalValueDisclaimer'

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
          <Stack space="$s" fluid csx={{ paddingX: 4 }}>
            <Text variant="pageTitle">
              {intl.formatMessage(messages.totalOrdersLabel)}
            </Text>
            <Text variant="pageTitle">{total}</Text>
          </Stack>
        </Flex>
        <Flex grow={1}>
          <Divider orientation="vertical" csx={{ marginX: 6 }} />
          <Stack space="$s" fluid csx={{ paddingX: 4 }}>
            <Flex>
              <Text variant="pageTitle">
                {intl.formatMessage(
                  messages.affiliatesOrdersTableOrderTotalColumnLabel
                )}
              </Text>
              <TotalValueDisclaimer />
            </Flex>
            <Text variant="pageTitle">
              {intl.formatNumber(totalOrderSum, {
                style: 'currency',
                currency,
              })}
            </Text>
          </Stack>
        </Flex>
        <Flex grow={1}>
          <Divider orientation="vertical" csx={{ marginX: 6 }} />
          <Stack space="$s" fluid csx={{ paddingX: 4 }}>
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
          </Stack>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Totalizers
