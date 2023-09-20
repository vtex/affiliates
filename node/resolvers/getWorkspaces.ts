import { ACCOUNT } from '@vtex/api'

export const getWorkspaces = async (_: unknown, __: unknown, ctx: Context) => {
  const { workspaces } = ctx.clients
  const result = await workspaces.list(ACCOUNT)

  return result
}
