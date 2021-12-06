import { validateLead } from '../../../middlewares/validateLead'

describe('validadeLead middleware', () => {
  it('Should just return if duration is still valid', () => {
    const next = jest.fn()
    const leadStartDate = new Date()

    leadStartDate.setDate(leadStartDate.getDate() - 50)
    const endDate = leadStartDate.toISOString()

    const ctxMock = {
      clients: {
        apps: {
          getAppSettings: jest.fn().mockReturnValue({
            leadDurationInDays: 90,
          }),
        },
      },
      state: {
        client: {
          affiliateId: 'loja',
          affiliateStartDate: endDate,
        },
      },
    } as unknown as StatusChangeContext

    return validateLead(ctxMock, next).then(() => {
      expect(next).not.toHaveBeenCalled()
    })
  })

  it('Should call next if affiliate is valid and the duration has passed', () => {
    const leadStartDate = new Date()
    const next = jest.fn()

    leadStartDate.setDate(leadStartDate.getDate() - 100)
    const endDate = leadStartDate.toISOString()

    const ctxMock = {
      clients: {
        apps: {
          getAppSettings: jest.fn().mockReturnValue({
            leadDurationInDays: 90,
          }),
        },
      },
      state: {
        client: {
          affiliateId: 'loja',
          affiliateStartDate: endDate,
        },
      },
    } as unknown as StatusChangeContext

    return validateLead(ctxMock, next).then(() => {
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should call next if affiliateId in client entity is null', () => {
    const next = jest.fn()

    const ctxMock = {
      clients: {
        apps: {
          getAppSettings: jest.fn().mockReturnValue({
            leadDurationInDays: 90,
          }),
        },
      },
      state: {
        client: {
          affiliateId: null,
          affiliateStartDate: null,
        },
      },
    } as unknown as StatusChangeContext

    return validateLead(ctxMock, next).then(() => {
      expect(next).toHaveBeenCalled()
    })
  })
})
