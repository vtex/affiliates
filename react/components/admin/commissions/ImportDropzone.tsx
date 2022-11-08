import type { FC } from 'react'
import React, { useCallback, useState, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Dropzone } from 'vtex.styleguide'
import { Text, Box, Button, Flex, useToast } from '@vtex/admin-ui'
import { useMutation, useLazyQuery } from 'react-apollo'
import * as XLSX from 'xlsx'

import CommissionsNotFound from './CommissionsNotFound'
import { messages } from '../../../utils/messages'
import IMPORT_COMMISSIONS from '../../../graphql/importCommissionsBySKU.graphql'
import GET_LAST_IMPORTED_COMMISSION_FILE_INFO from '../../../graphql/getLastImportInfo.graphql'
import GET_NOT_FOUND_SKUS from '../../../graphql/getNotFoundSKUs.graphql'
import DELETE_NOT_FOUND_SKUS from '../../../graphql/deleteNotFoundSKUs.graphql'

interface NotFoundInterface {
  getNotFoundCommissions: boolean | undefined
}

const ImportDropzone: FC = () => {
  const intl = useIntl()
  const showToast = useToast()
  const [file, setFile] = useState<File>()
  const [verifyDisabled, setVerifyDisabled] = useState(true)

  const [getNotFoundSKUs, { data: dataSKUs }] = useLazyQuery<NotFoundInterface>(
    GET_NOT_FOUND_SKUS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    }
  )

  const [deleteNotFoundSKUs] = useMutation(DELETE_NOT_FOUND_SKUS, {
    notifyOnNetworkStatusChange: true,
  })

  const [importData, { loading: importLoading }] = useMutation(
    IMPORT_COMMISSIONS,
    {
      refetchQueries: [
        {
          query: GET_LAST_IMPORTED_COMMISSION_FILE_INFO,
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        setVerifyDisabled(false)
        deleteNotFoundSKUs()
        showToast({
          variant: 'positive',
          message: intl.formatMessage(messages.importFileSuccessMessage),
        })
      },
      onError: () => {
        showToast({
          variant: 'critical',
          message: intl.formatMessage(messages.importFileErrorMessage),
        })
      },
    }
  )

  const handleFile = async (files: File[]) => {
    setFile(files[0])
  }

  const handleReset = () => {
    setFile(undefined)
  }

  const isButtonDisabled = useMemo(() => {
    return !file
  }, [file])

  const handleSubmit = () => {
    importData({
      variables: {
        file,
      },
    })
  }

  const handleTemplateDownload = useCallback(() => {
    const header = ['id', 'refId', 'commission']

    const ws = XLSX.utils.json_to_sheet([], { header })
    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    const exportFileName = `commissions-template.xlsx`

    XLSX.writeFile(wb, exportFileName)
  }, [])

  return (
    <>
      <Box csx={{ marginBottom: '8px' }}>
        <Text variant="title1">
          {intl.formatMessage(messages.importFileSectionTitle)}
        </Text>
      </Box>
      <Box csx={{ marginBottom: '8px' }}>
        <Text>{intl.formatMessage(messages.importFileSubtitle1)}</Text>
        <Text
          as="a"
          variant="action1"
          tone="info"
          csx={{ cursor: 'pointer' }}
          onClick={handleTemplateDownload}
        >
          {` ${intl.formatMessage(messages.importFileSubtitleModel)} `}
        </Text>
        <Text>{intl.formatMessage(messages.importFileSubtitle2)}</Text>
      </Box>
      <Dropzone
        accept=".csv,.xlsx"
        onDropAccepted={handleFile}
        onFileReset={handleReset}
      >
        <div className="pt7">
          <div>
            <span className="f4">
              {intl.formatMessage(messages.dropzoneMainMessage)}
            </span>
            <span className="f4 c-link" style={{ cursor: 'pointer' }}>
              {` ${intl.formatMessage(messages.dropzoneClickMessage)}`}
            </span>
          </div>
        </div>
      </Dropzone>
      <Flex justify="flex-end" csx={{ marginY: '8px' }}>
        <div className="flex flex-column ">
          <Button
            className="mt2"
            disabled={isButtonDisabled}
            loading={importLoading}
            onClick={handleSubmit}
          >
            {intl.formatMessage(messages.sendFileLabel)}
          </Button>
          <Button
            variant="secondary"
            className="mt2"
            disabled={verifyDisabled}
            onClick={() => getNotFoundSKUs()}
          >
            {intl.formatMessage(messages.affiliateVerifySKUs)}
          </Button>
        </div>
      </Flex>
      {dataSKUs?.getNotFoundCommissions !== undefined ? (
        <CommissionsNotFound notFound={dataSKUs.getNotFoundCommissions} />
      ) : null}
    </>
  )
}

export default ImportDropzone
