import coBody from 'co-body'

import { validateCreate } from '../../../middlewares/validateCreate'

describe('validateCreate middleware', () => {
  const next = jest.fn()

  jest
    .spyOn(coBody, 'json')
    .mockResolvedValueOnce({
      slug: 'loja a',
      name: 'Loja A',
      email: 'loja@email.com',
    })
    .mockResolvedValue({
      slug: 'lojaa',
      name: 'Loja A',
      email: 'loja@email.com',
    })

  it('Should return error if slug is invalid', () => {
    const mockCtx = {
      clients: {
        affiliates: {
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
