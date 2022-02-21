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
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import AffiliateForm from './components/admin/affiliates/form/AffiliateForm'
import { messages } from './utils/messages'

const [ThemeProvider] = createSystem({
  key: 'affiliates-add',
})

const AffiliateAddPage: FC = () => {
  const intl = useIntl()
  const { navigate } = useRuntime()

  const handleBackAction = () => {
    navigate({
      page: 'admin.app.affiliates.affiliate-management',
    })
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader onPopNavigation={handleBackAction}>
            <PageTitle>
              {intl.formatMessage(messages.addAffiliateTitle)}
            </PageTitle>
          </PageHeader>
          <PageContent>
            <AffiliateForm />
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AffiliateAddPage
