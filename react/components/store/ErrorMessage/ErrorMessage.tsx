import React, { useEffect } from 'react'
import { IconFailure } from 'vtex.styleguide'
import { useIntl, FormattedMessage } from 'react-intl'

import { storeMessages } from '../../../utils/messages'

type ToastProps = {
  message: string
  duration: number
  horizontalPosition: string
}

type GraphQLError = {
  code: ErrorKeys
  message: string
}

type ErrorKeys =
  | 'SlugNotAlphanumeric'
  | 'URLInUse'
  | 'AffiliateAlreadyExists'
  | 'AffiliateNotFound'
  | 'EmailUsedByOtherAffiliate'

interface Props {
  errors: GraphQLError[]
  showToast?: (toastProps: ToastProps) => void
  context: 'store' | 'admin'
}

function ErrorMessage(props: Props) {
  const { errors, showToast, context } = props
  const intl = useIntl()

  const errorMessages: { [key in ErrorKeys]: string } = {
    SlugNotAlphanumeric: `${context}/affiliate.register.errorSlugAlphanumeric`,
    URLInUse: `${context}/affiliate.register.errorURLInUse`,
    AffiliateAlreadyExists: `${context}/affiliate.register.errorAffiliateExists`,
    AffiliateNotFound: `${context}/affiliate.register.errorAffiliateNotFound`,
    EmailUsedByOtherAffiliate: `${context}/affiliate.register.errorEmailAlreadyInUse`,
  }

  useEffect(() => {
    if (showToast) {
      showToast({
        message: intl.formatMessage(storeMessages.affiliateWentWrong),
        duration: 3000,
        horizontalPosition: 'left',
      })
    }
  }, [intl, showToast])

  return (
    <div className="w-100 center mw8-m ph3 pa5 mv8 bg-washed-red flex items-center">
      <ul className="flex flex-column list">
        {errors.map((item) => {
          return (
            <li className="flex flex-row list pv2" key={item.code}>
              <IconFailure />
              <p className="ph3 mv0">
                <FormattedMessage id={errorMessages[item.code]} />
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ErrorMessage
