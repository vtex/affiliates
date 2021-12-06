import { getClient } from '../../../middlewares/getClient'

describe('getClient Middleware', () => {
  const next = jest.fn()

  it('Should save the client info inside the state if found', () => {
    const ctxMock = {
      clients: {
        masterdata: {
          searchDocuments: jest.fn().mockResolvedValueOnce([
            {
              id: '123',
              email: 'email@test.com',
              name: 'Test Client',
              affiliateId: '123',
              affiliateStartDate: '2020-01-01',
            },
          ]),
        },
      },
      state: {
        order: {
          clientProfileData: {
            userProfileId: '123',
          },
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return getClient(ctxMock, next).then(() => {
      expect(ctxMock.state).toHaveProperty('client')
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should do nothing if the client was not found', () => {
    const ctxMock = {
      clients: {
        masterdata: {
          searchDocuments: jest.fn().mockResolvedValueOnce([]),
        },
      },
      state: {
        order: {
          clientProfileData: {
            userProfileId: '123',
          },
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return getClient(ctxMock, next).then(() => {
      expect(ctxMock.state).not.toHaveProperty('client')
    })
  })

  it('Should throw error if any on searching the client', () => {
    const ctxMock = {
      clients: {
        masterdata: {
          searchDocuments: jest.fn().mockRejectedValueOnce(new Error('Error')),
        },
      },
      state: {
        order: {
          clientProfileData: {
            userProfileId: '123',
          },
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    const nextMock = jest.fn()

    return expect(getClient(ctxMock, nextMock)).rejects.toThrow(
      'Error getting the client'
    )
  })
})
