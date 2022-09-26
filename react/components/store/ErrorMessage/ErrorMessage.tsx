import React, { useEffect } from 'react'
import { IconFailure } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { storeMessages } from '../../../utils/messages'

type ToastProps = {
  message: string
  duration: number
  horizontalPosition: string
}

interface Props {
  error: string
  showToast: (toastProps: ToastProps) => void
}

function ErrorMessage(props: Props) {
  const { error, showToast } = props
  const intl = useIntl()

  useEffect(() => {
    showToast({
      message: intl.formatMessage(storeMessages.affiliateWentWrong),
      duration: 3000,
      horizontalPosition: 'left',
    })
  }, [intl, showToast])

  return (
    <div className="w-100 center mw8-m ph3 pa5 mv8 bg-washed-red flex items-center">
      <IconFailure />
      <p className="mv0 ml2">{error}</p>
    </div>
  )
}

export default ErrorMessage
