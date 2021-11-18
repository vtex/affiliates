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
  const slug = useMemo(() => {
     const splitPathname = window.location?.pathname.split('/')

     return splitPathname && splitPathname[splitPathname.length - 1]
  }, [window.location.pathname])

  const { data, error } = useQuery<IsAffiliateValidQueryResult>(
    IS_AFFILIATE_VALID_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  const isAffiliateValid = data?.isAffiliateValid

  if (isAffiliateValid) return <Valid />

  if (isAffiliateValid === false || error) return <Invalid />

  return null
}

export default AffiliateValidator
