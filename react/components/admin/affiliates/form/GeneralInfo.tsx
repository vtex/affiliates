import type { FC } from 'react'
import React from 'react'
import { Heading, Divider, Flex, Box } from '@vtex/admin-ui'
import { FormikInput } from '@vtex/admin-formik'
import { useIntl } from 'react-intl'

import { messages } from '../../../../utils/messages'

const GeneralInfo: FC = () => {
  const intl = useIntl()

  return (
    <>
      <Heading>{intl.formatMessage(messages.generalInfoLabel)}</Heading>
      <Divider csx={{ marginY: 3 }} />
      <Flex wrap="wrap" csx={{ marginY: 3 }}>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <FormikInput
            name="name"
            label={intl.formatMessage(messages.nameLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <FormikInput
            name="storeName"
            label={intl.formatMessage(messages.storeNameLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <FormikInput
            name="email"
            label={intl.formatMessage(messages.emailLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <FormikInput
            name="phone"
            label={intl.formatMessage(messages.phoneLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <FormikInput
            name="slug"
            label={intl.formatMessage(messages.slugLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <FormikInput
            name="refId"
            label={intl.formatMessage(messages.refIdLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <FormikInput
            name="documentType"
            label={intl.formatMessage(messages.documentTypeLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <FormikInput
            name="document"
            label={intl.formatMessage(messages.documentLabel)}
          />
        </Box>
      </Flex>
    </>
  )
}

export default GeneralInfo