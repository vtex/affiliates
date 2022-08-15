import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  createSystem,
  ToastProvider,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'
import type { Affiliate, QueryGetAffiliateArgs } from 'vtex.affiliates'
import { useQuery } from 'react-apollo'

import { messages } from './utils/messages'
import AffiliateForm from './components/admin/affiliates/form/AffiliateForm'
import GET_AFFILIATE from './graphql/getAffiliate.graphql'

const [ThemeProvider] = createSystem()

type AffiliateQueryReturn = {
  getAffiliate: Affiliate
}

const AffiliateEditPage: FC = () => {
  const {
    navigate,
    route: {
      params: { affiliateId },
    },
  } = useRuntime()

  const intl = useIntl()

  const { data } = useQuery<AffiliateQueryReturn, QueryGetAffiliateArgs>(
    GET_AFFILIATE,
    {
      variables: {
        affiliateId,
      },
    }
  )

  const handleBackAction = () => {
    navigate({
      page: 'admin.app.affiliates.affiliate-detail',
      params: {
        affiliateId,
      },
    })
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader onPopNavigation={handleBackAction}>
            <PageHeaderTitle>{`${intl.formatMessage(
              messages.affiliateLabel
            )}: ${affiliateId}`}</PageHeaderTitle>
          </PageHeader>
          <PageContent>
            <AffiliateForm affiliate={data?.getAffiliate} />
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AffiliateEditPage
