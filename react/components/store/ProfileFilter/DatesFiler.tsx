import React from 'react'
import type { FC } from 'react'
import { DatePicker } from 'vtex.styleguide'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { storeMessages } from '../../../utils/messages'

type DatesFilterProps = {
  startDate: Date
  endDate: Date
  minStartDate: Date
  onChangeStartDate: (date: Date) => void
  onChangeEndDate: (date: Date) => void
}

export const DatesFilter: FC<DatesFilterProps> = ({
  startDate,
  endDate,
  minStartDate,
  onChangeStartDate,
  onChangeEndDate,
}) => {
  const intl = useIntl()
  const {
    culture: { locale },
  } = useRuntime()

  return (
    <>
      <div className="flex items-center justify-between ml4">
        <div className="flex mr2">
          <div className="t-body mw9 pb3-s">
            {intl.formatMessage(storeMessages.dateFilterFrom)}
          </div>
        </div>
        <DatePicker
          value={startDate}
          minDate={minStartDate}
          maxDate={endDate}
          onChange={onChangeStartDate}
          locale={locale}
          useTime
        />
      </div>
      <div className="flex items-center justify-between ml4">
        <div className="flex mr2">
          <div className="t-body mw9 pb3-s">
            {intl.formatMessage(storeMessages.dateFilterTo)}
          </div>
        </div>
        <DatePicker
          value={endDate}
          minDate={startDate}
          maxDate={new Date()}
          onChange={onChangeEndDate}
          locale={locale}
          useTime
        />
      </div>
    </>
  )
}
