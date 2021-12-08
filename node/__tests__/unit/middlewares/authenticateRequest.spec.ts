import { authenticateRequest } from '../../../middlewares/authenticateRequest'

describe('authenticateRequest middleware', () => {
  const next = jest.fn()

  it('Should throw error if no appToken or appKey was passed', () => {
    const ctxMock = {
      headers: {},
      clients: {
        authentication: {
          getAuthToken: jest.fn(),
        },
        licenseManager: {
          canAccessResource: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(authenticateRequest(ctxMock, next)).rejects.toThrowError(
      'Missing appKey or appToken'
    )
  })

  it('Should throw error if token has no access to masterdata', () => {
    const ctxMock = {
      headers: {
        'x-vtex-api-appkey': 'appKey',
        'x-vtex-api-apptoken': 'appToken',
      },
      clients: {
        authentication: {
          getAuthToken: jest.fn().mockResolvedValueOnce({ token: 'token' }),
        },
        licenseManager: {
          canAccessResource: jest.fn().mockResolvedValueOnce(false),
        },
      },
    } as unknown as Context

    return expect(authenticateRequest(ctxMock, next)).rejects.toThrowError(
      'Unauthorized'
    )
  })

  it('Should call next if everything is ok', () => {
    const ctxMock = {
      headers: {
        'x-vtex-api-appkey': 'appKey',
        'x-vtex-api-apptoken': 'appToken',
      },
      clients: {
        authentication: {
          getAuthToken: jest.fn().mockResolvedValueOnce({ token: 'token' }),
        },
        licenseManager: {
          canAccessResource: jest.fn().mockResolvedValueOnce(true),
        },
      },
    } as unknown as Context

    return authenticateRequest(ctxMock, next).then(() => {
      expect(next).toHaveBeenCalled()
    })
  })
})
