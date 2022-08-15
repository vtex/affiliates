import type { TableColumn, UseSortReturn } from '@vtex/admin-ui'
import {
  Flex,
  Tag,
  IconGear,
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
  Dropdown,
  useDropdownState,
  Stack,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'

import { PAGE_SIZE } from '../../../utils/constants'
import { messages } from '../../../utils/messages'
import GET_AFFILIATES from '../../../graphql/getAffiliates.graphql'
import { setSortOrder } from '../../../utils/shared'
import TableActions from '../shared/TableActions'
import { EDIT_ICON, VIEW_DETAILS_ICON } from '../../../utils/icons'

type TableColumns = {
  affiliateId: string
  name: string
  storeName: string
  email: string
  phone: string
  isApproved: boolean
}

interface IsApprovedItemType {
  value: string
  label: string
}

const AffiliatesTable: FC = () => {
  const intl = useIntl()

  // We need to do this because of a circular dependency
  const [sortState, setSortState] = useState<UseSortReturn>()
  const { navigate } = useRuntime()

  const view = useDataViewState()

  const initialValues = {
    value: 'any',
    label: intl.formatMessage(messages.affiliatesTableIsApprovedTextAny),
  }

  const pagination = usePaginationState({
    pageSize: PAGE_SIZE,
  })

  const { value, onChange, onClear } = useSearchState({
    timeout: 500,
  })

  const tableActions = useCallback(
    (item: TableColumns) => {
      return [
        {
          label: intl.formatMessage(messages.detailsLabel),
          icon: VIEW_DETAILS_ICON,
          handleOnClick: () => {
            navigate({
              page: 'admin.app.affiliates.affiliate-detail',
              params: {
                affiliateId: item.affiliateId,
              },
            })
          },
        },
        {
          label: intl.formatMessage(messages.editLabel),
          icon: EDIT_ICON,
          handleOnClick: () => {
            navigate({
              page: 'admin.app.affiliates.affiliate-edit',
              params: {
                affiliateId: item.affiliateId,
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
      id: 'affiliateId',
      header: intl.formatMessage(
        messages.affiliatesTableAffiliateIdColumnLabel
      ),
    },
    {
      id: 'name',
      header: intl.formatMessage(messages.affiliatesTableNameColumnLabel),
    },
    {
      id: 'storeName',
      header: intl.formatMessage(messages.affiliatesTableStoreNameColumnLabel),
    },
    {
      id: 'email',
      header: intl.formatMessage(messages.affiliatesTableEmailColumnLabel),
    },
    {
      id: 'phone',
      header: intl.formatMessage(messages.affiliatesTablePhoneColumnLabel),
    },
    {
      id: 'isApproved',
      header: intl.formatMessage(messages.affiliatesTableIsApprovedColumnLabel),
      resolver: {
        type: 'plain',
        render: ({ data }) =>
          data ? (
            <Stack csx={{ justifyContent: 'center', height: 64 }}>
              <Tag
                label={intl.formatMessage(
                  messages.affiliatesTableIsApprovedTextTrue
                )}
                variant="green"
              />
            </Stack>
          ) : (
            <Stack csx={{ justifyContent: 'center', height: 64 }}>
              <Tag
                label={intl.formatMessage(
                  messages.affiliatesTableIsApprovedTextFalse
                )}
                variant="gray"
              />
            </Stack>
          ),
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

  const isApprovedItems: IsApprovedItemType[] = [
    {
      value: 'any',
      label: intl.formatMessage(messages.affiliatesTableIsApprovedTextAny),
    },
    {
      value: 'true',
      label: intl.formatMessage(messages.affiliatesTableIsApprovedTextTrue),
    },
    {
      value: 'false',
      label: intl.formatMessage(messages.affiliatesTableIsApprovedTextFalse),
    },
  ]

  const isApprovedState = useDropdownState({
    items: isApprovedItems,
    itemToString: (item: IsApprovedItemType | null) => item?.label ?? '',
    initialSelectedItem: initialValues,
  })

  const { data, loading } = useQuery(GET_AFFILIATES, {
    variables: {
      page: pagination.currentPage,
      pageSize: PAGE_SIZE,
      filter: {
        searchTerm: value ?? null,
        isApproved:
          isApprovedState.selectedItem?.value === 'any'
            ? undefined
            : isApprovedState.selectedItem?.value === 'true' ?? false,
      },
      sorting: sortState?.by
        ? {
            field: sortState.by, // as AffiliateSortField
            order: setSortOrder(sortState.order),
          }
        : undefined,
    },
    onCompleted: (resultData) => {
      if (pagination.total !== resultData.getAffiliates.pagination.total) {
        pagination.paginate({
          type: 'setTotal',
          total: resultData ? resultData.getAffiliates.pagination.total : 0,
        })
      }

      if (resultData.getAffiliates.data.length > 0) {
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

  const dataGridState = useTableState<TableColumns>({
    columns,
    length: 6,
    items: data ? data.getAffiliates.data : [],
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
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder={intl.formatMessage(
            messages.affiliatesTableSearchPlaceholder
          )}
        />
        <Flex align="center">
          {intl.formatMessage(messages.affiliatesTableIsApprovedColumnLabel)}
          <Dropdown
            items={isApprovedItems}
            state={isApprovedState}
            label="isApproved"
            renderItem={(item: IsApprovedItemType | null) => item?.label}
            variant="tertiary"
            csx={{ width: 120 }}
          />
        </Flex>
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

export default AffiliatesTable
