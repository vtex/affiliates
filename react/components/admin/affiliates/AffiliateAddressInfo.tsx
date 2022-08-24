import {
  Card,
  Stack,
  Heading,
  FlexSpacer,
  Columns,
  Column,
  Text,
  tag,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import type { Address } from 'vtex.affiliates'

import { messages } from '../../../utils/messages'
import LoadingBox from '../shared/LoadingBox'

type AffiliateAddressInfoProps = {
  loading: boolean
  address?: Address | null
}

const AffiliateAddressInfo: FC<AffiliateAddressInfoProps> = ({
  address,
  loading,
}) => {
  const intl = useIntl()

  if (loading) {
    return (
      <LoadingBox csx={{ width: 'full', height: 146, marginBottom: '16px' }} />
    )
  }

  return (
    <tag.div csx={{ marginTop: '16px' }}>
      <Heading>{intl.formatMessage(messages.addressLabel)}</Heading>
      <Card>
        <Stack space="$xs" fluid>
          <Columns spacing={1}>
            <Column units={6}>
              <Text variant="title1">{`${intl.formatMessage(
                messages.streetLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.street}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.numberLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.number}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.neighborhoodLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.neighborhood}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.cityLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.city}
              </Text>
            </Column>
            <Column units={6}>
              <Text variant="title1">{`${intl.formatMessage(
                messages.stateLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.state}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.countryLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.country}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.referenceLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.reference}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.zipCodeLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {address?.postalCode}
              </Text>
            </Column>
          </Columns>
        </Stack>
      </Card>
    </tag.div>
  )
}

export default AffiliateAddressInfo
