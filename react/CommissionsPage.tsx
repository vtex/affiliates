import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  createSystem,
} from '@vtex/admin-ui'

import CommissionsTabs from './components/admin/commissions/CommissionsTabs'

const [ThemeProvider] = createSystem({
  key: 'affiliates-commissions',
})

const CommissionsPage: FC = () => {
  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageTitle>Page Title</PageTitle>
        </PageHeader>
        <PageContent csx={{ padding: 5 }}>
          <CommissionsTabs />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default CommissionsPage
