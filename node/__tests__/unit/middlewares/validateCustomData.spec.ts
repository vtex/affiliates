import { validateCustomData } from '../../../middlewares/validateCustomData'
import { APP_CUSTOM_DATA } from '../../../utils/constants'

describe('validateCustomData middleware', () => {
  const next = jest.fn()

  it('Should return if customData was not found in order', () => {
    const ctxMock = {
      clients: {
        affiliates: {
          get: jest.fn(),
        },
      },
      state: {
        order: {
          customData: {
            id: 'Not our app',
          },
        },
      },
    } as unknown as StatusChangeContext

    return validateCustomData(ctxMock, next).then(() => {
      expect(ctxMock.clients.affiliates.get).not.toHaveBeenCalled()
    })
  })

  it('Should throw error if affiliate is not approved', () => {
    const ctxMock = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({
            id: '123',
            isApproved: false,
          }),
        },
      },
      state: {
        order: {
          customData: {
            customApps: [
              {
                id: APP_CUSTOM_DATA.id,
                fields: {
                  affiliateId: '123',
                },
                major: 1,
              },
            ],
          },
        },
      },
    } as unknown as StatusChangeContext

    return expect(validateCustomData(ctxMock, next)).rejects.toThrow(
      'Affiliate is not valid'
    )
  })

  it('Should call next if everything is ok', () => {
    const ctxMock = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({
            id: '123',
            isApproved: true,
          }),
        },
      },
      state: {
        order: {
          customData: {
            customApps: [
              {
                id: APP_CUSTOM_DATA.id,
                fields: {
                  affiliateId: '123',
                },
                major: 1,
              },
            ],
          },
        },
      },
    } as unknown as StatusChangeContext

    return validateCustomData(ctxMock, next).then(() => {
      expect(next).toHaveBeenCalled()
    })
  })
})
