import React, { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { IconHelp } from 'vtex.styleguide'

import { storeMessages } from '../../../utils/messages'
import Tooltip from '../Tooltip'

interface Props {
  value: number
  type: TotalizerType
  color: TotalizerColor
  tooltip: string
}

type TotalizerType = 'approved' | 'cancelled' | 'invoiced'
type TotalizerColor = 'red' | 'yellow' | 'green'

function ProfileTotalizerItem(props: Props) {
  const { value, type, color, tooltip } = props
  const intl = useIntl()
  const {
    culture: { currency },
  } = useRuntime()

  const tooltipRef = useRef(null)

  const TotalizerTitle = {
    approved: intl.formatMessage(storeMessages.onGoingTitle),
    cancelled: intl.formatMessage(storeMessages.cancelledTitle),
    invoiced: intl.formatMessage(storeMessages.invoicedTitle),
  }

  return (
    <article
      ref={tooltipRef}
      className="w-33 pa6 ba bt-0 br-1 bb-0 bl-0 b--light-gray"
    >
      <div id="totalizer-popup" className="flex flex-row items-center">
        <h4 className="f5 mr-1 my-0">{TotalizerTitle[type]}</h4>
        <span>
          <Tooltip content={tooltip} delay={200}>
            <IconHelp />
          </Tooltip>
        </span>
      </div>
      <h2 className={`${color}`}>
        {intl.formatNumber(value / 100, {
          style: 'currency',
          currency,
        })}
      </h2>
    </article>
  )
}

export default ProfileTotalizerItem
