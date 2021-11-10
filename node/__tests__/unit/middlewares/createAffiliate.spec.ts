import { createAffiliate } from '../../../middlewares/createAffiliate'

describe('createAffiliate', () => {
  const next = jest.fn()

  it('Should call save function', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          save: jest.fn(),
        },
      },
      state: {
        affiliate: {
          slug: 'lojaa',
          isApproved: true,
          name: 'Loja A',
          email: 'loja@email.com',
        },
      },
      vtex: { logger: { error: jest.fn() } },
    } as unknown as Context

    return createAffiliate(mockCtx, next).then(() => {
      expect(mockCtx.clients.affiliates.save).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should throw error message on error saving to md', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          save: jest.fn().mockRejectedValueOnce(new Error('error')),
        },
      },
      state: {
        affiliate: {
          slug: 'lojaa',
          isApproved: true,
          name: 'Loja A',
          email: 'loja@email.com',
        },
      },
      vtex: { logger: { error: jest.fn() } },
    } as unknown as Context

    return expect(createAffiliate(mockCtx, next)).rejects.toThrow(
      'Error saving the new affiliate'
    )
  })
})
