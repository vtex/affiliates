import React from 'react'
import { useMutation } from 'react-apollo'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'

import SET_ON_ORDER_FORM_MUTATION from './graphql/setAffiliateOnOrderForm.graphql'
import { DEFAULT_ORDER_FORM_ID } from './utils/constants'

interface Props {
  parameter: string
}

function AffiliateURLMonitoring(props: Props) {
  const { orderForm, setOrderForm } = useOrderForm()
  const {
    route: { queryString },
  } = useRuntime()

  const { parameter } = props

  const param = parameter || `targeting`
  const slug = queryString ? queryString[param] : false
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

  return <></>
}

AffiliateURLMonitoring.schema = {
  title: 'editor.affiliateURLmonitoring.title',
  description: 'editor.affiliateURLmonitoring.description',
  type: 'object',
  properties: {
    parameter: {
      title: 'editor.affiliateURLmonitoring.param',
      description: 'editor.affiliateURLmonitoring.paramDetails',
      type: 'string',
      default: null,
    },
  },
}

export default AffiliateURLMonitoring
