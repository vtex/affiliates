import type { FC } from 'react'
import React from 'react'
import { Heading, Divider, Flex, Box } from '@vtex/admin-ui'
import type { FormState } from '@vtex/admin-ui-form'
import { TextInput } from '@vtex/admin-ui-form'
import { useIntl } from 'react-intl'

import { messages } from '../../../../utils/messages'

interface AddressInfoType {
  form: FormState
}

const AddressInfo: FC<AddressInfoType> = ({ form }) => {
  const intl = useIntl()

  return (
    <>
      <Heading>{intl.formatMessage(messages.addressLabel)}</Heading>
      <Divider csx={{ marginTop: 3 }} />
      <Flex wrap="wrap" csx={{ marginY: 3 }}>
        <Box csx={{ width: '1' }}>
          <TextInput
            state={form}
            name="address.postalCode"
            label={intl.formatMessage(messages.zipCodeLabel)}
          />
        </Box>
        <Flex wrap="wrap" csx={{ width: '100%' }}>
          <Box csx={{ width: '1/2', paddingRight: 2 }}>
            <TextInput
              state={form}
              name="address.street"
              label={intl.formatMessage(messages.streetLabel)}
            />
          </Box>
          <Box csx={{ width: '1/4', paddingRight: 2 }}>
            <TextInput
              state={form}
              name="address.number"
              label={intl.formatMessage(messages.numberLabel)}
            />
          </Box>
          <Box csx={{ width: '1/4' }}>
            <TextInput
              state={form}
              name="address.neighborhood"
              label={intl.formatMessage(messages.neighborhoodLabel)}
            />
          </Box>
          <Box csx={{ width: '1/2', paddingRight: 2 }}>
            <TextInput
              state={form}
              name="address.reference"
              label={intl.formatMessage(messages.referenceLabel)}
            />
          </Box>
          <Box csx={{ width: '1/4', paddingRight: 2 }}>
            <TextInput
              state={form}
              name="address.city"
              label={intl.formatMessage(messages.cityLabel)}
            />
          </Box>
          <Box csx={{ width: '1/8', paddingRight: 2 }}>
            <TextInput
              state={form}
              name="address.state"
              label={intl.formatMessage(messages.stateLabel)}
            />
          </Box>
          <Box csx={{ width: '1/8' }}>
            <TextInput
              state={form}
              name="address.country"
              label={intl.formatMessage(messages.countryLabel)}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default AddressInfo
