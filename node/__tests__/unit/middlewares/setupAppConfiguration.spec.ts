import type { EventContext } from '@vtex/api'

import type { Clients } from '../../../clients'
import { setupAppConfiguration } from '../../../middlewares/setupAppConfiguration'
import { APP_CUSTOM_DATA } from '../../../utils/constants'

describe('setupAppConfiguration middleware', () => {
  it('Should just return if app is already configured', () => {
    const mockCtx = {
      clients: {
        checkout: {
          getOrderFormConfiguration: jest
            .fn()
            .mockReturnValueOnce({ apps: [{ id: APP_CUSTOM_DATA.id }] }),
          setOrderFormConfiguration: jest.fn(),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as EventContext<Clients>

    return setupAppConfiguration(mockCtx).then(() => {
      expect(
        mockCtx.clients.checkout.setOrderFormConfiguration
      ).not.toHaveBeenCalled()
    })
  })

  it('Should save the new orderForm configuration', () => {
    const mockCtx = {
      clients: {
        checkout: {
          getOrderFormConfiguration: jest
            .fn()
            .mockReturnValueOnce({ apps: [] }),
          setOrderFormConfiguration: jest.fn(),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
          info: jest.fn(),
        },
      },
    } as unknown as EventContext<Clients>

    return setupAppConfiguration(mockCtx).then(() => {
      expect(
        mockCtx.clients.checkout.setOrderFormConfiguration
      ).toHaveBeenCalledWith({
        apps: [APP_CUSTOM_DATA],
      })
    })
  })

  it('Should throw error if any occurs on saving', () => {
    const mockCtx = {
      clients: {
        checkout: {
          getOrderFormConfiguration: jest
            .fn()
            .mockReturnValueOnce({ apps: [] }),
          setOrderFormConfiguration: jest
            .fn()
            .mockResolvedValue(new Error('error')),
        },
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as EventContext<Clients>

    return expect(setupAppConfiguration(mockCtx)).rejects.toThrow(
      'Error setting app configurations'
    )
  })
})
