import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

import GET_AFFILIATE_STORE_NAME_QUERY from './graphql/getAffiliateStoreName.graphql'
import { getSlug } from './utils/shared'

type GetAffiliateStoreNameQueryResult = {
  getAffiliateStoreName: string
}

const CSS_HANDLES = ['affiliateStoreName'] as const

const AffiliateStoreName: FC = () => {
  const slug = useMemo(() => {
    return getSlug()
  }, [])

  const { handles } = useCssHandles(CSS_HANDLES)

  const { data, error } = useQuery<GetAffiliateStoreNameQueryResult>(
    GET_AFFILIATE_STORE_NAME_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  return (
    <div className={`f1 tc mv6 ${handles.affiliateStoreName}`}>
      <span>{error ? '' : data?.getAffiliateStoreName}</span>
    </div>
  )
}

export default AffiliateStoreName
