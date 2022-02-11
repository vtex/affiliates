import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  createSystem,
  ToastProvider,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import { messages } from './utils/messages'
import AffiliateContent from './components/admin/affiliates/AffiliateContent'

const [ThemeProvider] = createSystem({
  key: 'affiliates-detail',
})

const AffiliateOrderPage: FC = () => {
  const {
    route: {
      params: { affiliateId },
    },
  } = useRuntime()

  const intl = useIntl()

  return (
    <ThemeProvider>
      <ToastProvider>
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
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AffiliateOrderPage
