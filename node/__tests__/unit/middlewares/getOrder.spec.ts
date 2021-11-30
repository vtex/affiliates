import { getOrder } from '../../../middlewares/getOrder'

describe('getOrder middleware', () => {
  it('Should save the order info in the state', () => {
    const next = jest.fn()

    const ctxMock = {
      clients: {
        oms: {
          order: jest.fn().mockResolvedValueOnce({
            id: '123',
          }),
        },
      },
      state: {},
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
      body: {
        orderId: '123',
      },
    } as unknown as StatusChangeContext

    return getOrder(ctxMock, next).then(() => {
      expect(ctxMock.state).toHaveProperty('order')
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should throw error if any', () => {
    const next = jest.fn()

    const ctxMock = {
      clients: {
        oms: {
          order: jest.fn().mockRejectedValueOnce(new Error('Error')),
        },
      },
      state: {},
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
      body: {
        orderId: '123',
      },
    } as unknown as StatusChangeContext

    return expect(getOrder(ctxMock, next)).rejects.toThrow(
      'Error getting the order'
    )
  })
})
