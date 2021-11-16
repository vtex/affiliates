import { validateCreate } from '../../../middlewares/validateCreate'

describe('validateCreate middleware', () => {
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

    return expect(validateCreate(mockCtx, next)).rejects.toThrow(
      'Slug is not valid, must be alphanumeric'
    )
  })

  it('Should return error if slug is already in use', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'lojaa' }),
          search: jest.fn(),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateCreate(mockCtx, next)).rejects.toThrow(
      'Affiliate already exists(slug is already in use)'
    )
  })

  it('Should return error if email is already in use', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(''),
          search: jest.fn().mockResolvedValueOnce([{ id: 'lojaa' }]),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateCreate(mockCtx, next)).rejects.toThrow(
      'Affiliate already exists(email is already in use)'
    )
  })

  it('Should have the affiliate inside the context state if no errors were found', () => {
    const mockCtx = {
      state: {
        affiliate: undefined,
      },
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(''),
          search: jest.fn().mockResolvedValueOnce([]),
        },
      },
      req: {},
    } as unknown as Context

    return validateCreate(mockCtx, next).then(() => {
      expect(mockCtx.state.affiliate).toStrictEqual({
        slug: 'lojaa',
        name: 'Loja A',
        email: 'loja@email.com',
      })

      expect(next).toHaveBeenCalled()
    })
  })
})
