import { Flex, Skeleton, Text, IconArrowSquareOut, tag } from '@vtex/admin-ui'
import type { ResolverRenderProps } from '@vtex/admin-ui/dist/declarations/src/table/resolvers/resolver-core'
import React, { useCallback } from 'react'

type TableColumns = {
  orderId: string
}

const Styles = {
  text: {
    marginLeft: '4px',
  },
  icon: {
    minHeight: '16px',
    minWidth: '16px',
    height: '16px',
    width: '16px',
    color: '$info',
    paddingBottom: '2px',
  },
  shared: {
    cursor: 'pointer',
  },
}

const OrderIdTableCell = ({
  item,
  context,
}: ResolverRenderProps<null, TableColumns>) => {
  const { orderId } = item

  const handleClick = useCallback(() => {
    window.open(`/admin/checkout/#/orders/${orderId}`, '_blank')
  }, [orderId])

  if (context.status === 'loading') {
    return <Skeleton csx={{ height: 24 }} />
  }

  return (
    <tag.div>
      <Flex align="center">
        <Text
          variant="action1"
          tone="info"
          onClick={handleClick}
          csx={{ ...Styles.text, ...Styles.shared }}
        >
          {orderId}
        </Text>
        <IconArrowSquareOut
          onClick={handleClick}
          csx={{ ...Styles.icon, ...Styles.shared }}
        />
      </Flex>
    </tag.div>
  )
}

export default OrderIdTableCell
