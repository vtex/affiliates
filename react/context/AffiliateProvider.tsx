import { useOrderForm } from 'vtex.order-manager/OrderForm'
import type { FC } from 'react'
import React, { useMemo, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import type {
  QueryAffiliateOrdersArgs,
  QueryAffiliateOrderArgs,
} from 'vtex.affiliates-commission-service'

import AffiliateContext from './AffiliateContext'
import GET_AFFILIATE_BY_EMAIL from '../graphql/getAffiliateByEmail.graphql'
import GET_AFFILIATES_ORDERS from '../graphql/getAffiliatesOrders.graphql'
import GET_AFFILIATE_ORDER from '../graphql/getAffiliateOrder.graphql'
import type {
  AffiliatesOrdersQueryReturnType,
  AffiliateOrderQueryReturnType,
} from '../typings/tables'
import type { Affiliate } from '../typings/affiliate'
import { PAGE_SIZE } from '../utils/constants'

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

  const { data: affiliateReturn, refetch: refetchAffiliate } = useQuery(
    GET_AFFILIATE_BY_EMAIL,
    {
      variables: { email: clientProfileData ? clientProfileData.email : '' },
      skip: !clientProfileData,
    }
  )

  const [orderId, setOrderId] = useState('')

  const [pagination, setPagination] = useState({
    tableSize: PAGE_SIZE,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: PAGE_SIZE,
  })

  const minInitialDate = new Date()

  const startDateInitialValue = minInitialDate

  const endDateInitialValue = new Date()

  minInitialDate.setMonth(minInitialDate.getMonth() - 3)
  const [startDate, setStartDate] = useState(startDateInitialValue)
  const [endDate, setEndDate] = useState(endDateInitialValue)
  const [statusFilter, setStatusFilter] = useState('')

  const affiliate: Affiliate = useMemo(() => {
    return affiliateReturn?.getAffiliateByEmail
  }, [affiliateReturn])

  const {
    data: ordersReturn,
    refetch: refetchOrders,
    loading: affiliateOrdersLoading,
  } = useQuery<AffiliatesOrdersQueryReturnType, QueryAffiliateOrdersArgs>(
    GET_AFFILIATES_ORDERS,
    {
      variables: {
        page: pagination.currentPage,
        pageSize: pagination.tableSize,
        filter: {
          affiliateId: [affiliate?.id ?? ''],
          dateRange: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          status: statusFilter,
        },
      },
      skip: !affiliate,
    }
  )

  const { data: affiliateOrderData, loading: orderLoading } = useQuery<
    AffiliateOrderQueryReturnType,
    QueryAffiliateOrderArgs
  >(GET_AFFILIATE_ORDER, {
    variables: {
      orderId,
    },
    skip: !orderId,
    fetchPolicy: 'no-cache',
  })

  return (
    <AffiliateContext.Provider
      value={{
        isValid: affiliate?.isApproved,
        isLogged: affiliate?.slug === slug,
        refetchAffiliate,
        refetchOrders,
        setPagination,
        pagination,
        affiliate,
        setStartDate,
        setEndDate,
        setStatusFilter,
        startDate,
        endDate,
        statusFilter,
        minInitialDate,
        affiliateOrderData,
        orderId,
        setOrderId,
        orderLoading,
        affiliateOrdersLoading,
        orders: ordersReturn?.affiliateOrders.data,
        ordersPagination: ordersReturn?.affiliateOrders.pagination,
        totalizer: ordersReturn?.affiliateOrders.totalizers,
        totalizersProfile: ordersReturn?.affiliateOrders.totalizersProfile,
      }}
    >
      {props.children}
    </AffiliateContext.Provider>
  )
}

export default AffiliateProvider
