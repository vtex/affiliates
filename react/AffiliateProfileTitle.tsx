import React, { useMemo } from 'react'
import GET_AFFILIATE_STORE_NAME_QUERY from './graphql/getAffiliateStoreName.graphql'
import { useQuery } from 'react-apollo'
import { getSlugStoreFront } from './utils/shared'
import { useCssHandles } from 'vtex.css-handles'

type GetAffiliateStoreNameQueryResult = {
  getAffiliateStoreName: string
}

const CSS_HANDLES = ['affiliateProfileTitle'] as const

function AffiliateProfileTitle() {
  const slug = useMemo(() => {
    return getSlugStoreFront()
  }, [])

  const { handles } = useCssHandles(CSS_HANDLES)

  const { data, error } = useQuery<GetAffiliateStoreNameQueryResult>(
    GET_AFFILIATE_STORE_NAME_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  return(
    <div className={`ma7 ${handles.affiliateProfileTitle} `}>
      <h4 className={`t-heading-4 `}>{error ? "" : data?.getAffiliateStoreName}</h4>
    </div>
  )
}

export default AffiliateProfileTitle
