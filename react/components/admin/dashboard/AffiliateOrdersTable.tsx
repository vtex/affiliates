import type { TableColumn, UseSortReturn } from '@vtex/admin-ui'
import {
  Flex,
  Table,
  DataViewControls,
  FlexSpacer,
  Pagination,
  useTableState,
  useDataViewState,
  usePaginationState,
  DataView,
  useToast,
  IconGear,
  Dropdown,
  useDropdownState,
  Skeleton,
  Stack,
  Text,
  tag,
  experimental_ComboboxMultipleField as ComboboxMultipleField,
  experimental_ComboboxMultiplePopover as ComboboxMultiplePopover,
  experimental_useComboboxMultipleState as useComboboxMultipleState,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'
import type {
  AffiliateOrdersSortingField,
  QueryAffiliateOrdersArgs,
} from 'vtex.affiliates-commission-service'

import {
  AFFILIATES_ORDERS_EXPORT_LIMIT,
  PAGE_SIZE,
  INITIAL_PAGE,
  MAX_PAGE_SIZE,
} from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import DatesFilter from './DatesFilter'
import GET_AFFILIATES_ORDERS from '../../../graphql/getAffiliatesOrders.graphql'
import GET_AFFILIATES from '../../../graphql/getAffiliates.graphql'
import GET_AFFILIATES_SCROLL from '../../../graphql/getAffiliatesScroll.graphql'
import EXPORT_ORDERS from '../../../graphql/exportAffiliatesOrders.graphql'
import type { AffiliatesOrdersQueryReturnType } from '../../../typings/tables'
import { setSortOrder } from '../../../utils/shared'
import ExportTableDataControl from '../shared/ExportTableDataControl'
import StatusTableCell from './StatusTableCell'
import TableActions from '../shared/TableActions'
import { VIEW_DETAILS_ICON } from '../../../utils/icons'
import Totalizers from './Totalizers'
import OrderIdTableCell from './OrderIdTableCell'
import TotalValueDisclaimer from './TotalValueDisclaimer'

type TableColumns = {
  id: string
  orderId: string
  affiliateId: string
  status: string
  orderDate: string | null
  orderTotal: number
  orderTotalCommission: number
}

interface Affiliate {
  id: string
  name: string
  email: string
}

interface GetAffiliateScrollReturn {
  getAffiliatesScroll: Affiliate[]
}

interface StatusItemType {
  value: string
  label: string
}

interface ComboboxItemType {
  value: string
  name: string
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
  const statusItems: StatusItemType[] = [
    {
      value: '',
      label: intl.formatMessage(messages.orderStatusLabel),
    },
    {
      value: 'ORDER_CREATED',
      label: intl.formatMessage(messages.orderStatusCreatedLabel),
    },
    {
      value: 'PAYMENT_APPROVED',
      label: intl.formatMessage(messages.orderStatusPaidLabel),
    },
    {
      value: 'PAYMENT_PENDING',
      label: intl.formatMessage(messages.orderStatusPendingLabel),
    },
    {
      value: 'INVOICED',
      label: intl.formatMessage(messages.orderStatusInvoicedLabel),
    },
    {
      value: 'CANCEL',
      label: intl.formatMessage(messages.orderStatusCancelLabel),
    },
  ]

  const initialStatusLabel = query?.status
    ? statusItems.find((item) => item.value === query.status)?.label ?? ''
    : statusItems[0].label

  // We make checks to see if the user passed a querystring if so we need to initialize our values with the query values
  const statusInitialValue = query?.status
    ? { value: query.status, label: initialStatusLabel }
    : {
        value: '',
        label: intl.formatMessage(messages.orderStatusLabel),
      }

  const startDateInitialValue = query?.startDate
    ? new Date(query.startDate)
    : minInitialDate

  const endDateInitialValue = query?.endDate
    ? new Date(query.endDate)
    : new Date()

  minInitialDate.setMonth(minInitialDate.getMonth() - 3)
  const [startDate, setStartDate] = useState(startDateInitialValue)
  const [endDate, setEndDate] = useState(endDateInitialValue)
  // We need to do this because of a circular dependency
  const [sortState, setSortState] = useState<UseSortReturn>()
  const [affiliatesOrdersIds, setAffiliateOrdersIds] = useState<
    string[] | undefined
  >([])

  const view = useDataViewState()
  // This is a hack for when we have a page in the querystring
  // If the pagination.paginate setTotal function change in the future this may not be necessary
  const hasQueryWithPageLoaded = useRef(!query?.page)

  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
    initialPage: query?.page ? parseInt(query.page, 10) : 1,
  })

  const dict = useMemo(() => {
    return new Map<string, string>()
  }, [])

  const combobox = useComboboxMultipleState({
    getOptionValue: (option: ComboboxItemType) => option.value,
    renderOption: (option: ComboboxItemType) => (
      <>
        {option.name} - {option.value}
      </>
    ),
    renderTag: (option: ComboboxItemType) => option.name,
    timeoutMs: 500,
  })

  const {
    data: affiliatesData,
    refetch,
    loading: queryLoading,
  } = useQuery(GET_AFFILIATES, {
    variables: {
      page: INITIAL_PAGE,
      pageSize: MAX_PAGE_SIZE,
      filter: {
        searchTerm: combobox.deferredValue ?? null,
        affiliateList:
          affiliatesOrdersIds?.length !== 0 ? affiliatesOrdersIds : null,
      },
    },
    notifyOnNetworkStatusChange: true,
  })

  const { data: affiliatesScrollData } = useQuery<GetAffiliateScrollReturn>(
    GET_AFFILIATES_SCROLL,
    {
      variables: {
        filter: {
          searchTerm: combobox.deferredValue ?? null,
          affiliateList: null,
        },
      },
      notifyOnNetworkStatusChange: true,
    }
  )

  const allAffiliatesData = combobox.deferredValue
    ? affiliatesData?.getAffiliates?.data?.map((affiliate: Affiliate) => ({
        value: affiliate.id,
        name: affiliate.name,
      }))
    : []

  useEffect(() => {
    const hasAllIds = affiliatesOrdersIds?.reduce(
      (acc, cur) => dict.has(cur) && acc,
      true
    )

    if (!hasAllIds) {
      refetch({
        page: INITIAL_PAGE,
        pageSize: MAX_PAGE_SIZE,
        filter: {
          searchTerm: combobox.deferredValue ?? null,
          affiliateList: affiliatesOrdersIds,
        },
      })
    }

    affiliatesData?.getAffiliates?.data?.map((affiliate: Affiliate) => {
      if (affiliate.id && !dict.has(affiliate.id)) {
        return dict.set(affiliate.id, affiliate.name ?? '')
      }

      return ''
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliatesData?.getAffiliates?.data, dict])

  useEffect(() => {
    if (combobox.deferredValue === '') {
      combobox.setMatches([])
    } else {
      combobox.setLoading(queryLoading)
      combobox.setMatches(allAffiliatesData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combobox.deferredValue, queryLoading])

  const statusState = useDropdownState({
    items: statusItems,
    itemToString: (item: StatusItemType | null) => item?.label ?? '',
    initialSelectedItem: statusInitialValue,
    onSelectedItemChange: (item) => {
      setQuery({ ...query, status: item.selectedItem?.value })
    },
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

  const columns: Array<TableColumn<TableColumns>> = [
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
      id: 'name',
      header: 'Nome',
      resolver: {
        type: 'root',
        render: ({ item, context }) => {
          if (context.status === 'loading' || !dict.get(item.affiliateId)) {
            return <Skeleton csx={{ height: 24 }} />
          }

          return (
            <tag.div>
              <Text>{dict.get(item.affiliateId)}</Text>
            </tag.div>
          )
        },
      },
    },
    {
      id: 'status',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableStatusColumnLabel
      ),
      width: 210,
      resolver: {
        type: 'root',
        render: StatusTableCell,
      },
    },
    {
      id: 'orderDate',
      header: intl.formatMessage(
        messages.affiliatesOrdersTableOrderDateColumnLabel
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
      resolver: {
        type: 'currency',
        locale,
        currency,
      },
      header: () => {
        return (
          <Flex>
            <span>
              {intl.formatMessage(
                messages.affiliatesOrdersTableOrderTotalColumnLabel
              )}
            </span>
            <TotalValueDisclaimer />
          </Flex>
        )
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
      width: 120,
      resolver: {
        type: 'root',
        render: function actionsRender({ item, context }) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }

          return (
            <Stack csx={{ justifyContent: 'center', height: 64 }}>
              <TableActions actions={tableActions(item)} />
            </Stack>
          )
        },
      },
    },
  ]

  let affiliateIdFilter = null

  if (combobox.selectedItems.length) {
    affiliateIdFilter = combobox.selectedItems.map((item) => {
      dict.has(item.value) ? null : dict.set(item.value, item.name)

      return item.value
    })
  }

  const { data, loading } = useQuery<
    AffiliatesOrdersQueryReturnType,
    QueryAffiliateOrdersArgs
  >(GET_AFFILIATES_ORDERS, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      filter: {
        affiliateId: affiliateIdFilter ?? null,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        status: statusState.selectedItem?.value,
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
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    const itemsAffiliatesIds = data?.affiliateOrders.data.map((item) => {
      return item.affiliateId
    })

    setAffiliateOrdersIds(itemsAffiliatesIds)
  }, [data])

  const [exportData, { loading: exportLoading }] = useMutation(EXPORT_ORDERS, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      affiliates: affiliatesScrollData?.getAffiliatesScroll,
      filter: {
        affiliateId: combobox.selectedItems ?? null,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        status: statusState.selectedItem?.value,
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

  const dataGridState = useTableState<TableColumns>({
    columns,
    length: 10,
    items: data ? data.affiliateOrders.data : [],
    view,
  })

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
        <ComboboxMultipleField
          state={combobox}
          id="search"
          label={intl.formatMessage(
            messages.affiliatesOrdersTableSearchPlaceholder
          )}
        />
        <ComboboxMultiplePopover state={combobox} />
        <Dropdown
          items={statusItems}
          state={statusState}
          label="status"
          renderItem={(item: StatusItemType | null) => item?.label}
          variant="tertiary"
          csx={{ width: 185 }}
        />
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
      <Table state={dataGridState} />
    </DataView>
  )
}

export default AffiliateOrdersTable
