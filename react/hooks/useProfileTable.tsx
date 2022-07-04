/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import type { AffiliatesOrdersData } from '../typings/tables'
import ProfileStatusTag from '../components/store/ProfileStatusTag'

interface OrderTableItem {
  orderId: string
  orderDate: string
  orderTotal: string
  orderTotalCommission: string
  status: JSX.Element
}

export function useProfileTable(
  ordersArray: AffiliatesOrdersData[] | undefined
) {
  const orders = ordersArray
  const intl = useIntl()
  const {
    culture: { currency },
  } = useRuntime()

  const ordersTable: OrderTableItem[] = []

  if (orders === undefined) {
    return []
  }

  orders.map((item) => {
    const tableItem = {
      orderId: item.orderId,
      orderDate: intl.formatDate(item.orderDate),
      orderTotal: intl.formatNumber(item.orderTotal, {
        style: 'currency',
        currency,
      }),
      orderTotalCommission: intl.formatNumber(item.orderTotalCommission, {
        style: 'currency',
        currency,
      }),
      status: <ProfileStatusTag key={item.orderId} status={item.status} />,
    }

    return ordersTable.push(tableItem)
  })

  return ordersTable
}
