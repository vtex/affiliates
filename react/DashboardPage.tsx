import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  ThemeProvider,
  ToastProvider,
  QueryStateProvider,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import AffiliateOrdersTable from './components/admin/dashboard/AffiliateOrdersTable'
import { messages } from './utils/messages'

const DashboardPage: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader>
            <PageHeaderTitle>
              {intl.formatMessage(messages.dashboardPageHeaderTitle)}
            </PageHeaderTitle>
          </PageHeader>
          <PageContent layout="wide">
            <QueryStateProvider>
              <AffiliateOrdersTable />
            </QueryStateProvider>
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default DashboardPage
