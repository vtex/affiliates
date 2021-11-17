import type { FC } from 'react'
import React from 'react'
import { useQuery } from 'react-apollo'

import IS_AFFILIATE_VALID_QUERY from './graphql/isAffiliateValid.graphql'

export type IsAffiliateValidQueryResult = {
  isAffiliateValid: boolean
}

type Props = {
  Invalid: React.ComponentType
  Valid: React.ComponentType
}

const AffiliateValidator: FC<Props> = ({ Invalid, Valid }) => {
  const splitPathname = window.location?.pathname.split('/')

  const slug = splitPathname && splitPathname[splitPathname.length - 1]

  const { data, error } = useQuery<IsAffiliateValidQueryResult>(
    IS_AFFILIATE_VALID_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  const isAffiliateValid = data?.isAffiliateValid

  if (isAffiliateValid === true) return <Valid />

  if (isAffiliateValid === false || error) return <Invalid />

  return null
}

export default AffiliateValidator
