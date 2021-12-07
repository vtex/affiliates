import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import IS_AFFILIATE_VALID_QUERY from './graphql/isAffiliateValid.graphql'
import SET_ON_ORDER_FORM_MUTATION from './graphql/setAffiliateOnOrderForm.graphql'

const DEFAULT_ORDER_FORM_ID = 'default-order-form'

export type IsAffiliateValidQueryResult = {
  isAffiliateValid: boolean
}

type Props = {
  Invalid: React.ComponentType
  Valid: React.ComponentType
}

const AffiliateValidator: FC<Props> = ({ Invalid, Valid }) => {
  const {
    orderForm: { id: orderFormId },
  } = useOrderForm()

  const slug = useMemo(() => {
    const splitPathname = window.location?.pathname.split('/')

    return splitPathname && splitPathname[splitPathname.length - 1]
  }, [])

  const [setAffiliateOnOrderForm, { called: mutationHasBeenCalled }] =
    useMutation(SET_ON_ORDER_FORM_MUTATION)

  const { data, error } = useQuery<IsAffiliateValidQueryResult>(
    IS_AFFILIATE_VALID_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  const isAffiliateValid = data?.isAffiliateValid

  if (isAffiliateValid) {
    if (!mutationHasBeenCalled && orderFormId !== DEFAULT_ORDER_FORM_ID) {
      setAffiliateOnOrderForm({
        variables: { orderFormId, affiliateId: slug },
      })
    }

    return <Valid />
  }

  if (isAffiliateValid === false || error) return <Invalid />

  return null
}

export default AffiliateValidator
