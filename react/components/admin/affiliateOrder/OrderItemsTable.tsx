import type { TableColumn, DataViewState } from '@vtex/admin-ui'
import {
  Skeleton,
  Table,
  DataViewControls,
  FlexSpacer,
  Pagination,
  useTableState,
  usePaginationState,
  DataView,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { messages } from '../../../utils/messages'

type TableColumns = {
  id: string
  skuId: string
  skuName: string
  skuImageUrl: string
  price: number
  quantity: number
  commission: number
}

type OrderItemsTableProps = {
  view: DataViewState
  data?: TableColumns[]
}

const ORDER_ITEMS_TABLE_PAGE_SIZE = 25

const OrderItemsTable: FC<OrderItemsTableProps> = ({ view, data }) => {
  const intl = useIntl()
  const {
    culture: { locale, currency },
  } = useRuntime()

  const pagination = usePaginationState({
    pageSize: ORDER_ITEMS_TABLE_PAGE_SIZE,
  })

  const columns: Array<TableColumn<TableColumns>> = [
    {
      id: 'skuId',
      header: intl.formatMessage(messages.skuIdLabel),
    },
    {
      id: 'skuImageUrl',
      header: intl.formatMessage(messages.skuImageLabel),
      resolver: {
        type: 'image',
        preview: {
          display: true,
          size: 'regular',
          delay: 0,
        },
      },
    },
    {
      id: 'skuName',
      header: intl.formatMessage(messages.skuNameLabel),
    },
    {
      id: 'quantity',
      header: intl.formatMessage(messages.quantityLabel),
    },
    {
      id: 'commission',
      header: intl.formatMessage(messages.commissionLabel),
      resolver: {
        type: 'root',
        render: function percentageRender({ item, context }) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }

          return <span>{item.commission}%</span>
        },
      },
    },
    {
      id: 'price',
      header: intl.formatMessage(messages.priceLabel),
      resolver: {
        type: 'currency',
        locale,
        currency,
      },
    },
  ]

  const dataGridState = useTableState<TableColumns>({
    columns,
    length: 6,
    items: data ? data.slice(pagination.range[0] - 1, pagination.range[1]) : [],
    view,
  })

  useEffect(() => {
    if (data?.length !== pagination.total) {
      pagination.paginate({
        type: 'setTotal',
        total: data?.length ?? 0,
      })
    }
  }, [data, pagination])

  return (
    <DataView state={view}>
      <DataViewControls>
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition={intl.formatMessage(messages.paginationPreposition)}
          subject={intl.formatMessage(messages.paginationSubject)}
          prevLabel={intl.formatMessage(messages.paginationPrevLabel)}
          nextLabel={intl.formatMessage(messages.paginationNextLabel)}
        />
      </DataViewControls>
      <Table state={dataGridState} />
    </DataView>
  )
}

export default OrderItemsTable
