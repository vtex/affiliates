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

function AffiliateFormAddress(props: Props) {
  const { values, handleChange, handleBlur } = props
  const intl = useIntl()

  return (
    <div className="pv5">
      <h3>{intl.formatMessage(storeMessages.affiliateAddressInfo)}</h3>
      <div className="flex flex-column-s flex-row-m">
        <div className="pr3 w-100-s w-50-m">
          <Input
            name="address.postalCode"
            placeholder={intl.formatMessage(storeMessages.affiliateNoSpecial)}
            label={intl.formatMessage(storeMessages.affiliateCEPLabel)}
            pattern="\d*"
            value={values.address.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="address.number"
            placeholder={intl.formatMessage(storeMessages.affiliateNumberLabel)}
            label={intl.formatMessage(storeMessages.affiliateNumberLabel)}
            value={values.address.number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="address.reference"
            placeholder={intl.formatMessage(
              storeMessages.affiliateReferenceLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateReferenceLabel)}
            value={values.address.reference}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="address.state"
            placeholder={intl.formatMessage(storeMessages.affiliateStateLabel)}
            label={intl.formatMessage(storeMessages.affiliateStateLabel)}
            value={values.address.state}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="w-100-s w-50-m">
          <Input
            name="address.street"
            placeholder={intl.formatMessage(storeMessages.affiliateStreetLabel)}
            label={intl.formatMessage(storeMessages.affiliateStreetLabel)}
            value={values.address.street}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="address.neighborhood"
            placeholder={intl.formatMessage(
              storeMessages.affiliateDistrictLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateDistrictLabel)}
            value={values.address.neighborhood}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="address.city"
            placeholder={intl.formatMessage(storeMessages.affiliateCityLabel)}
            label={intl.formatMessage(storeMessages.affiliateCityLabel)}
            value={values.address.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="address.country"
            placeholder={intl.formatMessage(
              storeMessages.affiliateCountryLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateCountryLabel)}
            value={values.address.country}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  )
}

export default AffiliateFormAddress
