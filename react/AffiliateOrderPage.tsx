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

import OrderContent from './components/admin/affiliateOrder/OrderContent'
import { messages } from './utils/messages'

const [ThemeProvider] = createSystem({
  key: 'affiliates-order',
})

const AffiliateOrderPage: FC = () => {
  const {
    navigate,
    route: {
      params: { orderId },
    },
  } = useRuntime()

  const intl = useIntl()

  const handleBackAction = () => {
    navigate({
      page: 'admin.app.affiliates.dashboard',
    })
  }

  return (
    <ThemeProvider>
      <Page>
        <PageHeader onPopNavigation={handleBackAction}>
          <PageTitle>{`${intl.formatMessage(
            messages.orderLabel
          )}: ${orderId}`}</PageTitle>
        </PageHeader>
        <PageContent>
          <OrderContent />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default AffiliateOrderPage
