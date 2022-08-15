import {
  DataViewControls,
  DataView,
  useDataViewState,
  Switch,
  Text,
  useModalState,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useCallback, useEffect } from 'react'
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
import UpdateApprovedStatusModal from './UpdateApprovedStatusModal'

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

  const modal = useModalState()
  const view = useDataViewState()

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

  const onToggleClick = useCallback(() => {
    modal.setVisible(true)
  }, [modal])

  const showActions = useCallback(() => {
    if (loading) {
      return <LoadingBox csx={{ width: 'full', height: 72 }} />
    }

    return (
      <>
        <Text variant="title1">{`${intl.formatMessage(
          messages.activeLabel
        )}?`}</Text>
        <Switch
          checked={data?.getAffiliate.isApproved ?? false}
          onChange={onToggleClick}
          label=""
        />
      </>
    )
  }, [loading, intl, data, onToggleClick])

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
      <UpdateApprovedStatusModal
        modal={modal}
        isAffiliateApproved={data?.getAffiliate.isApproved ?? false}
        affiliate={data?.getAffiliate}
      />
    </DataView>
  )
}

export default AffiliateContent
