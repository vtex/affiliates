import type { FC } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'

import AffiliateContext from './AffiliateContext'
import GET_AFFILIATE_BY_EMAIL from '../graphql/getAffiliateByEmail.graphql'

const AffiliateProvider: FC = (props) => {
  // It is worth to metion that the alpha had slug as the affiliateId, thats why is has this name
  // And thats why we compare this querystring affiliateId with the affiliate slug
  const {
    route: {
      params: { affiliateId: slug },
    },
  } = useRuntime()

  const {
    orderForm: { clientProfileData },
  } = useOrderForm()

  const { data: affiliateReturn } = useQuery(GET_AFFILIATE_BY_EMAIL, {
    variables: { email: clientProfileData ? clientProfileData.email : '' },
    skip: !clientProfileData,
  })

  const affiliate = affiliateReturn?.getAffiliateByEmail

  return (
    <AffiliateContext.Provider
      value={{
        isValid: affiliate?.isApproved,
        isLogged: affiliate?.slug === slug,
      }}
    >
      {props.children}
    </AffiliateContext.Provider>
  )
}

export default AffiliateProvider
