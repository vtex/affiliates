import { DataView, useDataViewState } from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useMemo, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import type { QueryAffiliateOrderArgs } from 'vtex.affiliates-commission-service'
import { useRuntime } from 'vtex.render-runtime'
import { v4 as uuidv4 } from 'uuid'

import GET_ORDER from '../../../graphql/getAffiliateOrder.graphql'
import type { AffiliateOrderQueryReturnType } from '../../../typings/tables'
import OrderInfo from './OrderInfo'
import OrderItemsTable from './OrderItemsTable'

const OrderContent: FC = () => {
  const {
    route: {
      params: { orderId },
    },
  } = useRuntime()

  const view = useDataViewState()

  const { data, loading } = useQuery<
    AffiliateOrderQueryReturnType,
    QueryAffiliateOrderArgs
  >(GET_ORDER, {
    variables: {
      orderId,
    },
    onCompleted: () => {
      view.setStatus({
        type: 'ready',
      })
    },
  })

  // Controls the loading state of the table
  useEffect(() => {
    if (loading && view.status !== 'loading') {
      view.setStatus({
        type: 'loading',
      })
    }
  }, [loading, view])

  const orderItemsWithId = useMemo(() => {
    return data?.affiliateOrder.orderItems.map((item) => {
      return {
        ...item,
        id: uuidv4(),
        price: item.price / 100,
      }
    })
  }, [data])

  return (
    <DataView state={view}>
      <OrderInfo order={data?.affiliateOrder} />
      <OrderItemsTable data={orderItemsWithId} view={view} />
    </DataView>
  )
}

export default OrderContent
