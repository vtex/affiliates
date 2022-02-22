import SET_ON_ORDER_FORM_MUTATION from '../graphql/setAffiliateOnOrderForm.graphql'

export const mocks = [
  {
    request: {
      query: SET_ON_ORDER_FORM_MUTATION,
      variables: {
        orderFormId: 'mockedOrderFormId',
        slug: 'validId',
      },
    },
    result: jest.fn(() => ({
      data: {
        setAffiliateOnOrderForm: {
          id: 'mockedOrderFormId',
          customData: {
            customApps: [
              {
                fields: {
                  affiliateId: 'validId',
                },
                id: 'mockedAppId',
                major: 1,
              },
            ],
          },
        },
      },
    })),
  },
]
