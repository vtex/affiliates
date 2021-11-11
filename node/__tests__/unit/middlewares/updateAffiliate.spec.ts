import { updateAffiliate } from '../../../middlewares/updateAffiliate'

describe('updateAffiliate', () => {
  const next = jest.fn()

  it('Should call update function', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          update: jest.fn(),
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

    return updateAffiliate(mockCtx, next).then(() => {
      expect(mockCtx.clients.affiliates.update).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should throw error message on error saving to md', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          update: jest.fn().mockRejectedValueOnce(new Error('error')),
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

    return expect(updateAffiliate(mockCtx, next)).rejects.toThrow(
      'Error updating the affiliate'
    )
  })
})
