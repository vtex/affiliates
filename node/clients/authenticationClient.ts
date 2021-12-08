import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { AuthTokens, GetAuthTokenResponse } from '../typings/auth'

export default class AuthenticationClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.myvtex.com/api`, context, options)
  }

  public async getAuthToken(
    authTokens: AuthTokens
  ): Promise<GetAuthTokenResponse> {
    return this.http.post(
      '/vtexid/apptoken/login',
      { ...authTokens },
      {
        headers: {
          Accept: 'text/plain',
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }
}
