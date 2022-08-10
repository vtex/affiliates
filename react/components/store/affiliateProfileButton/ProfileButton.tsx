import type { FC } from 'react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

import useAffiliate from '../../../context/useAffiliate'
import { storeMessages } from '../../../utils/messages'

const ProfileButton: FC = () => {
  const affiliate = useAffiliate()
  const {
    navigate,
    route: {
      params: { affiliateId },
    },
  } = useRuntime()

  const intl = useIntl()

  const onClick = useCallback(() => {
    navigate({
      page: 'store.affiliates-profile',
      params: {
        affiliateId,
      },
    })
  }, [navigate, affiliateId])

  if (affiliate.isLogged && affiliate.isValid) {
    return (
      <Button onClick={onClick}>
        {intl.formatMessage(storeMessages.affiliateProfileButtonLabel)}
      </Button>
    )
  }

  return null
}

export default ProfileButton
