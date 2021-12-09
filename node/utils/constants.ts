export const SUCCESS = 200
export const APP_CUSTOM_DATA = {
  id: 'affiliates',
  fields: ['affiliateId'],
  major: 0,
}

export const ERRORS = {
  missingAuthentication: {
    status: 401,
    message: 'Missing appKey or appToken',
  },
  forbidden: {
    status: 403,
    message: 'Forbidden',
  },
}
