import { setAffiliateOnOrderForm } from '../../../resolvers/setAffiliateOnOrderForm'

describe('setAffiliateOnOrderForm resolver', () => {
  it('Should return an error if id is not valid', () => {
    const mockProps = {
      affiliateId: 'lo ja',
      orderFormId: '123',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn(),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(
      setAffiliateOnOrderForm({}, mockProps, mockCtx)
    ).rejects.toThrow('Affiliate ID is not valid')
  })

  it('Should return an error if affiliate is not valid', () => {
    const mockProps = {
      affiliateId: 'loja',
      orderFormId: '123',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValue({
            isApproved: false,
          }),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(
      setAffiliateOnOrderForm({}, mockProps, mockCtx)
    ).rejects.toThrow('Affiliate is not valid')
  })

  it('Should update the customData with the affiliateId', () => {
    const mockProps = {
      affiliateId: 'loja',
      orderFormId: '123',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValue({
            isApproved: true,
          }),
        },
        checkout: {
          setSingleCustomData: jest.fn(),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as Context

    return setAffiliateOnOrderForm({}, mockProps, mockCtx).then(() => {
      expect(mockCtx.clients.checkout.setSingleCustomData).toBeCalled()
    })
  })

  it('Should throw an error if setSingleCustomData fails', () => {
    const mockProps = {
      affiliateId: 'loja',
      orderFormId: '123',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValue({
            isApproved: true,
          }),
        },
        checkout: {
          setSingleCustomData: jest
            .fn()
            .mockRejectedValueOnce(new Error('error')),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(
      setAffiliateOnOrderForm({}, mockProps, mockCtx)
    ).rejects.toThrow('Error setting affiliate on order form')
  })
})
