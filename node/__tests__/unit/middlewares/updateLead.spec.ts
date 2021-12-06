import { updateLead } from '../../../middlewares/updateLead'

describe('updateLead middleware', () => {
  const next = jest.fn()

  it('Should update the client info with the affiliate data', () => {
    const ctxMock = {
      clients: {
        masterdata: {
          updatePartialDocument: jest.fn(),
        },
      },
      state: {
        client: {
          id: 'clientId',
        },
        affiliate: 'affiliateId',
      },
      vtex: {
        logger: {
          error: jest.fn(),
        },
      },
    } as unknown as StatusChangeContext

    return updateLead(ctxMock, next).then(() => {
      expect(
        ctxMock.clients.masterdata.updatePartialDocument
      ).toHaveBeenCalled()
    })
  })

  it('Should throw an error if the client info could not be updated', () => {
    const ctxMock = {
      clients: {
        masterdata: {
          updatePartialDocument: jest
            .fn()
            .mockRejectedValueOnce(new Error('error')),
        },
      },
      state: {
        client: {
          id: 'clientId',
        },
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
