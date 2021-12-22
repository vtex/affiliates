import { getAffiliateLead } from '../../../middlewares/getAffiliateLead'

describe('getAffiliateLead Middleware', () => {
  const next = jest.fn()

  it('Should save the userAffiliation info inside the state if found', () => {
    const ctxMock = {
      clients: {
        userAffiliation: {
          get: jest.fn().mockResolvedValueOnce([
            {
              id: '123',
              affiliateId: '123',
              affiliateStartDate: '2020-01-01',
            },
          ]),
        },
      },
      state: {
        userProfileId: '123',
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return getAffiliateLead(ctxMock, next).then(() => {
      expect(ctxMock.state).toHaveProperty('affiliateLead')
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should do nothing if the user affiliation info was not found', () => {
    const ctxMock = {
      clients: {
        userAffiliation: {
          get: jest.fn().mockResolvedValueOnce(undefined),
        },
      },
      state: {
        userProfileId: '123',
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return getAffiliateLead(ctxMock, next).then(() => {
      expect(ctxMock.state).toHaveProperty('affiliateLead', undefined)
    })
  })

  it('Should throw error if any on searching the affiliation info', () => {
    const ctxMock = {
      clients: {
        userAffiliation: {
          get: jest.fn().mockRejectedValueOnce(new Error('Error')),
        },
      },
      state: {
        userProfileId: '123',
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    const nextMock = jest.fn()

    return expect(getAffiliateLead(ctxMock, nextMock)).rejects.toThrow(
      'Error getting the Affiliate Lead'
    )
  })
})
