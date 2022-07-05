import { useCallback } from 'react'

import useAffiliate from '../context/useAffiliate'
import { PAGE_SIZE } from '../utils/constants'

export function usePagination() {
  const { setPagination, pagination } = useAffiliate()

  const onNextClick = useCallback(() => {
    const newPage = pagination ? pagination?.currentPage + 1 : 1
    const itemFrom = pagination ? pagination.currentItemTo + 1 : 1
    const itemTo = pagination ? pagination.tableSize * newPage : 10

    setPagination
      ? setPagination({
          currentPage: newPage,
          currentItemFrom: itemFrom,
          currentItemTo: itemTo,
          tableSize: PAGE_SIZE,
        })
      : () => {}
  }, [pagination, setPagination])

  const onPrevClick = useCallback(() => {
    if (pagination ? pagination.currentPage === 0 : false) return
    const newPage = pagination ? pagination.currentPage - 1 : 1
    const itemFrom = pagination
      ? pagination.currentItemFrom - pagination.tableSize
      : 1

    const itemTo = pagination ? pagination.currentItemFrom - 1 : 10

    setPagination
      ? setPagination({
          currentPage: newPage,
          currentItemFrom: itemFrom,
          currentItemTo: itemTo,
          tableSize: PAGE_SIZE,
        })
      : () => {}
  }, [pagination, setPagination])

  return {
    onNextClick,
    onPrevClick,
    ...pagination,
  }
}
