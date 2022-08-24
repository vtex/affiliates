import {
  Card,
  Stack,
  Heading,
  FlexSpacer,
  Columns,
  Column,
  Text,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import type { Affiliate } from 'vtex.affiliates'

import { messages } from '../../../utils/messages'
import LoadingBox from '../shared/LoadingBox'

type AffiliateGeneralInfoProps = {
  loading: boolean
  affiliate?: Affiliate
}

const AffiliateGeneralInfo: FC<AffiliateGeneralInfoProps> = ({
  affiliate,
  loading,
}) => {
  const intl = useIntl()

  if (loading) {
    return (
      <LoadingBox csx={{ width: 'full', height: 146, marginBottom: '16px' }} />
    )
  }

  return (
    <>
      <Heading>{intl.formatMessage(messages.generalInfoLabel)}</Heading>
      <Card>
        <Stack space="$xs" fluid>
          <Columns spacing={1}>
            <Column units={6}>
              <Text variant="title1">{`${intl.formatMessage(
                messages.nameLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.name}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.storeNameLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.storeName}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.slugLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.slug}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.emailLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.email}
              </Text>
            </Column>
            <Column units={6}>
              <Text variant="title1">{`${intl.formatMessage(
                messages.phoneLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.phone}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.refIdLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.refId}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.documentTypeLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.documentType}
              </Text>
              <FlexSpacer />
              <Text variant="title1">{`${intl.formatMessage(
                messages.documentLabel
              )}: `}</Text>
              <Text variant="action2" tone="info">
                {affiliate?.document}
              </Text>
            </Column>
          </Columns>
        </Stack>
      </Card>
    </>
  )
}

export default AffiliateGeneralInfo
