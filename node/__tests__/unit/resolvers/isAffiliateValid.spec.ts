import { isAffiliateValid } from '../../../resolvers/isAffiliateValid'

describe('isAffiliateValid resolver', () => {
  it('Should return an error if id is not valid', () => {
    const mockProps = {
      affiliateId: 'lo ja',
    }

    const mockCtx = {
      clients: {
        affiliate: {
          get: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(isAffiliateValid({}, mockProps, mockCtx)).rejects.toThrow(
      'Affiliate ID is not valid'
    )
  })

  it('Should return true if affiliate exists and it is approved', () => {
    const mockProps = {
      affiliateId: 'loja',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest
            .fn()
            .mockResolvedValueOnce({ id: 'loja', isApproved: true }),
        },
      },
    } as unknown as Context

    return isAffiliateValid({}, mockProps, mockCtx).then((data) => {
      expect(mockCtx.clients.affiliates.get).toHaveBeenCalledWith('loja', [
        'id',
        'isApproved',
      ])
      expect(data).toStrictEqual(true)
    })
  })

  it('Should return false if affiliate exists and it is not approved', () => {
    const mockProps = {
      affiliateId: 'loja',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest
            .fn()
            .mockResolvedValueOnce({ id: 'loja', isApproved: false }),
        },
      },
    } as unknown as Context

    return isAffiliateValid({}, mockProps, mockCtx).then((data) => {
      expect(mockCtx.clients.affiliates.get).toHaveBeenCalledWith('loja', [
        'id',
        'isApproved',
      ])
      expect(data).toStrictEqual(false)
    })
  })

  it('Should return false if affiliate does not exist', () => {
    const mockProps = {
      affiliateId: 'loja',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(''),
        },
      },
    } as unknown as Context

    return isAffiliateValid({}, mockProps, mockCtx).then((data) => {
      expect(mockCtx.clients.affiliates.get).toHaveBeenCalledWith('loja', [
        'id',
        'isApproved',
      ])
      expect(data).toStrictEqual(false)
    })
  })
})
