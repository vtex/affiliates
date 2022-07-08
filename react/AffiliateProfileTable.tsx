import React from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_useTableProportion as useTableProportion,
} from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { storeMessages } from './utils/messages'
import { useProfileTable } from './hooks/useProfileTable'
import useAffiliate from './context/useAffiliate'
import { usePagination } from './hooks/usePagination'
import { PAGE_SIZE } from './utils/constants'

function AffiliateProfileTable() {
  const affiliate = useAffiliate()
  const { ordersPagination } = useAffiliate()
  const intl = useIntl()

  const columns = [
    {
      id: 'orderId',
      title: 'ID',
    },
    {
      id: 'orderDate',
      title: intl.formatMessage(storeMessages.dateProfileTable),
    },
    {
      id: 'orderTotal',
      title: intl.formatMessage(storeMessages.totalProfileTable),
    },
    {
      id: 'orderTotalCommission',
      title: intl.formatMessage(storeMessages.commissionProfileTable),
    },
    {
      id: 'status',
      title: 'Status',
    },
  ]

  const affiliateOrders = useProfileTable(affiliate.orders)

  const ordersData = affiliate ? affiliateOrders : []

  const { sizedColumns } = useTableProportion({
    columns,
    ratio: [1, 0.3, 0.3, 0.3, 0.3],
  })

  const relatedMeasures =
    ordersData.length > 15 ? { size: PAGE_SIZE } : { size: ordersData.length }

  const measures = useTableMeasures(relatedMeasures)

  const { ...paginationProps } = usePagination()

  const pagination = {
    ...paginationProps,
    textOf: intl.formatMessage(storeMessages.prepositionProfileTable),
    totalItems: ordersPagination?.total,
  }

  return (
    <section className="mw9 mr-auto ml-auto my-3">
      {affiliate.orders ? (
        <div>
          <Table
            className="mr-auto ml-auto"
            measures={measures}
            columns={sizedColumns}
            items={ordersData}
            fullWidth
            density="high"
            indexColumnLabel="Index"
          >
            <Table.Pagination {...pagination} />
          </Table>
        </div>
      ) : (
        <></>
      )}
    </section>
  )
}

export default AffiliateProfileTable
