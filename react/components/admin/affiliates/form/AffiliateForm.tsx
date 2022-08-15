import { Box, Button, Flex, FlexSpacer, useToast } from '@vtex/admin-ui'
import { Form, useFormState, yupResolver } from '@vtex/admin-ui-form'
import type { FC } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useMutation } from 'react-apollo'
import type { Affiliate } from 'vtex.affiliates'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { VALIDATION_SCHEMAS } from '../../../../utils/validationSchemas'
import AddressInfo from './AddressInfo'
import GeneralInfo from './GeneralInfo'
import MarketingInfo from './MarketingInfo'
import UPDATE_AFFILIATE from '../../../../graphql/updateAffiliate.graphql'
import ADD_AFFILIATE from '../../../../graphql/addAffiliate.graphql'
import GET_AFFILIATE from '../../../../graphql/getAffiliate.graphql'
import { messages } from '../../../../utils/messages'

type AffiliateFormProps = {
  affiliate?: Affiliate
}

const AffiliateForm: FC<AffiliateFormProps> = ({ affiliate }) => {
  const showToast = useToast()
  const intl = useIntl()
  const { navigate } = useRuntime()

  const initialValues = useMemo(() => {
    return {
      name: affiliate?.name ?? '',
      email: affiliate?.email ?? '',
      phone: affiliate?.phone ?? '',
      storeName: affiliate?.storeName ?? '',
      slug: affiliate?.slug ?? '',
      refId: affiliate?.refId ?? '',
      document: affiliate?.document ?? '',
      documentType: affiliate?.documentType ?? '',
      address: {
        street: affiliate?.address?.street ?? '',
        number: affiliate?.address?.number ?? '',
        neighborhood: affiliate?.address?.neighborhood ?? '',
        city: affiliate?.address?.city ?? '',
        state: affiliate?.address?.state ?? '',
        postalCode: affiliate?.address?.postalCode ?? '',
        country: affiliate?.address?.country ?? '',
        reference: affiliate?.address?.reference ?? '',
      },
      marketing: {
        instagram: affiliate?.marketing?.instagram ?? '',
        facebook: affiliate?.marketing?.facebook ?? '',
        whatsapp: affiliate?.marketing?.whatsapp ?? '',
        gtmId: affiliate?.marketing?.gtmId ?? '',
      },
    }
  }, [affiliate])

  const [updateAffiliate, { loading: editMutationLoading }] = useMutation(
    UPDATE_AFFILIATE,
    {
      refetchQueries: [
        {
          query: GET_AFFILIATE,
          variables: {
            affiliateId: affiliate?.id,
          },
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        showToast({
          tone: 'positive',
          message: intl.formatMessage(messages.editAffiliateSuccessMessage),
        })
        navigate({
          page: 'admin.app.affiliates.affiliate-detail',
          params: {
            affiliateId: affiliate?.id,
          },
        })
      },
      onError: () => {
        showToast({
          tone: 'critical',
          message: intl.formatMessage(messages.editAffiliateErrorMessage),
        })
      },
    }
  )

  const [addAffiliate, { loading: addMutationLoading }] = useMutation(
    ADD_AFFILIATE,
    {
      onCompleted: (result) => {
        navigate({
          page: 'admin.app.affiliates.affiliate-detail',
          params: {
            affiliateId: result.addAffiliate.id,
          },
        })
      },
      onError: () => {
        showToast({
          tone: 'critical',
          message: intl.formatMessage(messages.addAffiliateErrorMessage),
        })
      },
    }
  )

  const onSubmit = useCallback(
    (values: Affiliate) => {
      if (affiliate) {
        updateAffiliate({
          variables: {
            affiliateId: affiliate.id,
            updateAffiliate: {
              ...values,
              phone: values.phone?.toString(),
              isApproved: affiliate.isApproved,
            },
          },
        })
      } else {
        addAffiliate({
          variables: {
            newAffiliate: {
              ...values,
              phone: values.phone?.toString(),
              isApproved: false,
            },
          },
        })
      }
    },
    [affiliate, updateAffiliate, addAffiliate]
  )

  const form = useFormState({
    resolver: yupResolver(VALIDATION_SCHEMAS(intl).affiliateForm),
    defaultValues: initialValues,
  })

  return (
    <Box csx={{ marginY: 16 }}>
      <Form state={form} onSubmit={onSubmit}>
        <GeneralInfo form={form} />
        <AddressInfo form={form} />
        <MarketingInfo form={form} />
        <Flex>
          <FlexSpacer />
          <Button
            loading={editMutationLoading || addMutationLoading}
            type="submit"
          >
            {intl.formatMessage(messages.saveLabel)}
          </Button>
        </Flex>
      </Form>
    </Box>
  )
}

export default AffiliateForm
