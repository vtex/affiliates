import React, { useState, useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'

import GET_AFFILIATE_STORE_NAME_QUERY from '../../../../graphql/getAffiliateStoreName.graphql'
import type { ValueType } from '../../../../AffiliateForm'
import { storeMessages } from '../../../../utils/messages'
import { setFormRegex } from '../../../../utils/shared'

interface Props {
  values: ValueType
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  setValue: (field: string, value: string) => void
}

type GetAffiliateStoreNameQueryResult = {
  getAffiliateStoreName: string
}

function AffiliateFormGeneral(props: Props) {
  const { values, handleChange, handleBlur, setValue } = props
  const intl = useIntl()

  const [newSlug, setNewSlug] = useState('')

  const [validateSlug, { data }] =
    useLazyQuery<GetAffiliateStoreNameQueryResult>(
      GET_AFFILIATE_STORE_NAME_QUERY
    )

  async function handleStoreName(e: React.ChangeEvent<HTMLInputElement>) {
    await handleChange(e)
    const updatedSlug = setFormRegex(e.target.value)

    await validateSlug({ variables: { slug: updatedSlug } })

    setNewSlug(updatedSlug)
  }

  useEffect(() => {
    if (!data) {
      setValue('slug', newSlug)
    } else {
      const randomNumber = Math.floor(Math.random() * 10000)

      setValue('slug', `${newSlug}${randomNumber}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, newSlug])

  return (
    <div className="pv5">
      <h3>{intl.formatMessage(storeMessages.affiliateGeneralInfo)}</h3>
      <div className="flex flex-column-s flex-row-m">
        <div className="pr3 w-100-s w-50-m">
          <Input
            required
            name="name"
            placeholder={intl.formatMessage(
              storeMessages.affiliateNamePlaceholder
            )}
            label={intl.formatMessage(storeMessages.affiliateNameLabel)}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            required
            placeholder={intl.formatMessage(storeMessages.affiliateEmailLabel)}
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
            pattern="\d*"
            placeholder={intl.formatMessage(storeMessages.affiliateNoSpecial)}
            label={intl.formatMessage(storeMessages.affiliatePhoneLabel)}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            required
            name="slug"
            placeholder={intl.formatMessage(storeMessages.affiliateNoSpecial)}
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
            label={intl.formatMessage(storeMessages.affiliateStoreNameLabel)}
            value={values.storeName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleStoreName(e)
            }
            onBlur={handleBlur}
          />
          <Input
            name="documentType"
            placeholder={intl.formatMessage(
              storeMessages.affiliateDocumentTypeLabel
            )}
            label={intl.formatMessage(storeMessages.affiliateDocumentTypeLabel)}
            value={values.documentType}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="document"
            placeholder={intl.formatMessage(storeMessages.affiliateNoSpecial)}
            label={intl.formatMessage(storeMessages.affiliateDocumentLabel)}
            pattern="\d*"
            value={values.document}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  )
}

export default AffiliateFormGeneral
