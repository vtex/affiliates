import type { DataGridColumn } from '@vtex/admin-ui'
import {
  Select,
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
  useToast,
  IconGear,
  Skeleton,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'
import type {
  AffiliateOrdersSortingField,
  QueryAffiliateOrdersArgs,
} from 'vtex.affiliates-commission-service'
import type { UseSortReturn } from '@vtex/admin-ui/dist/components/DataGrid/hooks/useDataGridSort'

import {
  AFFILIATES_ORDERS_EXPORT_LIMIT,
  PAGE_SIZE,
} from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import DatesFilter from './DatesFilter'
import GET_AFFILIATES_ORDERS from '../../../graphql/getAffiliatesOrders.graphql'
import EXPORT_ORDERS from '../../../graphql/exportAffiliatesOrders.graphql'
import type { AffiliatesOrdersQueryReturnType } from '../../../typings/tables'
import { setSortOrder } from '../../../utils/shared'
import ExportTableDataControl from '../shared/ExportTableDataControl'
import StatusTableCell from './StatusTableCell'
import TableActions from '../shared/TableActions'
import { VIEW_DETAILS_ICON } from '../../../utils/icons'

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
  const showToast = useToast()

  const minInitialDate = new Date()

  minInitialDate.setMonth(minInitialDate.getMonth() - 3)
  const [startDate, setStartDate] = useState(minInitialDate)
  const [endDate, setEndDate] = useState(new Date())
  const [statusFilter, setStatusFilter] = useState<string>('any')
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

  const tableActions = useCallback(
    (item: TableColumns) => {
      return [
        {
          label: intl.formatMessage(messages.detailsLabel),
          icon: VIEW_DETAILS_ICON,
          handleOnClick: () => {
            navigate({
              page: 'admin.app.affiliates.order',
              params: {
                orderId: item.orderId,
              },
            })
          },
        },
      ]
    },
    [intl, navigate]
  )

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
      resolver: {
        type: 'root',
        render: StatusTableCell,
      },
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
    {
      id: 'actions',
      header: () => <IconGear />,
      width: 44,
      resolver: {
        type: 'root',
        render: function actionsRender({ item, context }) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }

          return <TableActions actions={tableActions(item)} />
        },
      },
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
        status: statusFilter === 'any' ? null : statusFilter,
      },
      sorting: sortState?.by
        ? {
            field: sortState.by as AffiliateOrdersSortingField,
            order: setSortOrder(sortState.order),
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

  const [exportData, { loading: exportLoading }] = useMutation(EXPORT_ORDERS, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      filter: {
        affiliateId: searchState.debouncedValue ?? null,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        status: statusFilter === 'any' ? null : statusFilter,
      },
      sorting: sortState?.by
        ? {
            field: sortState.by as AffiliateOrdersSortingField,
            order: setSortOrder(sortState.order),
          }
        : undefined,
    },
    onCompleted: () => {
      showToast({
        tone: 'positive',
        message: intl.formatMessage(messages.exportReportSuccessMessage),
      })
    },
    onError: () => {
      showToast({
        tone: 'critical',
        message: intl.formatMessage(messages.exportReportErrorMessage),
      })
    },
  })

  const dataGridState = useDataGridState<TableColumns>({
    columns,
    length: 6,
    items: data ? data.affiliateOrders.data : [],
    view,
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
        <Select
          csx={{ height: 40 }}
          label={intl.formatMessage(messages.orderStatusLabel)}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="any">
            {intl.formatMessage(messages.affiliatesTableIsApprovedTextAny)}
          </option>
          <option value="order-created">
            {intl.formatMessage(messages.orderStatusCreatedLabel)}
          </option>
          <option value="payment-approved">
            {intl.formatMessage(messages.orderStatusPaidLabel)}
          </option>
          <option value="invoiced">
            {intl.formatMessage(messages.orderStatusInvoicedLabel)}
          </option>
          <option value="cancel">
            {intl.formatMessage(messages.orderStatusCancelLabel)}
          </option>
        </Select>
        <DatesFilter
          startDate={startDate}
          endDate={endDate}
          minStartDate={minInitialDate}
          onChangeStartDate={(date: Date) => setStartDate(date)}
          onChangeEndDate={(date: Date) => setEndDate(date)}
        />
        <ExportTableDataControl
          maxResults={AFFILIATES_ORDERS_EXPORT_LIMIT}
          totalResults={pagination.total}
          exportAction={exportData}
          loading={exportLoading}
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
