import type { StyleProp } from '@vtex/admin-ui'
import { Box, Skeleton } from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'

type LoadingBoxProps = {
  csx?: StyleProp
}

const LoadingBox: FC<LoadingBoxProps> = ({ csx }) => {
  return (
    <Box csx={csx}>
      <Skeleton />
    </Box>
  )
}

export default LoadingBox
