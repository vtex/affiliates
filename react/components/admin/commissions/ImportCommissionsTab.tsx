import { Set } from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'

import ImportDropzone from './ImportDropzone'
import LastImportInfoCard from './LastImportInfoCard'

const ImportCommissionsTab: FC = () => {
  return (
    <Set orientation="vertical" spacing={3} fluid>
      <ImportDropzone />
      <LastImportInfoCard />
    </Set>
  )
}

export default ImportCommissionsTab
