import {
  useModalState,
  Skeleton,
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
} from '@vtex/admin-ui'
import type { DataGridColumn } from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'
import type {
  QueryCommissionsBySkuArgs,
  CommissionsBySkuSortingField,
} from 'vtex.affiliates-commission-service'
import type { UseSortReturn } from '@vtex/admin-ui/dist/components/DataGrid/hooks/useDataGridSort'

import GET_COMMISSIONS from '../../../graphql/getCommissions.graphql'
import UPDATE_COMMISSION from '../../../graphql/updateCommission.graphql'
import { PAGE_SIZE } from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import type { CommissionsQueryReturnType } from '../../../typings/tables'
import EditCommissionModal from './EditCommissionModal'

type TableColumns = {
  id: string
  skuId: string
  refId: string | null
  commission: number
}

const CommissionsTable: FC = () => {
  const intl = useIntl()
  const view = useDataViewState()
  const modal = useModalState()
  const showToast = useToast()
  const [selectedRow, setSelectedRow] = useState<TableColumns>()
  const [sortState, setSortState] = useState<UseSortReturn>()
  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
  })

  const searchState = useSearchState({
    timeoutMs: 500,
  })

  const { data, loading } = useQuery<
    CommissionsQueryReturnType,
    QueryCommissionsBySkuArgs
  >(GET_COMMISSIONS, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      filter: {
        id: searchState.debouncedValue ?? null,
      },
      sorting: sortState?.by
        ? {
            field: sortState.by as CommissionsBySkuSortingField,
            order: sortState.order === 'DSC' ? 'DESC' : 'ASC',
          }
        : undefined,
    },
    onCompleted: (resultData) => {
      if (pagination.total !== resultData.commissionsBySKU.pagination.total) {
        pagination.paginate({
          type: 'setTotal',
          total: resultData ? resultData.commissionsBySKU.pagination.total : 0,
        })
      }

      if (resultData.commissionsBySKU.data.length > 0) {
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

  const [updateCommissionMutation, { loading: mutationLoading }] = useMutation(
    UPDATE_COMMISSION,
    {
      refetchQueries: [
        {
          query: GET_COMMISSIONS,
          variables: {
            page: pagination.currentPage,
            pageSize: PAGE_SIZE,
            filter: {
              id: searchState.debouncedValue ?? null,
            },
            sorting: sortState?.by
              ? {
                  field: sortState.by as CommissionsBySkuSortingField,
                  order: sortState.order === 'DSC' ? 'DESC' : 'ASC',
                }
              : undefined,
          },
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        showToast({
          tone: 'positive',
          message: intl.formatMessage(messages.editCommissionSuccessMessage),
        })
        modal.setVisible(false)
      },
      onError: () => {
        showToast({
          tone: 'critical',
          message: intl.formatMessage(messages.editCommissionErrorMessage),
        })
        modal.setVisible(false)
      },
    }
  )

  const columns: Array<DataGridColumn<TableColumns>> = [
    {
      id: 'skuId',
      header: intl.formatMessage(messages.skuIdLabel),
    },
    {
      id: 'refId',
      header: intl.formatMessage(messages.refIdLabel),
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
      sortable: true,
    },
  ]

  const handleRowClick = (item: TableColumns) => {
    setSelectedRow(item)
    modal.setVisible(true)
  }

  const dataGridState = useDataGridState<TableColumns>({
    columns,
    length: 3,
    items: data ? data.commissionsBySKU.data : [],
    view,
    onRowClick: handleRowClick,
  })

  // Controls the loading state of the table
  useEffect(() => {
    if (loading && view.status !== 'loading') {
      view.setStatus({
        type: 'loading',
      })
    }
  }, [loading, view])

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
            messages.commissionsTableSearchPlaceholder
          )}
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
      <EditCommissionModal
        selectedRowId={selectedRow?.id}
        loading={mutationLoading}
        updateFunction={updateCommissionMutation}
        modalState={modal}
      />
    </DataView>
  )
}

export default CommissionsTable
