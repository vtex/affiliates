import React, { useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'

import useAffiliate from './context/useAffiliate'
import { getSlugStoreFront } from './utils/shared'

type Props = {
  Invalid: React.FC
  Valid: React.FC
}

const AffiliateProfileValidator: FC<Props> = ({ Valid, Invalid }) => {
  const [valid, setValid] = useState(false)
  const affiliate = useAffiliate()
  const slug = useMemo(() => {
    return getSlugStoreFront()
  }, [])

  useEffect(() => {
    setValid(affiliate?.affiliate?.slug === slug)
  }, [affiliate, slug])

  return <div>{valid ? <Valid /> : <Invalid />}</div>
}

export default AffiliateProfileValidator
