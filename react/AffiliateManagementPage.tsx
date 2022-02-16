import {
  createSystem,
  Page,
  PageContent,
  PageHeader,
  PageTitle,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import AffiliatesTable from './components/admin/affiliates/AffiliatesTable'
import { messages } from './utils/messages'

const [ThemeProvider] = createSystem({
  key: 'affiliate-management',
})

const AffiliateManagementPage: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageTitle>
            {intl.formatMessage(messages.affiliatesPageTitle)}
          </PageTitle>
        </PageHeader>
        <PageContent>
          <AffiliatesTable />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default AffiliateManagementPage
