import IS_AFFILIATE_VALID_QUERY from '../graphql/isAffiliateValid.graphql'

export const mocks = [
  {
    request: {
      query: IS_AFFILIATE_VALID_QUERY,
      variables: {
        slug: 'validId',
      },
    },
    result: {
      data: {
        isAffiliateValid: true,
      },
    },
  },
  {
    request: {
      query: IS_AFFILIATE_VALID_QUERY,
      variables: {
        slug: 'invalidId',
      },
    },
    result: {
      data: {
        isAffiliateValid: false,
      },
    },
  },
  {
    request: {
      query: IS_AFFILIATE_VALID_QUERY,
      variables: {
        slug: 'malformedId',
      },
    },
    result: {
      data: {
        isAffiliateValid: null,
      },
    },
    error: new Error('Error'),
  },
]
