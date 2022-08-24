import { Stack } from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'

import ImportDropzone from './ImportDropzone'
import LastImportInfoCard from './LastImportInfoCard'

const ImportCommissionsTab: FC = () => {
  return (
    <Stack space="$s" fluid>
      <ImportDropzone />
      <LastImportInfoCard />
    </Stack>
  )
}

export default ImportCommissionsTab
