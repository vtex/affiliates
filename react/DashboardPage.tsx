import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  createSystem,
} from '@vtex/admin-ui'

import AffiliateOrdersTable from './components/admin/dashboard/AffiliateOrdersTable'

const [ThemeProvider] = createSystem({
  key: 'affiliates-dashboard',
})

const DashboardPage: FC = () => {
  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageTitle>Dashboard</PageTitle>
        </PageHeader>
        <PageContent>
          <AffiliateOrdersTable />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default DashboardPage
