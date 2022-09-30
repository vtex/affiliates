import {
  Card,
  CardContent,
  Stack,
  Heading,
  FlexSpacer,
  Columns,
  Column,
  Text,
  Box,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import type { Marketing } from 'vtex.affiliates'

import { messages } from '../../../utils/messages'
import LoadingBox from '../shared/LoadingBox'

type AffiliateMarketingInfoProps = {
  loading: boolean
  marketing?: Marketing | null
}

const AffiliateMarketingInfo: FC<AffiliateMarketingInfoProps> = ({
  marketing,
  loading,
}) => {
  const intl = useIntl()

  if (loading) {
    return (
      <LoadingBox csx={{ width: 'full', height: 146, marginBottom: '16px' }} />
    )
  }

  return (
    <Box as="div" csx={{ marginTop: '16px' }}>
      <Heading>{intl.formatMessage(messages.socialLabel)}</Heading>
      <Card>
        <CardContent>
          <Stack space="$xs" fluid>
            <Columns space="1">
              <Column units={6}>
                <Text variant="title1">{`${intl.formatMessage(
                  messages.instagramLabel
                )}: `}</Text>
                <Text variant="action2" tone="info">
                  {marketing?.instagram}
                </Text>
                <FlexSpacer />
                <Text variant="title1">{`${intl.formatMessage(
                  messages.facebookLabel
                )}: `}</Text>
                <Text variant="action2" tone="info">
                  {marketing?.facebook}
                </Text>
              </Column>
              <Column units={6}>
                <Text variant="title1">{`${intl.formatMessage(
                  messages.whatsappLabel
                )}: `}</Text>
                <Text variant="action2" tone="info">
                  {marketing?.whatsapp}
                </Text>
                <FlexSpacer />
                <Text variant="title1">{`${intl.formatMessage(
                  messages.gtmIdLabel
                )}: `}</Text>
                <Text variant="action2" tone="info">
                  {marketing?.gtmId}
                </Text>
              </Column>
            </Columns>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AffiliateMarketingInfo
