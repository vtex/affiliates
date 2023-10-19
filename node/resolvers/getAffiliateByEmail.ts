import type { Affiliates } from '../typings/affiliates'
import { findDocumentsByField } from '../utils/shared'

type Props = {
  email: string
}

export const getAffiliateByEmail = async (
  _: unknown,
  { email }: Props,
  { clients: { affiliates } }: Context
) => {
  const [affiliateData] = await findDocumentsByField<Affiliates>(
    affiliates,
    'email',
    email
  )

  if (!affiliateData) {
    return null
  }

  return affiliateData
}
