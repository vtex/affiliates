import React from 'react'
import { useIntl } from 'react-intl'
import { Tag } from 'vtex.styleguide'

import { storeMessages } from '../../../utils/messages'

interface StatusProp {
  status: string
}

function ProfileStatusTag(props: StatusProp) {
  const { status } = props
  const intl = useIntl()

  if (status === 'canceled' || status === 'cancel') {
    return (
      <Tag type="error" variation="low">
        {intl.formatMessage(storeMessages.cancelledTitle)}
      </Tag>
    )
  }

  if (status === 'invoiced' || status === 'invoice') {
    return (
      <Tag type="success" variation="low">
        {intl.formatMessage(storeMessages.invoicedTitle)}
      </Tag>
    )
  }

  return (
    <Tag type="warning" variation="low">
      {intl.formatMessage(storeMessages.onGoingTitle)}
    </Tag>
  )
}

export default ProfileStatusTag
