import type { FC } from 'react'
import React, { useCallback } from 'react'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  createSystem,
  ToastProvider,
  PageHeaderActions,
  Button,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import { messages } from './utils/messages'
import AffiliateContent from './components/admin/affiliates/AffiliateContent'

const [ThemeProvider] = createSystem()

const AffiliateDetailPage: FC = () => {
  const {
    route: {
      params: { affiliateId },
    },
    navigate,
  } = useRuntime()

  const onEditClick = useCallback(() => {
    navigate({
      page: 'admin.app.affiliates.affiliate-edit',
      params: {
        affiliateId,
      },
    })
  }, [navigate, affiliateId])

  const onAffiliateOrdersClick = useCallback(() => {
    navigate({
      page: 'admin.app.affiliates.dashboard',
      query: `search=${affiliateId}`,
    })
  }, [navigate, affiliateId])

  const intl = useIntl()

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader
            onPopNavigation={() =>
              navigate({
                page: 'admin.app.affiliates.affiliate-management',
              })
            }
          >
            <PageHeaderTitle>{`${intl.formatMessage(
              messages.affiliateLabel
            )}: ${affiliateId}`}</PageHeaderTitle>
            <PageHeaderActions>
              <Button onClick={onAffiliateOrdersClick}>
                {intl.formatMessage(messages.dashboardPageHeaderTitle)}
              </Button>
              <Button onClick={onEditClick}>
                {intl.formatMessage(messages.editLabel)}
              </Button>
            </PageHeaderActions>
          </PageHeader>
          <PageContent>
            <AffiliateContent />
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AffiliateDetailPage
