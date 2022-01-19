import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  createSystem,
} from '@vtex/admin-ui'

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
        <PageContent csx={{ padding: 5 }}>Dashboard</PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default DashboardPage
