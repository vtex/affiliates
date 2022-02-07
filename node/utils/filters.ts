import type { AffiliatesFilterInput } from 'vtex.affiliates'

export const parseAffiliatesFilters = ({
  searchTerm,
  isApproved,
}: AffiliatesFilterInput) => {
  const where = []

  if (searchTerm) {
    where.push(
      `(id="*${searchTerm}*" OR storeName="*${searchTerm}*" OR email="*${searchTerm}*")`
    )
  }

  if (isApproved !== undefined && isApproved !== null) {
    where.push(`isApproved=${isApproved}`)
  }

  return where.join(' AND ')
}
