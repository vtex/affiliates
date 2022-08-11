import { Box, Button, IconArrowLineDown, Text, Tooltip } from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useMemo, useCallback } from 'react'
import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime/react/components/RenderContext'

import GET_LAST_IMPORTED_COMMISSION_FILE_INFO from '../../../graphql/getLastImportInfo.graphql'
import { messages } from '../../../utils/messages'
import IconHelp from '../shared/IconHelp'

interface LastImportInfo {
  lastImportedCommissionFileInfo?: {
    fileId: string
    filename: string
    uploadDate: string
    uploadedBy: string
  }
}

export const LastImportInfoCard: FC = () => {
  const intl = useIntl()

  const { account, workspace } = useRuntime()

  const { data, loading } = useQuery<LastImportInfo>(
    GET_LAST_IMPORTED_COMMISSION_FILE_INFO
  )

  const tooltipLabel = useMemo(
    () =>
      data?.lastImportedCommissionFileInfo &&
      intl.formatMessage(messages.commissionLastImportFilenameText) +
        data.lastImportedCommissionFileInfo.filename +
        intl.formatMessage(messages.commissionLastImportUploadDateText) +
        intl.formatDate(data.lastImportedCommissionFileInfo.uploadDate) +
        intl.formatMessage(messages.commissionLastImportUploadedByText) +
        data.lastImportedCommissionFileInfo.uploadedBy,
    [data, intl]
  )

  const downloadLastImport = useCallback(() => {
    window.open(
      `https://${workspace}--${account}.myvtex.com/_v/commissionLastImport/${data?.lastImportedCommissionFileInfo?.fileId}`,
      'blank'
    )
  }, [account, data?.lastImportedCommissionFileInfo?.fileId, workspace])

  const showDownloadButton = useMemo(() => {
    if (data) {
      return (
        <Button
          variant="tertiary"
          icon={<IconArrowLineDown />}
          onClick={downloadLastImport}
          loading={loading}
        >
          {data.lastImportedCommissionFileInfo?.filename}
        </Button>
      )
    }

    return (
      <Text csx={{ display: 'flex', padding: 3 }} variant="action1">
        {intl.formatMessage(messages.noLastFileLabel)}
      </Text>
    )
  }, [data, downloadLastImport, loading, intl])

  return (
    <Box>
      <Text variant="title2" csx={{ display: 'flex', padding: 3 }}>
        {intl.formatMessage(messages.commissionLastImportHeading)}
        {!loading && data && (
          <Tooltip text={tooltipLabel ?? ''}>
            <Box csx={{ paddingLeft: 1 }}>
              <IconHelp />
            </Box>
          </Tooltip>
        )}
      </Text>
      {showDownloadButton}
    </Box>
  )
}

export default LastImportInfoCard
