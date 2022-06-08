import React from 'react'
import { useIntl } from 'react-intl'
import { IconHelp } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import { storeMessages } from '../../../utils/messages'

interface Props {
  value: number
  type: TotalizerType
  color: TotalizerColor
}

type TotalizerType = 'approved' | 'cancelled' | 'invoiced'
type TotalizerColor = 'red' | 'yellow' | 'green'

function ProfileTotalizerItem(props: Props) {
  const { value, type, color } = props
  const intl = useIntl()
  const {
    culture: { currency },
  } = useRuntime()

  const TotalizerTitle = {
    approved: intl.formatMessage(storeMessages.approvedProfileTotalizer),
    cancelled: intl.formatMessage(storeMessages.cancelledProfileTotalizer),
    invoiced: intl.formatMessage(storeMessages.invoicedProfileTotalizer),
  }

  return (
    <article className="w-33 pa6 ba bt-0 br-0 bl-0 b--light-gray">
      <div className="flex flex-row items-center">
        <h4 className="f5 mr-1 my-0">{TotalizerTitle[type]}</h4>
        <IconHelp />
      </div>
      <h2 className={`${color}`}>
        {intl.formatNumber(value, {
          style: 'currency',
          currency,
        })}
      </h2>
    </article>
  )
}

export default ProfileTotalizerItem
