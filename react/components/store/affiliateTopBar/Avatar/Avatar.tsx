import React from 'react'
import { ActionMenu } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { storeMessages } from '../../../../utils/messages'

interface AvatarProps {
  name: string
  account: string
  returnUrl: string
}

const Avatar = ({ name, account, returnUrl }: AvatarProps) => {
  const intl = useIntl()

  const nameFirstLetter = name.charAt(0)

  const handleLogout = (accountName: string, redirectUrl: string) => {
    return window.location.assign(
      `/api/vtexid/pub/logout?scope=${accountName}&returnUrl=${redirectUrl}`
    )
  }

  const options = [
    {
      label: intl.formatMessage(storeMessages.affiliateProfileAvatarLogout),
      onClick: () => handleLogout(account, returnUrl),
    },
  ]

  return (
    <div className="ml5-s">
      <ActionMenu
        options={options}
        buttonProps={{
          variation: 'secondary',
          size: 'small',
        }}
        hideCaretIcon
        label={nameFirstLetter}
        style="border-radius: 100%"
      />
    </div>
  )
}

export default Avatar
