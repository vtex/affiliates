import type { FC } from 'react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Dropzone } from 'vtex.styleguide'
import { Text, Box, Button, Flex } from '@vtex/admin-ui'

import { messages } from '../../../utils/messages'

const ImportDropzone: FC = () => {
  const intl = useIntl()
  const [file, setFile] = useState<File>()

  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: ImportDropzone.tsx ~ line 6 ~ file', file)
  const handleFile = async (files: File[]) => {
    setFile(files[0])
  }

  const handleReset = () => {
    setFile(undefined)
  }

  // TODO: Connect with the backend
  const handleSubmit = () => {}

  return (
    <>
      <Box csx={{ marginBottom: '8px' }}>
        <Text variant="title1">
          {intl.formatMessage(messages.importFileSectionTitle)}
        </Text>
      </Box>
      <Dropzone
        accept=".csv"
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
        <Button onClick={handleSubmit}>Send file</Button>
      </Flex>
    </>
  )
}

export default ImportDropzone
