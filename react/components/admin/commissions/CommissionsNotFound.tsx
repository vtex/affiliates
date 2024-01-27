import React from 'react'
import { Alert } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { messages } from '../../../utils/messages'

interface CommissionsNotFoundProps {
  notFound: boolean
}

function CommissionsNotFound(props: CommissionsNotFoundProps) {
  const { notFound } = props
  const intl = useIntl()

  return (
    <>
      {notFound === true ? (
        <Alert variant="warning">
          {intl.formatMessage(messages.affiliateCommissionWarning)}
        </Alert>
      ) : (
        <Alert variant="positive">
          {intl.formatMessage(messages.affiliateCommissionSuccess)}
        </Alert>
      )}
    </>
  )
}

export default CommissionsNotFound
