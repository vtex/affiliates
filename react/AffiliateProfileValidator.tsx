import React, { useMemo } from 'react'
import type { FC } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Spinner } from 'vtex.styleguide'

import useAffiliate from './context/useAffiliate'
import { getSlugStoreFront } from './utils/shared'

type Props = {
  Invalid: React.FC
  Valid: React.FC
}

const AffiliateProfileValidator: FC<Props> = ({ Valid, Invalid }) => {
  const affiliate = useAffiliate()
  const slug = useMemo(() => {
    return getSlugStoreFront()
  }, [])

  const { orderForm } = useOrderForm()

  const loading = useMemo(() => {
    return (
      orderForm?.clientProfileData === undefined ||
      affiliate.affiliateOrdersLoading
    )
  }, [orderForm, affiliate])

  const isValid = useMemo(() => {
    return affiliate?.affiliate?.slug === slug
  }, [affiliate, slug])

  if (loading) {
    return (
      <div className="justify-center-s flex-s pa9-s">
        <Spinner />
      </div>
    )
  }

  if (isValid) {
    return <Valid />
  }

  return <Invalid />
}

export default AffiliateProfileValidator
