import React from 'react'
import { useMutation } from 'react-apollo'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'

import SET_ON_ORDER_FORM_MUTATION from './graphql/setAffiliateOnOrderForm.graphql'
import { DEFAULT_ORDER_FORM_ID } from './utils/constants'

function AffiliateURLMonitoring() {
  const { orderForm, setOrderForm } = useOrderForm()
  const { route } = useRuntime()

  const slug = route?.queryString?.targeting
  const orderFormId = orderForm.id

  const [setAffiliateOnOrderForm, { called: mutationHasBeenCalled }] =
    useMutation(SET_ON_ORDER_FORM_MUTATION, {
      onCompleted: (data) => setOrderForm(data.setAffiliateOnOrderForm),
    })

  if (
    !mutationHasBeenCalled &&
    orderFormId !== DEFAULT_ORDER_FORM_ID &&
    orderForm?.customData === null &&
    slug
  ) {
    setAffiliateOnOrderForm({
      variables: { orderFormId, slug },
    })
  }

  return null
}

export default AffiliateURLMonitoring
