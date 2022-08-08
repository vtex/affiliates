import React, { useCallback, useReducer } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_useTableProportion as useTableProportion,
  Dropdown,
  InputSearch,
} from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { storeMessages } from './utils/messages'
import { useProfileTable } from './hooks/useProfileTable'
import useAffiliate from './context/useAffiliate'
import { usePagination } from './hooks/usePagination'
import { PAGE_SIZE, MIN_TABLE_SIZE } from './utils/constants'
import { DatesFilter } from './components/store/ProfileFilter/DatesFiler'
import { useSearch } from './hooks/useSearch'

function AffiliateProfileTable() {
  const affiliate = useAffiliate()
  const intl = useIntl()

  const [state, dispatch] = useReducer(useSearch(affiliate.setOrderId), {
    inputValue: '',
  })

  const inputSearch = {
    value: state.inputValue,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'change', value: e.currentTarget.value }),
    onClear: () => {
      dispatch({ type: 'clear' })
    },
    onSubmit: (e: SyntheticEvent) => {
      e.preventDefault()
      dispatch({ type: 'submit' })
    },
    placeholder: intl.formatMessage(storeMessages.searchPlaceholder),
  }

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

  const options = [
    {
      value: '',
      label: intl.formatMessage(storeMessages.affiliatesTableIsApprovedTextAny),
    },
    {
      value: 'ONGOING',
      label: intl.formatMessage(storeMessages.onGoingTitle),
    },
    {
      value: 'CANCEL',
      label: intl.formatMessage(storeMessages.cancelledTitle),
    },
    {
      value: 'INVOICED',
      label: intl.formatMessage(storeMessages.invoicedTitle),
    },
  ]

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      affiliate?.setStatusFilter(event.target.value)
    },
    [affiliate]
  )

  const affiliateOrders = useProfileTable(affiliate?.orders)

  const ordersData = affiliate?.orders ? affiliateOrders : []

  const { sizedColumns } = useTableProportion({
    columns,
    ratio: [1, 0.3, 0.3, 0.3, 0.3],
  })

  const relatedMeasures =
    ordersData.length > PAGE_SIZE
      ? { size: PAGE_SIZE }
      : { size: MIN_TABLE_SIZE }

  const measures = useTableMeasures(relatedMeasures)

  const paginationProps = usePagination()

  const pagination = {
    ...paginationProps,
    textOf: intl.formatMessage(storeMessages.prepositionProfileTable),
    totalItems: affiliate?.ordersPagination?.total,
  }

  const handleStartDateChange = useCallback(
    (date: Date) => {
      affiliate?.setStartDate(date)
    },
    [affiliate]
  )

  const handleEndDateChange = useCallback(
    (date: Date) => {
      affiliate?.setEndDate(date)
    },
    [affiliate]
  )

  const affiliateOrder = useProfileTable(
    affiliate?.affiliateOrderData
      ? [affiliate?.affiliateOrderData.affiliateOrder]
      : []
  )

  const empty = affiliate?.orderId
    ? !!affiliateOrder.length
    : !!ordersData.length

  const loading = affiliate?.orderLoading || affiliate?.affiliateOrdersLoading

  return (
    <section className="mw9 mr-auto ml-auto my-3">
      <div>
        <Table
          loading={loading}
          empty={!loading && !empty}
          emptyState={{
            label: intl.formatMessage(storeMessages.tableEmptyState),
          }}
          className="mr-auto ml-auto"
          measures={measures}
          columns={sizedColumns}
          items={affiliate?.orderId ? affiliateOrder : ordersData}
          fullWidth
          density="high"
          indexColumnLabel="Index"
        >
          <Table.ActionBar className="flex items-center">
            <div className="w5">
              <InputSearch {...inputSearch} />
            </div>
            <div className="ml4">
              {intl.formatMessage(
                storeMessages.affiliatesOrdersTableStatusColumnLabel
              )}
              <Dropdown
                variation="inline"
                options={options}
                value={affiliate?.statusFilter}
                onChange={handleSelectChange}
              />
            </div>
            <DatesFilter
              startDate={affiliate?.startDate}
              endDate={affiliate?.endDate}
              minStartDate={affiliate?.minInitialDate}
              onChangeStartDate={(date: Date) => handleStartDateChange(date)}
              onChangeEndDate={(date: Date) => handleEndDateChange(date)}
            />
          </Table.ActionBar>
          <Table.Pagination {...pagination} />
        </Table>
      </div>
    </section>
  )
}

export default AffiliateProfileTable
