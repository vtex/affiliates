import type { ModalStateReturn } from '@vtex/admin-ui'
import {
  Button,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Modal,
  Text,
  useToast,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useMutation } from 'react-apollo'
import type { Affiliate } from 'vtex.affiliates'
import { useIntl } from 'react-intl'

import UPDATE_AFFILIATE from '../../../graphql/updateAffiliate.graphql'
import GET_AFFILIATE from '../../../graphql/getAffiliate.graphql'
import { messages } from '../../../utils/messages'

type UpdateApprovedStatusModalProps = {
  modal: ModalStateReturn
  isAffiliateApproved?: boolean
  affiliate?: Affiliate
}

const UpdateApprovedStatusModal: FC<UpdateApprovedStatusModalProps> = ({
  modal,
  isAffiliateApproved,
  affiliate,
}) => {
  const showToast = useToast()
  const intl = useIntl()

  const [updateAffiliate, { loading: mutationLoading }] = useMutation(
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
        modal.setVisible(false)
      },
      onError: () => {
        showToast({
          tone: 'critical',
          message: intl.formatMessage(messages.editAffiliateErrorMessage),
        })
        modal.setVisible(false)
      },
    }
  )

  const onCancelHandler = () => {
    modal.setVisible(false)
  }

  const onConfirmHandler = () => {
    const updateAffiliateData = {
      ...affiliate,
      isApproved: !isAffiliateApproved,
    }

    delete updateAffiliateData.id

    updateAffiliate({
      variables: {
        affiliateId: affiliate?.id,
        updateAffiliate: updateAffiliateData,
      },
    })
  }

  const modalMessage = useMemo(() => {
    if (isAffiliateApproved) {
      return intl.formatMessage(messages.editAffiliateApproveFalseMessage)
    }

    return intl.formatMessage(messages.editAffiliateApproveTrueMessage)
  }, [isAffiliateApproved, intl])

  return (
    <Modal aria-label="Approve affiliate modal" state={modal}>
      <ModalHeader
        title={intl.formatMessage(messages.editAffiliateApproveStatusTitle)}
      />
      <ModalContent>
        <Text>{modalMessage}</Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="secondary" onClick={onCancelHandler}>
          {intl.formatMessage(messages.cancelLabel)}
        </Button>
        <Button loading={mutationLoading} onClick={onConfirmHandler}>
          {intl.formatMessage(messages.confirmLabel)}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default UpdateApprovedStatusModal
