import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  createSystem,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import CommissionsTabs from './components/admin/commissions/CommissionsTabs'
import { messages } from './utils/messages'

const [ThemeProvider] = createSystem({
  key: 'affiliates-commissions',
})

const CommissionsPage: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageTitle>
            {intl.formatMessage(messages.commissionsPageTitle)}
          </PageTitle>
        </PageHeader>
        <PageContent csx={{ padding: 5 }}>
          <CommissionsTabs />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default CommissionsPage
