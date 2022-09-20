import React, { useMemo, useState } from 'react'
import { useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'
import type { NewAffiliateInput } from 'vtex.affiliates'
import { Input, Button } from 'vtex.styleguide'

import ADD_AFFILIATE from './graphql/addAffiliate.graphql'
import { storeMessages } from './utils/messages'

function AffiliateForm() {
  const intl = useIntl()
  const [formInput, setFormInput] = useState<NewAffiliateInput>()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [storeName, setStoreName] = useState<string>('')
  const [document, setDocument] = useState<string>('')
  const [documentType, setDocumentType] = useState<string>('')

  const [postalCode, setPostalCode] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [reference, setReference] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [country, setCountry] = useState<string>('')

  const [instagram, setInstagram] = useState<string>('')
  const [facebook, setFacebook] = useState<string>('')
  const [whatsapp, setWhatsapp] = useState<string>('')
  const [gtmId, setGtmId] = useState<string>('')

  const [addAffiliate] = useMutation(ADD_AFFILIATE)

  useMemo(() => {
    setFormInput({
      name,
      email,
      phone,
      isApproved: false,
      storeName,
      document,
      documentType,
      slug,
      address: {
        postalCode,
        street,
        number,
        neighborhood,
        reference,
        city,
        state,
        country,
      },
      marketing: {
        instagram,
        facebook,
        whatsapp,
        gtmId,
      },
    })
  }, [
    name,
    email,
    phone,
    storeName,
    document,
    documentType,
    slug,
    postalCode,
    street,
    number,
    neighborhood,
    reference,
    city,
    state,
    country,
    instagram,
    facebook,
    whatsapp,
    gtmId,
  ])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addAffiliate({
      variables: {
        newAffiliate: {
          ...formInput,
        },
      },
    })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="center mw8-m ph3">
      <div className="pv5">
        <h3>{intl.formatMessage(storeMessages.affiliateGeneralInfo)}</h3>
        <div className="flex flex-column-s flex-row-m">
          <div className="pr3 w-100-s w-50-m">
            <Input
              required
              placeholder={intl.formatMessage(storeMessages.affiliateNameLabel)}
              label={intl.formatMessage(storeMessages.affiliateNameLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Input
              required
              placeholder={intl.formatMessage(
                storeMessages.affiliateEmailLabel
              )}
              type="email"
              label={intl.formatMessage(storeMessages.affiliateEmailLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Input
              required
              type="tel"
              placeholder="(41)998664958"
              label={intl.formatMessage(storeMessages.affiliatePhoneLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
            <Input
              required
              placeholder={intl.formatMessage(storeMessages.affiliateSlugLabel)}
              label={intl.formatMessage(storeMessages.affiliateSlugLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSlug(e.target.value)
              }
            />
          </div>
          <div className="w-100-s w-50-m">
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateStoreNameLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateStoreNameLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStoreName(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateDocumentTypeLabel
              )}
              label={intl.formatMessage(
                storeMessages.affiliateDocumentTypeLabel
              )}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDocumentType(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateDocumentLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateDocumentLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDocument(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="pv5">
        <h3>{intl.formatMessage(storeMessages.affiliateAddressInfo)}</h3>
        <div className="flex flex-column-s flex-row-m">
          <div className="pr3 w-100-s w-50-m">
            <Input
              placeholder={intl.formatMessage(storeMessages.affiliateCEPLabel)}
              label={intl.formatMessage(storeMessages.affiliateCEPLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostalCode(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateNumberLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateNumberLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumber(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateReferenceLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateReferenceLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReference(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateStateLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateStateLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value)
              }
            />
          </div>
          <div className="w-100-s w-50-m">
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateStreetLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateStreetLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStreet(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateDistrictLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateDistrictLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNeighborhood(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(storeMessages.affiliateCityLabel)}
              label={intl.formatMessage(storeMessages.affiliateCityLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />
            <Input
              placeholder={intl.formatMessage(
                storeMessages.affiliateCountryLabel
              )}
              label={intl.formatMessage(storeMessages.affiliateCountryLabel)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCountry(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="pv5">
        <h3>{intl.formatMessage(storeMessages.affiliateSocialInfo)}</h3>
        <div className="flex flex-column-s flex-row-m">
          <div className="pr3 w-100-s w-50-m">
            <Input
              placeholder="Instagram"
              label="Instagram"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInstagram(e.target.value)
              }
            />
            <Input
              placeholder="Whatsapp"
              label="Whatsapp"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWhatsapp(e.target.value)
              }
            />
          </div>
          <div className="w-100-s w-50-m">
            <Input
              placeholder="Facebook"
              label="Facebook"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFacebook(e.target.value)
              }
            />
            <Input
              placeholder="GTM ID"
              label="GTM ID"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGtmId(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <Button type="submit">
        {intl.formatMessage(storeMessages.affiliateRegisterButton)}
      </Button>
    </form>
  )
}

export default AffiliateForm
