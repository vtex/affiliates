import { Flex, Text } from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React from 'react'
import { DatePicker } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { messages } from '../../../utils/messages'

type DatesFilterProps = {
  startDate: Date
  endDate: Date
  onChangeStartDate: (date: Date) => void
  onChangeEndDate: (date: Date) => void
}

const DatesFilter: FC<DatesFilterProps> = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}) => {
  const intl = useIntl()
  const {
    culture: { locale },
  } = useRuntime()

  return (
    <>
      <Flex basis="220px" align="center" justify="space-between">
        <Flex csx={{ marginRight: '4px' }}>
          <Text variant="title1">
            {intl.formatMessage(messages.dateFilterFrom)}
          </Text>
        </Flex>
        <DatePicker
          value={startDate}
          onChange={onChangeStartDate}
          locale={locale}
        />
      </Flex>
      <Flex basis="220px" align="center" justify="space-between">
        <Flex csx={{ marginRight: '4px' }}>
          <Text variant="title1">
            {intl.formatMessage(messages.dateFilterTo)}
          </Text>
        </Flex>
        <DatePicker
          value={endDate}
          minDate={startDate}
          onChange={onChangeEndDate}
          locale={locale}
        />
      </Flex>
    </>
  )
}

export default DatesFilter
