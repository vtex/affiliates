import type { FC } from 'react'
import React from 'react'
import { Heading, Divider, Flex, Box } from '@vtex/admin-ui'
import type { FormState } from '@vtex/admin-ui-form'
import { TextInput } from '@vtex/admin-ui-form'
import { useIntl } from 'react-intl'

import { messages } from '../../../../utils/messages'

interface MarketingInfoType {
  form: FormState
}

const MarketingInfo: FC<MarketingInfoType> = ({ form }) => {
  const intl = useIntl()

  return (
    <>
      <Heading>{intl.formatMessage(messages.socialLabel)}</Heading>
      <Divider csx={{ marginY: 3 }} />
      <Flex wrap="wrap" csx={{ marginY: 3 }}>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            state={form}
            name="marketing.instagram"
            label={intl.formatMessage(messages.instagramLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            state={form}
            name="marketing.facebook"
            label={intl.formatMessage(messages.facebookLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            state={form}
            name="marketing.whatsapp"
            label={intl.formatMessage(messages.whatsappLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            state={form}
            name="marketing.gtmId"
            label={intl.formatMessage(messages.gtmIdLabel)}
          />
        </Box>
      </Flex>
    </>
  )
}

export default MarketingInfo
