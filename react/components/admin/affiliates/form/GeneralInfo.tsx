import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Heading, Divider, Flex, Box } from '@vtex/admin-ui'
import type { FormState } from '@vtex/admin-ui-form'
import { TextInput } from '@vtex/admin-ui-form'
import { useIntl } from 'react-intl'
import { useLazyQuery } from 'react-apollo'

import GET_AFFILIATE_STORE_NAME_QUERY from '../../../../graphql/getAffiliateStoreName.graphql'
import { messages } from '../../../../utils/messages'
import { setFormRegex } from '../../../../utils/shared'

interface GeneralInfoType {
  form: FormState
}

type GetAffiliateStoreNameQueryResult = {
  getAffiliateStoreName: string
}

const GeneralInfo: FC<GeneralInfoType> = ({ form }) => {
  const intl = useIntl()
  const [newSlug, setNewSlug] = useState(form.getValues('slug'))

  const [validateSlug, { data }] =
    useLazyQuery<GetAffiliateStoreNameQueryResult>(
      GET_AFFILIATE_STORE_NAME_QUERY
    )

  async function handleStoreName(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedSlug = setFormRegex(e.currentTarget.value)

    await validateSlug({ variables: { slug: updatedSlug } })
    await form.setValue('slug', updatedSlug)

    setNewSlug(updatedSlug)
  }

  useEffect(() => {
    if (!data) {
      form.setValue('slug', newSlug)
    } else {
      const randomNumber = Math.floor(Math.random() * 10000)

      form.setValue('slug', `${newSlug}${randomNumber}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, newSlug])

  return (
    <>
      <Heading>{intl.formatMessage(messages.generalInfoLabel)}</Heading>
      <Divider csx={{ marginY: 3 }} />
      <Flex wrap="wrap" csx={{ marginY: 3 }}>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            state={form}
            name="name"
            label={intl.formatMessage(messages.nameLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            state={form}
            name="storeName"
            label={intl.formatMessage(messages.storeNameLabel)}
            onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleStoreName(e)
            }
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            state={form}
            name="email"
            label={intl.formatMessage(messages.emailLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            state={form}
            name="phone"
            label={intl.formatMessage(messages.phoneLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            state={form}
            name="slug"
            label={intl.formatMessage(messages.slugLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            state={form}
            name="refId"
            label={intl.formatMessage(messages.refIdLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2', paddingRight: 2 }}>
          <TextInput
            state={form}
            name="documentType"
            label={intl.formatMessage(messages.documentTypeLabel)}
          />
        </Box>
        <Box csx={{ width: '1/2' }}>
          <TextInput
            state={form}
            name="document"
            label={intl.formatMessage(messages.documentLabel)}
          />
        </Box>
      </Flex>
    </>
  )
}

export default GeneralInfo
