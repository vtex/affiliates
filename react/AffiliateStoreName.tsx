import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo'

import GET_AFFILIATE_STORE_NAME_QUERY from './graphql/getAffiliateStoreName.graphql'
import { getSlug } from './utils/shared'

type GetAffiliateStoreNameQueryResult = {
  getAffiliateStoreName: string
}

const AffiliateStoreName: FC = () => {
  const slug = useMemo(() => {
    return getSlug()
  }, [])

  const { data, error } = useQuery<GetAffiliateStoreNameQueryResult>(
    GET_AFFILIATE_STORE_NAME_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  return (
    <div className="f1 tc mv6">
      <span>{error ? '' : data?.getAffiliateStoreName}</span>
    </div>
  )
}

export default AffiliateStoreName
