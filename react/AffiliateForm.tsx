import React from 'react'
import { useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'
import { Button, Spinner, ToastProvider, ToastConsumer } from 'vtex.styleguide'
import { Formik, Form } from 'formik'

import ADD_AFFILIATE from './graphql/addAffiliate.graphql'
import { storeMessages } from './utils/messages'
import ErrorMessage from './components/store/ErrorMessage'
import AffiliateFormGeneral from './components/store/affiliateFormSections/AffiliateFormGeneral'
import AffiliateFormAddress from './components/store/affiliateFormSections/AffiliateFormAddress'
import AffiliateFormMarketing from './components/store/affiliateFormSections/AffiliateFormMarketing'

export interface ValueType {
  name: string
  email: string
  phone: string
  isApproved: boolean
  storeName: string
  document: string
  documentType: string
  slug: string
  address: {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    reference: string
    city: string
    state: string
    country: string
  }
  marketing: {
    instagram: string
    facebook: string
    whatsapp: string
    gtmId: string
  }
}
interface ToastProps {
  message: string
  duration: number
  horizontalPosition: string
}

function AffiliateForm() {
  const intl = useIntl()
  const [addAffiliate, { loading, error, data }] = useMutation(ADD_AFFILIATE)

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

  const errors = error?.graphQLErrors[0]?.extensions?.exception?.graphQLErrors

  return (
    <ToastProvider>
      <ToastConsumer>
        {({ showToast }: { showToast: (props: ToastProps) => void }) => (
          <section>
            <div>
              {data ? (
                <div className="w-100 center mw8-m ph3 pa5 mv8 bg-washed-green flex items-center">
                  <p>{intl.formatMessage(storeMessages.affiliateWentWell)}</p>
                </div>
              ) : null}
              {errors ? (
                <ErrorMessage
                  errors={
                    error?.graphQLErrors[0]?.extensions?.exception
                      ?.graphQLErrors
                  }
                  showToast={showToast}
                  context="store"
                />
              ) : null}
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await addAffiliate({
                  variables: {
                    newAffiliate: {
                      ...values,
                    },
                  },
                })
              }}
            >
              {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form className="center mw8-m ph3">
                  <AffiliateFormGeneral
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setValue={setFieldValue}
                  />
                  <AffiliateFormAddress
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <AffiliateFormMarketing
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      intl.formatMessage(storeMessages.affiliateRegisterButton)
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </section>
        )}
      </ToastConsumer>
    </ToastProvider>
  )
}

export default AffiliateForm
