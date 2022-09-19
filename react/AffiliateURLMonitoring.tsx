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

  // eslint-disable-next-line no-console
  console.log(orderForm)

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

AffiliateURLMonitoring.schema = {
  title: 'admin/editor.affiliateURLmonitoring.title',
  description: 'admin/editor.affiliateURLmonitoring.description',
  type: 'object',
  properties: {
    parameter: {
      title: 'admin/editor.affiliateURLmonitoring.param',
      description: 'admin/editor.affiliateURLmonitoring.paramDetails',
      type: 'string',
      default: null,
    },
  },
}

export default AffiliateURLMonitoring
