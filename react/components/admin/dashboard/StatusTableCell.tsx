import { Skeleton, Tag } from '@vtex/admin-ui'
import type { ResolverRenderProps } from '@vtex/admin-ui/dist/declarations/src/table/resolvers/resolver-core'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { statusTagControl } from '../../../utils/shared'

type TableColumns = {
  status: string
}

const StatusTableCell = ({
  item,
  context,
}: ResolverRenderProps<null, TableColumns>) => {
  const { status } = item
  const intl = useIntl()
  const tagControls = useMemo(() => {
    return statusTagControl(intl, status)
  }, [status, intl])

  if (context.status === 'loading') {
    return <Skeleton csx={{ height: 24 }} />
  }

  return (
    <Tag
      label={tagControls.label}
      variant={tagControls.palette}
      size={tagControls.size}
    />
  )
}

export default StatusTableCell
