import React from 'react'
import { Tooltip, Box } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import IconHelp from '../shared/IconHelp'
import { messages } from '../../../utils/messages'

const TotalValueDisclaimer = () => {
  const intl = useIntl()

  return (
    <Tooltip text={intl.formatMessage(messages.totalOrderValueDisclaimerText)}>
      <Box csx={{ paddingLeft: 1 }}>
        <IconHelp />
      </Box>
    </Tooltip>
  )
}

export default TotalValueDisclaimer
