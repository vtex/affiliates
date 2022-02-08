import type { FC } from 'react'
import React from 'react'
import { Tabs, Tab, TabList, TabPanel, useTabState } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import ImportCommissionsTab from './ImportCommissionsTab'
import ExportCommissionsTab from './ExportCommissionsTab'
import { messages } from '../../../utils/messages'

const CommissionsTabs: FC = () => {
  const intl = useIntl()
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList aria-label="Usage Tabs">
        <Tab id="1">{intl.formatMessage(messages.importTabLabel)}</Tab>
        <Tab id="2">{intl.formatMessage(messages.exportTabLabel)}</Tab>
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
