import { getOldVersions } from '../utils/schemas'

export async function getSchemas(ctx: Context, next: () => Promise<unknown>) {
  const {
    clients: { schemas, apps },
    state,
    vtex: { logger },
  } = ctx

  const manifest = await apps.getApp(`vtex.affiliates`)
  const versionManifest = manifest?.version.split(`+`)

  try {
    let allSchemas: string[] = []

    const schemaList = await schemas.getSchemas('vtex_affiliates_Affiliates')

    schemaList.forEach((s: any) => {
      allSchemas = [...allSchemas, s.name]
    })

    const allOldSchemas = allSchemas.filter(
      (schema) => !schema.includes(versionManifest[0])
    )

    const oldVersions = getOldVersions(allOldSchemas, versionManifest[0])

    const filteredSchemas = allSchemas.filter(
      (schema) =>
        !schema.includes(versionManifest[0]) &&
        !schema.includes(oldVersions[0]) &&
        !schema.includes(oldVersions[1])
    )

    state.schemas = filteredSchemas
  } catch (err) {
    logger.error({
      metric: 'get-affiliate-schema',
      message: err.message,
    })
    throw new Error('Error getting affiliate schemas')
  }

  await next()
}
