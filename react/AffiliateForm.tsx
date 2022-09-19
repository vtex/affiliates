import React from 'react'
import { useIntl } from 'react-intl'
import { Input, Button } from 'vtex.styleguide'

import { storeMessages } from './utils/messages'

function AffiliateForm() {
  const intl = useIntl()

  return (
    <form action="" className="center mw8-m">
      <div>
        <h3>{intl.formatMessage(storeMessages.affiliateGeneralInfo)}</h3>
        <div className="flex">
          <div className="mr3">
            <Input
              placeholder={intl.formatMessage(storeMessages.affiliateNameLabel)}
              label={intl.formatMessage(storeMessages.affiliateNameLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateEmailLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateEmailLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliatePhoneLabel
              )}
              label={intl.formatMessage(storeMessages.affiliatePhoneLabel)}
            />
          </div>
          <div>
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateStoreNameLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateStoreNameLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateDocumentTypeLabel
              )}
              label={intl.formatMessage(
                storeMessages.affiliateDocumentTypeLabel
              )}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateDocumentLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateDocumentLabel)}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>{intl.formatMessage(storeMessages.affiliateAddressInfo)}</h3>
        <div className="flex">
          <div className="mr3">
            <Input
              placeholder={intl.formatMessage(storeMessages.affiliateCEPLabel)}
              label={intl.formatMessage(storeMessages.affiliateCEPLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateNumberLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateNumberLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateReferenceLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateReferenceLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateStateLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateStateLabel)}
            />
          </div>
          <div>
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateStreetLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateStreetLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateDistrictLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateDistrictLabel)}
            />
            <Input
              placeholder={intl.formatMessage(storeMessages.affiliateCityLabel)}
              label={intl.formatMessage(storeMessages.affiliateCityLabel)}
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateCountryLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateCountryLabel)}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>{intl.formatMessage(storeMessages.affiliateSocialInfo)}</h3>
        <div className="flex">
          <div className="mr3">
            <Input placeholder="Instagram" label="Instagram" />
            <Input placeholder="Whatsapp" label="Whatsapp" />
          </div>
          <div>
            <Input placeholder="Facebook" label="Facebook" />
            <Input placeholder="GTM ID" label="GTM ID" />
          </div>
        </div>
      </div>
      <Button>
        {intl.formatMessage(storeMessages.affiliateRegisterButton)}
      </Button>
    </form>
  )
}

export default AffiliateForm
