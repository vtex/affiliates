import { addAffiliate } from '../../../resolvers/addAffiliate'

describe('addAffiliate mutation', () => {
  it('Should return error if slug is invalid', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'Invalid Slug',
      },
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn(),
          search: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(
      addAffiliate(null, newAffiliateParams, mockCtx)
    ).rejects.toThrow('Slug is not valid, must be alphanumeric')
  })

  it('Should return error if slug is already in use', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'validSlug',
      },
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'validSlug' }),
          search: jest.fn(),
        },
      },
    } as unknown as Context

    return expect(
      addAffiliate(null, newAffiliateParams, mockCtx)
    ).rejects.toThrow('Affiliate already exists(slug is already in use)')
  })

  it('Should return error if email is already in use', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'validSlug',
        email: 'alreadyUsedEmail@email.com',
      },
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(null),
          search: jest.fn().mockResolvedValueOnce([{ id: 'validSlug' }]),
        },
      },
    } as unknown as Context

    return expect(
      addAffiliate(null, newAffiliateParams, mockCtx)
    ).rejects.toThrow('Affiliate already exists(email is already in use)')
  })

  it('Should add a new affiliate if no errors were found', () => {
    const newAffiliateParams = {
      newAffiliate: {
        slug: 'validSlug',
        email: 'alreadyUsedEmail@email.com',
        name: 'affiliate name',
        isApproved: true,
      },
    }

    const mdFields = {
      email: 'alreadyUsedEmail@email.com',
      name: 'affiliate name',
      isApproved: true,
      slug: 'validSlug',
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(null),
          search: jest.fn().mockResolvedValueOnce([]),
          save: jest.fn().mockResolvedValueOnce({ DocumentId: 'newAffiliate' }),
        },
      },
    } as unknown as Context

    return addAffiliate(null, newAffiliateParams, mockCtx).then(() => {
      expect(mockCtx.clients.affiliates.save).toHaveBeenCalledWith(mdFields)
    })
  })
})
