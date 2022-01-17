import type { FC } from 'react'
import React from 'react'
import { Tabs, Tab, TabList, TabPanel, useTabState } from '@vtex/admin-ui'

import ImportCommissionsTab from './ImportCommissionsTab'
import ExportCommissionsTab from './ExportCommissionsTab'

const CommissionsTabs: FC = () => {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList aria-label="Usage Tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
      </TabList>
      <TabPanel id="1" csx={{ padding: 3 }}>
        <ImportCommissionsTab />
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        <ExportCommissionsTab />
      </TabPanel>
    </Tabs>
  )
}

export default CommissionsTabs
