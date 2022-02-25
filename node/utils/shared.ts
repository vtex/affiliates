import type { MasterDataEntity } from '@vtex/clients'

// Returns true if the given value is a valid slug
export const isSlugValid = (slug: string): boolean => {
  const regexExp = /^[A-Za-z0-9-_]+/

  const slugTest = slug.match(regexExp)

  if (slugTest && slugTest[0] === slug) {
    return true
  }

  return false
}

export const findDocumentsByField = <T>(
  client: MasterDataEntity<T>,
  field: 'slug' | 'email',
  value: string
) => {
  return client.search(
    {
      page: 1,
      pageSize: 10,
    },
    ['_all'],
    undefined,
    `${field}=${value}`
  )
}
