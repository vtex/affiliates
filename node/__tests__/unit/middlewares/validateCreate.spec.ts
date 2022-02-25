import { validateCreate } from '../../../middlewares/validateCreate'

jest.mock('co-body', () => ({
  json: jest.fn().mockImplementation((req) =>
    Promise.resolve({
      slug: req.slug === 'invalid-slug-test' ? 'loja a' : 'lojaa',
      name: 'Loja A',
      email: 'loja@email.com',
    })
  ),
}))

describe('validateCreate middleware', () => {
  const next = jest.fn()

  it('Should return error if slug is invalid', () => {
    const mockCtx = {
      req: { slug: 'invalid-slug-test' },
      clients: {
        affiliates: {
          search: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(validateCreate(mockCtx, next)).rejects.toThrow(
      'Slug is not valid, must be alphanumeric'
    )
  })

  it('Should return error if slug is already in use', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          search: jest.fn().mockResolvedValue([{ id: 'lojaa' }]),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateCreate(mockCtx, next)).rejects.toThrow(
      'Affiliate already exists (url slug is already in use)'
    )
  })

  it('Should return error if email is already in use', () => {
    const mockCtx = {
      clients: {
        affiliates: {
          search: jest
            .fn()
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([{ id: 'lojaa' }]),
        },
      },
      req: {},
    } as unknown as Context

    return expect(validateCreate(mockCtx, next)).rejects.toThrow(
      'Affiliate already exists(email is already in use)'
    )
  })

  it('Should have the affiliate inside the context state if no errors were found', async () => {
    const mockCtx = {
      state: {
        affiliate: undefined,
      },
      clients: {
        affiliates: {
          search: jest.fn().mockResolvedValue([]),
        },
      },
      req: {},
    } as unknown as Context

    await validateCreate(mockCtx, next).then(() => {
      expect(mockCtx.state.affiliate).toStrictEqual({
        slug: 'lojaa',
        name: 'Loja A',
        email: 'loja@email.com',
      })

      expect(next).toHaveBeenCalled()
    })
  })
})
