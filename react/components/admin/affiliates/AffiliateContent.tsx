import {
  Toolbar,
  ToolbarButton,
  DataViewControls,
  DataView,
  useDataViewState,
  useToolbarState,
  FlexSpacer,
  Toggle,
  Text,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import type { Affiliate, QueryGetAffiliateArgs } from 'vtex.affiliates'
import { useIntl } from 'react-intl'

import GET_AFFILIATE from '../../../graphql/getAffiliate.graphql'
import AffiliateGeneralInfo from './AffiliateGeneralInfo'
import AffiliateAddressInfo from './AffiliateAddressInfo'
import AffiliateMarketingInfo from './AffiliateMarketingInfo'
import LoadingBox from '../shared/LoadingBox'
import { messages } from '../../../utils/messages'

type AffiliateQueryReturn = {
  getAffiliate: Affiliate
}

const AffiliateContent: FC = () => {
  const {
    route: {
      params: { affiliateId },
    },
  } = useRuntime()

  const intl = useIntl()

  const view = useDataViewState()
  const toolbar = useToolbarState()

  const { data, loading } = useQuery<
    AffiliateQueryReturn,
    QueryGetAffiliateArgs
  >(GET_AFFILIATE, {
    variables: {
      affiliateId,
    },
    onCompleted: () => {
      view.setStatus({
        type: 'ready',
      })
    },
  })

  // Controls the loading state of the view
  useEffect(() => {
    if (loading && view.status !== 'loading') {
      view.setStatus({
        type: 'loading',
      })
    }
  }, [loading, view])

  const showActions = () => {
    if (loading) {
      return <LoadingBox csx={{ width: 'full', height: 72 }} />
    }

    return (
      <>
        <Text variant="title1">{`${intl.formatMessage(
          messages.activeLabel
        )}?`}</Text>
        <Toggle checked={data?.getAffiliate.isApproved ?? false} />
        <FlexSpacer />
        <Toolbar state={toolbar}>
          <ToolbarButton variant="adaptative-dark">{`${intl.formatMessage(
            messages.editLabel
          )}`}</ToolbarButton>
        </Toolbar>
      </>
    )
  }

  return (
    <DataView state={view}>
      <DataViewControls>{showActions()}</DataViewControls>
      <AffiliateGeneralInfo affiliate={data?.getAffiliate} loading={loading} />
      <AffiliateAddressInfo
        address={data?.getAffiliate.address}
        loading={loading}
      />
      <AffiliateMarketingInfo
        marketing={data?.getAffiliate.marketing}
        loading={loading}
      />
    </DataView>
  )
}

export default AffiliateContent
