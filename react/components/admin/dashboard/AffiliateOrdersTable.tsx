import type { DataGridColumn } from '@vtex/admin-ui'
import {
  useSearchState,
  Search,
  DataGrid,
  DataViewControls,
  FlexSpacer,
  Pagination,
  useDataGridState,
  useDataViewState,
  usePaginationState,
  DataView,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'
import type {
  AffiliateOrdersSortingField,
  QueryAffiliateOrdersArgs,
} from 'vtex.affiliates-commission-service'
import type { UseSortReturn } from '@vtex/admin-ui/dist/components/DataGrid/hooks/useDataGridSort'

import { PAGE_SIZE } from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import DatesFilter from './DatesFilter'
import GET_AFFILIATES_ORDERS from '../../../graphql/getAffiliatesOrders.graphql'
import type { AffiliatesOrdersQueryReturnType } from '../../../typings/tables'

type TableColumns = {
  id: string
  orderId: string
  affiliateId: string
  status: string
  orderDate: string | null
  orderTotal: number
  orderTotalCommission: number
}

const AffiliateOrdersTable: FC = () => {
  const intl = useIntl()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  // We need to do this because of a circular dependency
  const [sortState, setSortState] = useState<UseSortReturn>()
  const {
    navigate,
    culture: { locale, currency },
  } = useRuntime()

  const view = useDataViewState()

  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
  })

  const searchState = useSearchState({
    timeoutMs: 500,
  })

  const columns: Array<DataGridColumn<TableColumns>> = [
    {
      id: 'orderId',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableOrderIdColumnLabel
      ),
    },
    {
      id: 'affiliateId',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableAffiliateIdColumnLabel
      ),
    },
    {
      id: 'status',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableStatusColumnLabel
      ),
    },
    {
      id: 'orderDate',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableLastUpdatedColumnLabel
      ),
      resolver: {
        type: 'date',
        locale,
        options: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      },
      sortable: true,
    },
    {
      id: 'orderTotal',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableOrderTotalColumnLabel
      ),
      resolver: {
        type: 'currency',
        locale,
        currency,
      },
      sortable: true,
    },
    {
      id: 'orderTotalCommission',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableOrderTotalCommissionColumnLabel
      ),
      resolver: {
        type: 'currency',
        locale,
        currency,
      },
      sortable: true,
    },
  ]

  const { data, loading } = useQuery<
    AffiliatesOrdersQueryReturnType,
    QueryAffiliateOrdersArgs
  >(GET_AFFILIATES_ORDERS, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      filter: {
        affiliateId: searchState.debouncedValue ?? null,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      },
      sorting: sortState?.by
        ? {
            field: sortState.by as AffiliateOrdersSortingField,
            order: sortState.order === 'DSC' ? 'DESC' : 'ASC',
          }
        : undefined,
    },
    onCompleted: (resultData) => {
      if (pagination.total !== resultData.affiliateOrders.pagination.total) {
        pagination.paginate({
          type: 'setTotal',
          total: resultData ? resultData.affiliateOrders.pagination.total : 0,
        })
      }

      if (resultData.affiliateOrders.data.length > 0) {
        view.setStatus({
          type: 'ready',
        })
      } else {
        view.setStatus({
          type: 'empty',
          message: intl.formatMessage(messages.tableNoResults),
        })
      }
    },
    onError: () => {
      view.setStatus({
        type: 'error',
        message: intl.formatMessage(messages.tableDataError),
      })
    },
  })

  const dataGridState = useDataGridState<TableColumns>({
    columns,
    length: 6,
    items: data ? data.affiliateOrders.data : [],
    view,
    onRowClick: (row) => {
      navigate({
        page: 'admin.app.affiliates.order',
        params: {
          orderId: row.orderId,
        },
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
  }, [loading, view, pagination])

  // Controls the sorting state of the table
  useEffect(() => {
    if (
      sortState?.by !== dataGridState.sortState.by ||
      sortState?.order !== dataGridState.sortState.order
    ) {
      setSortState(dataGridState.sortState)
    }
  }, [setSortState, dataGridState.sortState, sortState])

  return (
    <DataView state={view}>
      <DataViewControls>
        <Search
          id="search"
          state={searchState}
          placeholder={intl.formatMessage(
            messages.affiliatesOrdersTableSearchPlaceholder
          )}
        />
        <DatesFilter
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={(date: Date) => setStartDate(date)}
          onChangeEndDate={(date: Date) => setEndDate(date)}
        />
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition={intl.formatMessage(messages.paginationPreposition)}
          subject={intl.formatMessage(messages.paginationSubject)}
          prevLabel={intl.formatMessage(messages.paginationPrevLabel)}
          nextLabel={intl.formatMessage(messages.paginationNextLabel)}
        />
      </DataViewControls>
      <DataGrid state={dataGridState} />
    </DataView>
  )
}

export default AffiliateOrdersTable
