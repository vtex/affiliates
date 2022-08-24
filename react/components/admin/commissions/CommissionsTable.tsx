import {
  useModalState,
  Skeleton,
  useSearchState,
  Search,
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
} from '@vtex/admin-ui'
import type { TableColumn, UseSortReturn } from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useCallback, useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'
import type {
  QueryCommissionsBySkuArgs,
  CommissionsBySkuSortingField,
} from 'vtex.affiliates-commission-service'

import GET_COMMISSIONS from '../../../graphql/getCommissions.graphql'
import UPDATE_COMMISSION from '../../../graphql/updateCommission.graphql'
import EXPORT_COMMISSIONS from '../../../graphql/exportCommissions.graphql'
import {
  COMMISSIONS_TABLE_EXPORT_LIMIT,
  PAGE_SIZE,
} from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import type { CommissionsQueryReturnType } from '../../../typings/tables'
import EditCommissionModal from './EditCommissionModal'
import ExportTableDataControl from '../shared/ExportTableDataControl'
import { setSortOrder } from '../../../utils/shared'
import TableActions from '../shared/TableActions'
import { EDIT_ICON } from '../../../utils/icons'

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

  const { value, onChange, onClear } = useSearchState({
    timeout: 500,
  })

  const { data, loading } = useQuery<
    CommissionsQueryReturnType,
    QueryCommissionsBySkuArgs
  >(GET_COMMISSIONS, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      filter: {
        id: value ?? null,
      },
      sorting: sortState?.by
        ? {
            field: sortState.by as CommissionsBySkuSortingField,
            order: setSortOrder(sortState.order),
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
              id: value ?? null,
            },
            sorting: sortState?.by
              ? {
                  field: sortState.by as CommissionsBySkuSortingField,
                  order: setSortOrder(sortState.order),
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

  const [exportData, { loading: exportLoading }] = useMutation(
    EXPORT_COMMISSIONS,
    {
      variables: {
        filter: {
          id: value ?? null,
        },
        sorting: sortState?.by
          ? {
              field: sortState.by as CommissionsBySkuSortingField,
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
    }
  )

  const tableActions = useCallback(
    (item: TableColumns) => {
      return [
        {
          label: intl.formatMessage(messages.editLabel),
          icon: EDIT_ICON,
          handleOnClick: () => {
            setSelectedRow(item)
            modal.setVisible(true)
          },
        },
      ]
    },
    [intl, setSelectedRow, modal]
  )

  const columns: Array<TableColumn<TableColumns>> = [
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
    {
      id: 'actions',
      header: () => <IconGear />,
      width: 120,
      resolver: {
        type: 'root',
        render: function percentageRender({ item, context }) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }

          return <TableActions actions={tableActions(item)} />
        },
      },
    },
  ]

  const dataGridState = useTableState<TableColumns>({
    columns,
    length: 3,
    items: data ? data.commissionsBySKU.data : [],
    view,
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
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder={intl.formatMessage(
            messages.commissionsTableSearchPlaceholder
          )}
        />
        <ExportTableDataControl
          maxResults={COMMISSIONS_TABLE_EXPORT_LIMIT}
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
