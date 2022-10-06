import CustomGraphQLError from '@vtex/api/lib/errors/customGraphQLError'

import { updateAffiliate } from '../../../resolvers/updateAffiliate'

describe('updateAffiliate resolver', () => {
  it('Should return error if slug is invalid', () => {
    const updateParams = {
      affiliateId: 'any',
      updateAffiliate: {
        slug: 'Invalid Slug',
        name: 'New name',
        email: 'New email',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError(
      'Update Affiliate validation error',
      [
        {
          message: 'Slug is not valid, must be alphanumeric',
          code: 'SlugNotAlphanumeric',
        },
      ]
    )

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn(),
          search: jest.fn(),
        },
      },
      req: {},
    } as unknown as Context

    return expect(updateAffiliate(null, updateParams, mockCtx)).rejects.toThrow(
      expected
    )
  })

  it('Should return error if slug not found', () => {
    const updateParams = {
      affiliateId: 'IDNotFound',
      updateAffiliate: {
        name: 'New name',
        email: 'New email',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError(
      'Update Affiliate validation error',
      [
        {
          message:
            'Affiliate not found, is this the email used by the affiliate you are trying to update?',
          code: 'AffiliateNotFound',
        },
      ]
    )

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce(null),
          search: jest.fn(),
        },
      },
      req: {},
    } as unknown as Context

    return expect(updateAffiliate(null, updateParams, mockCtx)).rejects.toThrow(
      expected
    )
  })

  it('Should return error if slug is already in use by another affiliate', () => {
    const updateParams = {
      affiliateId: 'validSlug',
      updateAffiliate: {
        name: 'New name',
        email: 'any email',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError(
      'Update Affiliate validation error',
      [
        {
          message: 'Affiliate url is already in use',
          code: 'URLInUse',
        },
      ]
    )

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'Valid id' }),
          search: jest
            .fn()
            .mockResolvedValueOnce([{ id: 'Valid id2', email: 'Equal slug' }]),
        },
      },
      req: {},
    } as unknown as Context

    return expect(updateAffiliate(null, updateParams, mockCtx)).rejects.toThrow(
      expected
    )
  })

  it('Should return error if email is already in use by another affiliate', () => {
    const updateParams = {
      affiliateId: 'validSlug',
      updateAffiliate: {
        name: 'New name',
        email: 'Equal email',
        isApproved: true,
      },
    }

    const expected = new CustomGraphQLError(
      'Update Affiliate validation error',
      [
        {
          message: 'Affiliate already exists (email is already in use)',
          code: 'EmailUsedByOtherAffiliate',
        },
      ]
    )

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'Valid id' }),
          search: jest
            .fn()
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([{ id: 'Valid id2', email: 'Equal email' }]),
        },
      },
      req: {},
    } as unknown as Context

    return expect(updateAffiliate(null, updateParams, mockCtx)).rejects.toThrow(
      expected
    )
  })

  it('Should have the affiliate inside the context state if no errors were found', () => {
    const updateParams = {
      affiliateId: 'validId',
      updateAffiliate: {
        name: 'New name',
        email: 'New email',
        isApproved: true,
      },
    }

    const mockCtx = {
      clients: {
        affiliates: {
          get: jest.fn().mockResolvedValueOnce({ id: 'Valid id' }),
          search: jest.fn().mockResolvedValue([]),
          update: jest.fn(),
        },
      },
      req: {},
    } as unknown as Context

    return updateAffiliate(null, updateParams, mockCtx).then(() => {
      expect(mockCtx.clients.affiliates.update).toHaveBeenCalledWith(
        updateParams.affiliateId,
        updateParams.updateAffiliate
      )
    })
  })
})
