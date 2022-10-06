import CustomGraphQLError from '@vtex/api/lib/errors/customGraphQLError'

import { addAffiliate } from '../../../resolvers/addAffiliate'

describe('addAffiliate mutation', () => {
  it('Should return error if slug is invalid', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'Invalid Slug',
        email: 'alreadyUsedEmail@email.com',
        name: 'affiliate name',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError('Add Affiliate validation error', [
      {
        message: 'Slug is not valid, must be alphanumeric',
        code: 'SlugNotAlphanumeric',
      },
    ])

    const mockCtx = {
      clients: {
        affiliates: {
          search: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(
      addAffiliate(null, newAffiliateParams, mockCtx)
    ).rejects.toThrow(expected)
  })

  it('Should return error if slug is already in use', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'validSlug',
        email: 'alreadyUsedEmail@email.com',
        name: 'affiliate name',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError('Add Affiliate validation error', [
      {
        message: 'Affiliate url is already in use',
        code: 'URLInUse',
      },
    ])

    const mockCtx = {
      clients: {
        affiliates: {
          search: jest.fn().mockResolvedValue([{ id: 'validSlug' }]),
        },
      },
    } as unknown as Context

    return expect(
      addAffiliate(null, newAffiliateParams, mockCtx)
    ).rejects.toThrow(expected)
  })

  it('Should return error if email is already in use', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'validSlug',
        email: 'alreadyUsedEmail@email.com',
        name: 'affiliate name',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError('Add Affiliate validation error', [
      {
        message: 'Affiliate already exists (email is already in use)',
        code: 'AffiliateAlreadyExists',
      },
    ])

    const mockCtx = {
      clients: {
        affiliates: {
          search: jest
            .fn()
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([{ id: 'validSlug' }]),
        },
      },
    } as unknown as Context

    return expect(
      addAffiliate(null, newAffiliateParams, mockCtx)
    ).rejects.toThrow(expected)
  })

  it('Should add a new affiliate if no errors were found', async () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'validSlug',
        email: 'alreadyUsedEmail@email.com',
        name: 'affiliate name',
        isApproved: true,
      },
    }

    const mdFields = {
      slug: 'validSlug',
      email: 'alreadyUsedEmail@email.com',
      name: 'affiliate name',
      isApproved: true,
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(null),
          search: jest.fn().mockResolvedValue([]),
          save: jest.fn().mockResolvedValueOnce({ DocumentId: 'newAffiliate' }),
        },
      },
    } as unknown as Context

    await addAffiliate(null, newAffiliateParams, mockCtx)

    expect(mockCtx.clients.affiliates.save).toHaveBeenCalledWith(mdFields)
  })
})
