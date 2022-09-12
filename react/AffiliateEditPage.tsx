import type { FC } from 'react'
import React from 'react'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageContent,
  createSystem,
  ToastProvider,
  Spinner,
  Flex,
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

  const { data, loading } = useQuery<
    AffiliateQueryReturn,
    QueryGetAffiliateArgs
  >(GET_AFFILIATE, {
    variables: {
      affiliateId,
    },
    notifyOnNetworkStatusChange: true,
  })

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
            <PageHeaderTop>
              <PageHeaderTitle>{`${intl.formatMessage(
                messages.affiliateLabel
              )}: ${affiliateId}`}</PageHeaderTitle>
            </PageHeaderTop>
          </PageHeader>
          <PageContent>
            {loading ? (
              <Flex justify="center">
                <Spinner size={72} />
              </Flex>
            ) : (
              <AffiliateForm affiliate={data?.getAffiliate} />
            )}
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AffiliateEditPage
