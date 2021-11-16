import { validateUpdate } from '../../../middlewares/validateUpdate'

describe('validateUpdate middleware', () => {
  const next = jest.fn()

  it('Should return error if slug is invalid', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn(),
          search: jest.fn(),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateUpdate(mockCtx, next)).rejects.toThrow(
      'Slug is not valid, must be alphanumeric'
    )
  })

  it('Should return error if slug not found', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(''),
          search: jest.fn(),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateUpdate(mockCtx, next)).rejects.toThrow(
      'Affiliate not found. Do you really want to update an affiliate?'
    )
  })

  it('Should return error if email is already in use by another affiliate', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'lojaa' }),
          search: jest.fn().mockResolvedValueOnce([{ id: 'loja22' }]),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateUpdate(mockCtx, next)).rejects.toThrow(
      'Email is already in use by another affiliate'
    )
  })

  it('Should have the affiliate inside the context state if no errors were found', () => {
    const mockCtx = {
      state: {
        affiliate: undefined,
      },
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'lojaa' }),
          search: jest.fn().mockResolvedValueOnce([{ id: 'lojaa' }]),
        },
      },
      req: {},
    } as unknown as Context

    return validateUpdate(mockCtx, next).then(() => {
      expect(mockCtx.state.affiliate).toStrictEqual({
        slug: 'lojaa',
        name: 'Loja A',
        email: 'loja@email.com',
      })

      expect(next).toHaveBeenCalled()
    })
  })
})
