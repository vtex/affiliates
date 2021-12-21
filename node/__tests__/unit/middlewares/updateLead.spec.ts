import { updateLead } from '../../../middlewares/updateLead'

describe('updateLead middleware', () => {
  const next = jest.fn()

  it('Should update the affiliation info with the affiliate data', () => {
    const ctxMock = {
      clients: {
        userAffiliation: {
          saveOrUpdate: jest.fn(),
        },
      },
      state: {
        userProfileId: 'clientId',
        email: 'clientEmail',
        affiliate: 'affiliateId',
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return updateLead(ctxMock, next).then(() => {
      expect(ctxMock.clients.userAffiliation.saveOrUpdate).toHaveBeenCalled()
    })
  })

  it('Should throw an error if the affiliation info could not be updated', () => {
    const ctxMock = {
      clients: {
        userAffiliation: {
          saveOrUpdate: jest.fn().mockRejectedValueOnce(new Error('error')),
        },
      },
      state: {
        userProfileId: 'clientId',
        email: 'clientEmail',
        affiliate: 'affiliateId',
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return expect(updateLead(ctxMock, next)).rejects.toThrow(
      'Error updating the lead'
    )
  })
})
