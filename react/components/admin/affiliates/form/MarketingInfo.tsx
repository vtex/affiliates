import type { FC } from 'react'
import React from 'react'
import { Heading, Divider, Flex, Box, TextInput } from '@vtex/admin-ui'
// import { TextInput } from '@vtex/admin-formik'
import { useIntl } from 'react-intl'

import { messages } from '../../../../utils/messages'

const MarketingInfo: FC = () => {
  const intl = useIntl()

  return (
    <>
      <Heading>{intl.formatMessage(messages.socialLabel)}</Heading>
      <Divider csx={{ marginY: 3 }} />
      <Flex wrap="wrap" csx={{ marginY: 3 }}>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            name="marketing.instagram"
            label={intl.formatMessage(messages.instagramLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            name="marketing.facebook"
            label={intl.formatMessage(messages.facebookLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            name="marketing.whatsapp"
            label={intl.formatMessage(messages.whatsappLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            name="marketing.gtmId"
            label={intl.formatMessage(messages.gtmIdLabel)}
          />
        </Box>
      </Flex>
    </>
  )
}

export default MarketingInfo
