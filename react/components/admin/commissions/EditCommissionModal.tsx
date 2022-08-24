import type { ModalStateReturn } from '@vtex/admin-ui'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  FlexSpacer,
  Text,
  TextInput,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useMemo, useState } from 'react'
import type { MutationFunctionOptions } from 'react-apollo'
import { useIntl } from 'react-intl'

import { messages } from '../../../utils/messages'

type EditCommissionModalProps = {
  selectedRowId?: string
  updateFunction: (options?: MutationFunctionOptions) => void
  loading: boolean
  modalState: ModalStateReturn
}

type CommissionInputError = {
  tone: 'neutral' | 'critical' | undefined
  message: string | undefined
}

const EditCommissionModal: FC<EditCommissionModalProps> = ({
  modalState,
  selectedRowId,
  updateFunction,
  loading,
}) => {
  const intl = useIntl()
  const [commissionInput, setCommissionInput] = useState('')

  const onCommissionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommissionInput(e.target.value)
  }

  const onUpdateButtonClick = () => {
    const parsedCommision = parseInt(commissionInput, 10)

    if (Number.isNaN(parsedCommision)) {
      return
    }

    updateFunction({
      variables: {
        newCommission: {
          id: selectedRowId,
          commission: parsedCommision,
        },
      },
    })
  }

  const onCancelClick = () => {
    modalState.setVisible(false)
  }

  const commissionInputError: CommissionInputError = useMemo(() => {
    const parsedCommision = parseInt(commissionInput, 10)

    if (commissionInput === '') {
      return { message: undefined, tone: 'neutral' }
    }

    if (Number.isNaN(parsedCommision)) {
      return {
        message: intl.formatMessage(messages.editCommissionInvalidValue),
        tone: 'critical',
      }
    }

    return { message: undefined, tone: 'neutral' }
  }, [commissionInput, intl])

  const isButtonDisabled = useMemo(() => {
    return commissionInputError.tone === 'critical'
  }, [commissionInputError])

  return (
    <Modal aria-label="edit-modal" state={modalState}>
      <ModalHeader title={intl.formatMessage(messages.editCommissionTitle)} />
      <ModalContent>
        <Text variant="title1">{`${intl.formatMessage(
          messages.skuIdLabel
        )}: ${selectedRowId}`}</Text>
        <FlexSpacer />
        <TextInput
          id="edit-input"
          label={intl.formatMessage(messages.commissionLabel)}
          suffix="%"
          value={commissionInput}
          onChange={onCommissionInputChange}
          errorText={commissionInputError.message}
        />
      </ModalContent>
      <ModalFooter>
        <FlexSpacer />
        <Button variant="secondary" onClick={onCancelClick}>
          {intl.formatMessage(messages.cancelLabel)}
        </Button>
        <Button
          onClick={onUpdateButtonClick}
          loading={loading}
          disabled={isButtonDisabled}
        >
          {intl.formatMessage(messages.confirmLabel)}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditCommissionModal
