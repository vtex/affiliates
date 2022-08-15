import type { FC } from 'react'
import React from 'react'
import {
  Tab,
  TabList,
  TabPanel,
  useTabState,
  TabPanelList,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import ImportCommissionsTab from './ImportCommissionsTab'
import ExportCommissionsTab from './ExportCommissionsTab'
import { messages } from '../../../utils/messages'

const CommissionsTabs: FC = () => {
  const intl = useIntl()
  const state = useTabState()

  return (
    <>
      <TabList aria-label="Commissions tabs" state={state}>
        <Tab id="1">{intl.formatMessage(messages.exportTabLabel)}</Tab>
        <Tab id="2">{intl.formatMessage(messages.importTabLabel)}</Tab>
      </TabList>
      <TabPanelList state={state}>
        <TabPanel tabId="1" csx={{ padding: 3 }}>
          <ExportCommissionsTab />
        </TabPanel>
        <TabPanel tabId="2" csx={{ padding: 3 }}>
          <ImportCommissionsTab />
        </TabPanel>
      </TabPanelList>
    </>
  )
}

export default CommissionsTabs
