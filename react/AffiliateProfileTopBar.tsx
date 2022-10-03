import React, { useCallback } from 'react'
import { ButtonWithIcon, IconExternalLinkMini, Divider } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import Avatar from './components/store/affiliateTopBar/Avatar/Avatar'
import useAffiliate from './context/useAffiliate'
import { storeMessages } from './utils/messages'

interface Props {
  imageURL: string
}

const baseLogo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1200px-VTEX_Logo.svg.png'

const AffiliateTopBar = (props: Props) => {
  const { imageURL } = props

  const {
    account,
    navigate,
    route: {
      params: { affiliateId },
    },
  } = useRuntime()

  const affiliate = useAffiliate()

  const returnUrl = `${window.location?.origin}/affiliates/${affiliateId}`

  const intl = useIntl()

  const onClick = useCallback(() => {
    navigate({
      page: 'store.affiliates',
      params: { affiliateId },
    })
  }, [affiliateId, navigate])

  return (
    <>
      <div className="flex pa4 justify-between">
        <div className="flex items-center-s">
          <img
            src={imageURL || baseLogo}
            alt={`${account} Logo`}
            style={{ maxHeight: '35px', paddingRight: '10px' }}
          />
          <h6 className="mb0 mv0 f5">{`${intl.formatMessage(
            storeMessages.affiliateProfileTitle
          )} ${account}`}</h6>
        </div>
        <div className="flex items-center-s">
          <ButtonWithIcon
            variation="primary"
            onClick={onClick}
            icon={<IconExternalLinkMini />}
          >
            <p className="pl3 mv0">
              {intl.formatMessage(
                storeMessages.affiliateProfileAccessStoreButton
              )}
            </p>
          </ButtonWithIcon>
          <Avatar
            name={affiliate?.affiliate?.name ?? ''}
            account={account}
            returnUrl={returnUrl}
          />
        </div>
      </div>
      <Divider />
    </>
  )
}

AffiliateTopBar.schema = {
  title: 'Topbar',
  type: 'object',
  properties: {
    imageURL: {
      title: 'Logo Image',
      description: 'Imagem que será disponibilizada como logo na página',
      type: 'string',
      default: baseLogo,
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
}

export default AffiliateTopBar
