export type AuthTokens = {
  appToken: string
  appKey: string
}

export type GetAuthTokenResponse = {
  authStatus: string
  token: string
  expires: number
}
