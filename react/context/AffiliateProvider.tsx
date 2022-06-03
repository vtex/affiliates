import type { FC } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import React, { useMemo, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import type { QueryAffiliateOrdersArgs } from 'vtex.affiliates-commission-service'

import AffiliateContext from './AffiliateContext'
import GET_AFFILIATE_BY_EMAIL from '../graphql/getAffiliateByEmail.graphql'
import GET_AFFILIATES_ORDERS from '../graphql/getAffiliatesOrders.graphql'
import type { AffiliatesOrdersQueryReturnType } from '../typings/tables'
import type { Affiliate } from '../typings/affiliate'
import { PAGE_SIZE, INITIAL_PAGE } from '../utils/constants'

const AffiliateProvider: FC = (props) => {
  // It is worth to metion that the alpha had slug as the affiliateId, thats why is has this name
  // And thats why we compare this querystring affiliateId with the affiliate slug
  const {
    route: {
      params: { affiliateId: slug },
    },
  } = useRuntime()

  const date = new Date()
  const defaultStartDate = new Date(date.getFullYear(), date.getMonth())

  const [startDate] = useState(defaultStartDate)
  const [endDate] = useState(date)

  const {
    orderForm: { clientProfileData },
  } = useOrderForm()

  const { data: affiliateReturn, refetch: refetchAffiliate } = useQuery(
    GET_AFFILIATE_BY_EMAIL,
    {
      variables: { email: clientProfileData ? clientProfileData.email : '' },
      skip: !clientProfileData,
    }
  )

  const affiliate: Affiliate = useMemo(() => {
    return affiliateReturn?.getAffiliateByEmail
  }, [affiliateReturn])

  const { data: ordersReturn, refetch: refetchOrders } = useQuery<
    AffiliatesOrdersQueryReturnType,
    QueryAffiliateOrdersArgs
  >(GET_AFFILIATES_ORDERS, {
    variables: {
      page: INITIAL_PAGE,
      pageSize: PAGE_SIZE,
      filter: {
        affiliateId: affiliate?.id,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      },
    },
    skip: !affiliate,
  })

  return (
    <AffiliateContext.Provider
      value={{
        isValid: affiliate?.isApproved,
        isLogged: affiliate?.slug === slug,
        refetchAffiliate,
        refetchOrders,
        affiliate,
        orders: ordersReturn?.affiliateOrders.data,
        totalizer: ordersReturn?.affiliateOrders.totalizers,
      }}
    >
      {props.children}
    </AffiliateContext.Provider>
  )
}

export default AffiliateProvider
