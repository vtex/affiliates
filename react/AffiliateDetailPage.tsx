import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  createSystem,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import { messages } from './utils/messages'
import AffiliateContent from './components/admin/affiliates/AffiliateContent'

const [ThemeProvider] = createSystem({
  key: 'affiliates-detail',
})

const AffiliateDetailPage: FC = () => {
  const {
    route: {
      params: { affiliateId },
    },
  } = useRuntime()

  const intl = useIntl()

  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageTitle>{`${intl.formatMessage(
            messages.affiliateLabel
          )}: ${affiliateId}`}</PageTitle>
        </PageHeader>
        <PageContent>
          <AffiliateContent />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default AffiliateDetailPage
