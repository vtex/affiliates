import type { QueryGetAffiliatesArgs } from 'vtex.affiliates'

import { getAffiliates } from '../../../resolvers/getAffiliates'

describe('getAffiliates resolver', () => {
  it('Should return affiliates with sort and filter', () => {
    const queryArgs = {
      page: 1,
      pageSize: 10,
      filter: {
        searchTerm: 'loja',
        isApproved: true,
      },
      sorting: {
        field: 'isApproved',
        order: 'ASC',
      },
    } as QueryGetAffiliatesArgs

    const expectedWhere = `(id="*loja*" OR storeName="*loja*" OR email="*loja*" OR name="*loja*" OR phone="*loja*") AND isApproved=true`
    const expectedSort = `isApproved ASC`
    const mockCtx = {
      clients: {
        affiliates: {
          searchRaw: jest.fn(),
        },
      },
    } as unknown as Context

    return getAffiliates(null, queryArgs, mockCtx).then(() => {
      expect(mockCtx.clients.affiliates.searchRaw).toHaveBeenCalledWith(
        { page: 1, pageSize: 10 },
        ['_all'],
        expectedSort,
        expectedWhere
      )
    })
  })

  it('Should return affiliates without sort and filter', () => {
    const queryArgs = {
      page: 1,
      pageSize: 10,
      filter: undefined,
      sorting: undefined,
    } as QueryGetAffiliatesArgs

    const expectedWhere = undefined
    const expectedSort = undefined
    const mockCtx = {
      clients: {
        affiliates: {
          searchRaw: jest.fn(),
        },
      },
    } as unknown as Context

    return getAffiliates(null, queryArgs, mockCtx).then(() => {
      expect(mockCtx.clients.affiliates.searchRaw).toHaveBeenCalledWith(
        { page: 1, pageSize: 10 },
        ['_all'],
        expectedSort,
        expectedWhere
      )
    })
  })
})
