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
import { useIntl } from 'react-intl'

import AffiliateOrdersTable from './components/admin/dashboard/AffiliateOrdersTable'
import { messages } from './utils/messages'

const [ThemeProvider] = createSystem({
  key: 'affiliates-dashboard',
})

const DashboardPage: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader>
            <PageTitle>
              {intl.formatMessage(messages.dashboardPageTitle)}
            </PageTitle>
          </PageHeader>
          <PageContent>
            <AffiliateOrdersTable />
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default DashboardPage
