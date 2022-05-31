import React, { useCallback } from 'react'
import { Button, IconExternalLinkMini, Divider } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import Avatar from './Avatar/Avatar'
import useAffiliate from '../../../context/useAffiliate'
import { storeMessages } from '../../../utils/messages'

const TopBar = () => {
  const { account, navigate } = useRuntime()
  const affiliate = useAffiliate()

  const intl = useIntl()

  const onClick = useCallback(() => {
    navigate({
      page: 'store.home',
    })
  }, [navigate])

  return (
    <>
      <div className="flex pa4 justify-between">
        <div className="flex items-center-s">
          {/* <VtexLogo className="mr5" /> */}
          <h6 className="mb0">{`${intl.formatMessage(
            storeMessages.affiliateProfileTitle
          )} ${account}`}</h6>
        </div>
        <div className="flex items-center-s">
          <Button onClick={onClick}>
            <IconExternalLinkMini />
            <p className="pl3 mb0">
              {intl.formatMessage(
                storeMessages.affiliateProfileAccessStoreButton
              )}
            </p>
          </Button>
          <Avatar name={affiliate?.affiliate?.name ?? ''} />
        </div>
      </div>
      <Divider />
    </>
  )
}

export default TopBar
