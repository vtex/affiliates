import {
  Box,
  Button,
  Card,
  IconArrowLineDown,
  Label,
  Tooltip,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useMemo, useCallback } from 'react'
import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import GET_LAST_IMPORTED_COMMISSION_FILE_INFO from '../../../graphql/getLastImportInfo.graphql'
import { messages } from '../../../utils/messages'
import IconHelp from '../shared/IconHelp'

interface LastImportInfo {
  lastImportedCommissionFileInfo: {
    fileId: string
    filename: string
    uploadDate: string
    uploadedBy: string
  }
}

export const LastImportInfoCard: FC = () => {
  const intl = useIntl()

  const { data } = useQuery<LastImportInfo>(
    GET_LAST_IMPORTED_COMMISSION_FILE_INFO
  )

  const tooltipLabel = useMemo(
    () =>
      data &&
      intl.formatMessage(messages.commissionLastImportFilenameText) +
        data.lastImportedCommissionFileInfo.filename +
        intl.formatMessage(messages.commissionLastImportUploadDateText) +
        data.lastImportedCommissionFileInfo.uploadDate +
        intl.formatMessage(messages.commissionLastImportUploadedByText) +
        data.lastImportedCommissionFileInfo.uploadedBy,
    [data, intl]
  )

  const downloadLastImport = useCallback(() => {
    window.open(
      `https://gabiru--sandboxbrdev.myvtex.com/_v/commissionLastImport/${data?.lastImportedCommissionFileInfo.fileId}`,
      'blank'
    )
  }, [data])

  return (
    <>
      {data && (
        <Card>
          <Label csx={{ display: 'flex', padding: 3 }}>
            {intl.formatMessage(messages.commissionLastImportHeading)}
            <Tooltip label={tooltipLabel}>
              <Box csx={{ paddingLeft: 1 }}>
                <IconHelp />
              </Box>
            </Tooltip>
          </Label>
          <Button
            variant="tertiary"
            icon={<IconArrowLineDown />}
            onClick={downloadLastImport}
          >
            {data.lastImportedCommissionFileInfo.filename}
          </Button>
        </Card>
      )}
    </>
  )
}

export default LastImportInfoCard
