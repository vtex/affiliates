import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import IS_AFFILIATE_VALID_QUERY from './graphql/isAffiliateValid.graphql'
import SET_ON_ORDER_FORM_MUTATION from './graphql/setAffiliateOnOrderForm.graphql'
import { getSlug } from './utils/shared'
import { DEFAULT_ORDER_FORM_ID } from './utils/constants'

export type IsAffiliateValidQueryResult = {
  isAffiliateValid: boolean
}

type Props = {
  Invalid: React.FC
  Valid: React.FC
}

const AffiliateValidator: FC<Props> = ({ Invalid, Valid }) => {
  const {
    orderForm: { id: orderFormId },
    setOrderForm,
  } = useOrderForm()

  const slug = useMemo(() => {
    return getSlug()
  }, [])

  const [setAffiliateOnOrderForm, { called: mutationHasBeenCalled }] =
    useMutation(SET_ON_ORDER_FORM_MUTATION, {
      onCompleted: (data) => setOrderForm(data.setAffiliateOnOrderForm),
    })

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
        variables: { orderFormId, slug },
      })
    }

    return <Valid />
  }

  if (isAffiliateValid === false || error) return <Invalid />

  return null
}

export default AffiliateValidator
