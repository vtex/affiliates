import {
  Button,
  Tooltip,
  IconQuestion,
  Toolbar,
  ToolbarButton,
  useToolbarState,
  IconArrowLineUp,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { messages } from '../../../utils/messages'

type ExportTableDataControlProps = {
  maxResults: number
  totalResults: number
  exportAction: () => void
  loading: boolean
}

const ExportTableDataControl: FC<ExportTableDataControlProps> = ({
  maxResults,
  totalResults,
  exportAction,
  loading,
}) => {
  const intl = useIntl()
  const toolbar = useToolbarState()
  const isButtonDisabled = useMemo(() => {
    if (maxResults === 0) {
      return false
    }

    return maxResults < totalResults
  }, [maxResults, totalResults])

  const showTooltipHelper = useMemo(() => {
    if (isButtonDisabled) {
      return (
        <Tooltip text="Tooltip Label" placement="right">
          <Button icon={<IconQuestion />} variant="neutralTertiary" />
        </Tooltip>
      )
    }

    return null
  }, [isButtonDisabled])

  return (
    <>
      <Toolbar state={toolbar}>
        <ToolbarButton
          disabled={isButtonDisabled}
          size="normal"
          variant="tertiary"
          icon={<IconArrowLineUp />}
          loading={loading}
          onClick={exportAction}
        >
          {intl.formatMessage(messages.exportLabel)}
        </ToolbarButton>
        {showTooltipHelper}
      </Toolbar>
    </>
  )
}

export default ExportTableDataControl
