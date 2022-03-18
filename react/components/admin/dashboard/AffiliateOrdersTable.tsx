import type { DataGridColumn } from '@vtex/admin-ui'
import {
  Select,
  useQuerySearchState,
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
import React, { useRef, useCallback, useEffect, useState } from 'react'
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
import Totalizers from './Totalizers'
import OrderIdTableCell from './OrderIdTableCell'

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
  const {
    navigate,
    culture: { locale, currency },
    query,
    setQuery,
  } = useRuntime()

  const minInitialDate = new Date()

  // We make checks to see if the user passed a querystring if so we need to initialize our values with the query values
  const statusInitialValue = query?.status ?? 'any'
  const startDateInitialValue = query?.startDate
    ? new Date(query.startDate)
    : minInitialDate

  const endDateInitialValue = query?.endDate
    ? new Date(query.endDate)
    : new Date()

  minInitialDate.setMonth(minInitialDate.getMonth() - 3)
  const [startDate, setStartDate] = useState(startDateInitialValue)
  const [endDate, setEndDate] = useState(endDateInitialValue)
  const [statusFilter, setStatusFilter] = useState<string>(statusInitialValue)
  // We need to do this because of a circular dependency
  const [sortState, setSortState] = useState<UseSortReturn>()
  const view = useDataViewState()
  // This is a hack for when we have a page in the querystring
  // If the pagination.paginate setTotal function change in the future this may not be necessary
  const hasQueryWithPageLoaded = useRef(!query?.page)

  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
    initialPage: query?.page ? parseInt(query.page, 10) : 1,
  })

  const searchState = useQuerySearchState({
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
      resolver: {
        type: 'root',
        render: OrderIdTableCell,
      },
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

        // This is a hack for when we have a page in the querystring
        // If the pagination.paginate setTotal function change in the future this may not be necessary
        if (!hasQueryWithPageLoaded.current) {
          hasQueryWithPageLoaded.current = true
          pagination.paginate({
            type: 'navigate',
            page: query?.page ? parseInt(query.page, 10) : 1,
          })
        }
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

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(event.target.value)
      setQuery({ ...query, status: event.target.value })
    },
    [setStatusFilter, setQuery, query]
  )

  const handleStartDateChange = useCallback(
    (date: Date) => {
      setStartDate(date)
      setQuery({ ...query, startDate: date.toISOString() })
    },
    [setStartDate, setQuery, query]
  )

  const handleEndDateChange = useCallback(
    (date: Date) => {
      setEndDate(date)
      setQuery({ ...query, endDate: date.toISOString() })
    },
    [setEndDate, setQuery, query]
  )

  useEffect(() => {
    if (pagination.currentPage.toString() !== query?.page) {
      // This is a hack for when we have a page in the querystring
      // If the pagination.paginate setTotal function change in the future this may not be necessary
      if (!hasQueryWithPageLoaded.current) {
        return
      }

      setQuery({ ...query, page: pagination.currentPage })
    }
  }, [pagination.currentPage, query, setQuery])

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
      {data && !loading && (
        <Totalizers totalizers={data.affiliateOrders.totalizers} />
      )}
      <DataViewControls>
        <Search
          id="search"
          state={searchState}
          placeholder={intl.formatMessage(
            messages.affiliatesOrdersTableSearchPlaceholder
          )}
        />
        <Select
          csx={{ height: 40, width: 185 }}
          label={intl.formatMessage(messages.orderStatusLabel)}
          value={statusFilter}
          onChange={handleSelectChange}
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
          onChangeStartDate={(date: Date) => handleStartDateChange(date)}
          onChangeEndDate={(date: Date) => handleEndDateChange(date)}
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
