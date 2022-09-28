import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  ThemeProvider,
  ToastProvider,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import CommissionsTabs from './components/admin/commissions/CommissionsTabs'
import { messages } from './utils/messages'

const CommissionsPage: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader>
            <PageHeaderTitle>
              {intl.formatMessage(messages.commissionsPageHeaderTitle)}
            </PageHeaderTitle>
          </PageHeader>
          <PageContent csx={{ padding: 5 }}>
            <CommissionsTabs />
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default CommissionsPage
