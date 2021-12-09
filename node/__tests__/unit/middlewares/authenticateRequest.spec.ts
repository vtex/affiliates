import { authenticateRequest } from '../../../middlewares/authenticateRequest'
import { ERRORS } from '../../../utils/constants'

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
      status: 0,
      message: '',
    } as unknown as Context

    return authenticateRequest(ctxMock, next).then(() => {
      expect(ctxMock.status).toBe(ERRORS.missingAuthentication.status)
      expect(ctxMock.message).toBe(ERRORS.missingAuthentication.message)
    })
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
      status: 0,
      message: '',
    } as unknown as Context

    return authenticateRequest(ctxMock, next).then(() => {
      expect(ctxMock.status).toBe(ERRORS.forbidden.status)
      expect(ctxMock.message).toBe(ERRORS.forbidden.message)
    })
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
