import {
  Button,
  createSystem,
  Page,
  PageContent,
  PageHeader,
  PageTitle,
  PageActions,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import AffiliatesTable from './components/admin/affiliates/AffiliatesTable'
import { messages } from './utils/messages'

const [ThemeProvider] = createSystem({
  key: 'affiliate-management',
})

const AffiliateManagementPage: FC = () => {
  const intl = useIntl()
  const { navigate } = useRuntime()

  const handleAddAffiliate = useCallback(() => {
    navigate({
      page: 'admin.app.affiliates.affiliate-add',
    })
  }, [navigate])

  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageTitle>
            {intl.formatMessage(messages.affiliatesPageTitle)}
          </PageTitle>
          <PageActions>
            <Button onClick={handleAddAffiliate}>
              {intl.formatMessage(messages.addAffiliateTitle)}
            </Button>
          </PageActions>
        </PageHeader>
        <PageContent>
          <AffiliatesTable />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default AffiliateManagementPage
