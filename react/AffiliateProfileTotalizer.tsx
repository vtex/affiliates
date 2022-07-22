import React from 'react'
import { useIntl } from 'react-intl'

import { storeMessages } from './utils/messages'
import ProfileTotalizerItem from './components/store/ProfileTotalizerItem'
import useAffiliate from './context/useAffiliate'

function AffiliateProfileTotalizer() {
  const affiliate = useAffiliate()
  const intl = useIntl()

  return (
    <section className="flex justify-between mw9 ba b--light-gray br3 center mr-auto ml-auto my-3">
      <ProfileTotalizerItem
        value={
          affiliate?.totalizersProfile
            ? affiliate?.totalizersProfile?.totalOngoing
            : 0
        }
        type="approved"
        color="yellow"
        tooltip={intl.formatMessage(
          storeMessages.affiliateProfileApprovedTooltip
        )}
      />
      <ProfileTotalizerItem
        value={
          affiliate?.totalizersProfile
            ? affiliate?.totalizersProfile?.totalCancelled
            : 0
        }
        type="cancelled"
        color="red"
        tooltip={intl.formatMessage(
          storeMessages.affiliateProfileCancelledTooltip
        )}
      />
      <ProfileTotalizerItem
        value={
          affiliate?.totalizersProfile
            ? affiliate?.totalizersProfile?.totalInvoiced
            : 0
        }
        type="invoiced"
        color="green"
        tooltip={intl.formatMessage(
          storeMessages.affiliateProfileInvoicedTooltip
        )}
      />
    </section>
  )
}

export default AffiliateProfileTotalizer
