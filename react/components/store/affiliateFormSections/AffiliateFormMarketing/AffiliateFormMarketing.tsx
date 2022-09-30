import React from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'

import type { ValueType } from '../../../../AffiliateForm'
import { storeMessages } from '../../../../utils/messages'

interface Props {
  values: ValueType
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

function AffiliateFormMarketing(props: Props) {
  const { values, handleChange, handleBlur } = props
  const intl = useIntl()

  return (
    <div className="pv5">
      <h3>{intl.formatMessage(storeMessages.affiliateSocialInfo)}</h3>
      <div className="flex flex-column-s flex-row-m">
        <div className="pr3 w-100-s w-50-m">
          <Input
            name="marketing.instagram"
            placeholder={intl.formatMessage(
              storeMessages.affiliateInstagramLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateInstagramLabel)}
            value={values.marketing.instagram}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="marketing.whatsapp"
            placeholder={intl.formatMessage(
              storeMessages.affiliateWhatsappLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateWhatsappLabel)}
            value={values.marketing.whatsapp}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="w-100-s w-50-m">
          <Input
            name="marketing.facebook"
            placeholder={intl.formatMessage(
              storeMessages.affiliateFacebookLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateFacebookLabel)}
            value={values.marketing.facebook}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="marketing.gtmId"
            placeholder={intl.formatMessage(storeMessages.affiliateGTMLabel)}
            label={intl.formatMessage(storeMessages.affiliateGTMLabel)}
            value={values.marketing.gtmId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  )
}

export default AffiliateFormMarketing
