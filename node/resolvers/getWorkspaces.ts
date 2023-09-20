export const getWorkspaces = async (_: unknown, __: unknown, ctx: Context) => {
  const { workspaces } = ctx.clients
  const result = await workspaces.list(ctx.vtex.account)

  return result
}
