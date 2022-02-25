import { isAffiliateValid } from '../../../resolvers/isAffiliateValid'

describe('isAffiliateValid resolver', () => {
  it('Should return an error if slug is not valid', () => {
    const mockProps = {
      slug: 'lo ja',
    }

    const mockCtx = {
      clients: {
        affiliate: {
          search: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(isAffiliateValid({}, mockProps, mockCtx)).rejects.toThrow(
      'Slug is not valid'
    )
  })

  it('Should return true if affiliate exists and it is approved', async () => {
    const mockProps = {
      slug: 'loja',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          search: jest
            .fn()
            .mockResolvedValueOnce([{ id: 'loja', isApproved: true }]),
        },
      },
    } as unknown as Context

    await isAffiliateValid({}, mockProps, mockCtx).then((data) => {
      expect(mockCtx.clients.affiliates.search).toHaveBeenCalledWith(
        { page: 1, pageSize: 10 },
        ['_all'],
        undefined,
        'slug=loja'
      )
      expect(data).toStrictEqual(true)
    })
  })

  it('Should return false if affiliate exists and it is not approved', async () => {
    const mockProps = {
      slug: 'loja',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          search: jest
            .fn()
            .mockResolvedValueOnce([{ id: 'loja', isApproved: false }]),
        },
      },
    } as unknown as Context

    await isAffiliateValid({}, mockProps, mockCtx).then((data) => {
      expect(mockCtx.clients.affiliates.search).toHaveBeenCalledWith(
        { page: 1, pageSize: 10 },
        ['_all'],
        undefined,
        'slug=loja'
      )
      expect(data).toStrictEqual(false)
    })
  })

  it('Should throw error if affiliate does not exist', async () => {
    const mockProps = {
      slug: 'loja',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          search: jest.fn().mockResolvedValueOnce([]),
        },
      },
    } as unknown as Context

    await expect(isAffiliateValid({}, mockProps, mockCtx)).rejects.toThrow(
      'There is no affiliate with this slug'
    )
  })
})
