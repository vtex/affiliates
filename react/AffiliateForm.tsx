import React from 'react'
import { useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'
import { Input, Button } from 'vtex.styleguide'
import { Formik } from 'formik'

import ADD_AFFILIATE from './graphql/addAffiliate.graphql'
import { storeMessages } from './utils/messages'

function AffiliateForm() {
  const intl = useIntl()
  const [addAffiliate] = useMutation(ADD_AFFILIATE)

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    isApproved: false,
    storeName: '',
    document: '',
    documentType: '',
    slug: '',
    address: {
      postalCode: '',
      street: '',
      number: '',
      neighborhood: '',
      reference: '',
      city: '',
      state: '',
      country: '',
    },
    marketing: {
      instagram: '',
      facebook: '',
      whatsapp: '',
      gtmId: '',
    },
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        await addAffiliate({
          variables: {
            newAffiliate: {
              ...values,
            },
          },
        })
        setSubmitting(false)
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={(e) => handleSubmit(e)} className="center mw8-m ph3">
          <div className="pv5">
            <h3>{intl.formatMessage(storeMessages.affiliateGeneralInfo)}</h3>
            <div className="flex flex-column-s flex-row-m">
              <div className="pr3 w-100-s w-50-m">
                <Input
                  required
                  name="name"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateNameLabel
                  )}
                  label={intl.formatMessage(storeMessages.affiliateNameLabel)}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  required
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateEmailLabel
                  )}
                  name="email"
                  type="email"
                  label={intl.formatMessage(storeMessages.affiliateEmailLabel)}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  required
                  name="phone"
                  type="tel"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliatePhoneLabel
                  )}
                  label={intl.formatMessage(storeMessages.affiliatePhoneLabel)}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  required
                  name="slug"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateSlugLabel
                  )}
                  label={intl.formatMessage(storeMessages.affiliateSlugLabel)}
                  value={values.slug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-100-s w-50-m">
                <Input
                  name="storeName"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateStoreNameLabel
                  )}
                  label={intl.formatMessage(
                    storeMessages.affiliateStoreNameLabel
                  )}
                  value={values.storeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="documentType"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateDocumentTypeLabel
                  )}
                  label={intl.formatMessage(
                    storeMessages.affiliateDocumentTypeLabel
                  )}
                  value={values.documentType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="document"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateDocumentLabel
                  )}
                  label={intl.formatMessage(
                    storeMessages.affiliateDocumentLabel
                  )}
                  value={values.document}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="pv5">
            <h3>{intl.formatMessage(storeMessages.affiliateAddressInfo)}</h3>
            <div className="flex flex-column-s flex-row-m">
              <div className="pr3 w-100-s w-50-m">
                <Input
                  name="address.postalCode"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateCEPLabel
                  )}
                  label={intl.formatMessage(storeMessages.affiliateCEPLabel)}
                  value={values.address.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="address.number"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateNumberLabel
                  )}
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
                  label={intl.formatMessage(
                    storeMessages.affiliateReferenceLabel
                  )}
                  value={values.address.reference}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="address.state"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateStateLabel
                  )}
                  label={intl.formatMessage(storeMessages.affiliateStateLabel)}
                  value={values.address.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-100-s w-50-m">
                <Input
                  name="address.street"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateStreetLabel
                  )}
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
                  label={intl.formatMessage(
                    storeMessages.affiliateDistrictLabel
                  )}
                  value={values.address.neighborhood}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="address.city"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateCityLabel
                  )}
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
                  label={intl.formatMessage(
                    storeMessages.affiliateCountryLabel
                  )}
                  value={values.address.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="pv5">
            <h3>{intl.formatMessage(storeMessages.affiliateSocialInfo)}</h3>
            <div className="flex flex-column-s flex-row-m">
              <div className="pr3 w-100-s w-50-m">
                <Input
                  name="marketing.instagram"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateInstagramLabel
                  )}
                  label={intl.formatMessage(
                    storeMessages.affiliateInstagramLabel
                  )}
                  value={values.marketing.instagram}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="marketing.whatsapp"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateWhatsappLabel
                  )}
                  label={intl.formatMessage(
                    storeMessages.affiliateWhatsappLabel
                  )}
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
                  label={intl.formatMessage(
                    storeMessages.affiliateFacebookLabel
                  )}
                  value={values.marketing.facebook}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  name="marketing.gtmId"
                  placeholder={intl.formatMessage(
                    storeMessages.affiliateGTMLabel
                  )}
                  label={intl.formatMessage(storeMessages.affiliateGTMLabel)}
                  value={values.marketing.gtmId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {intl.formatMessage(storeMessages.affiliateRegisterButton)}
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default AffiliateForm
