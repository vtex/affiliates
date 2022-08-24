import { Menu, MenuButton, MenuItem, useMenuState } from '@vtex/admin-ui'
import React from 'react'

import type { Action } from '../../../typings/tables'

const Styles = {
  Main: {
    display: 'flex',
    justifyContent: 'center',
    paddingY: 2,
    'button:not([data-critical])': {
      color: '$primary',
    },
  },
  Container: {
    minWidth: '12rem',
    '> button': {
      marginY: 0,
    },
  },
}

type TableActionsProps = {
  actions: Action[]
}

const TableActions = ({ actions }: TableActionsProps) => {
  const state = useMenuState()

  return (
    <>
      <MenuButton variant="tertiary" state={state} />
      <Menu aria-label="actions" state={state} csx={Styles.Container}>
        {actions.map((action) => {
          return (
            <MenuItem
              key={action.label}
              onClick={action.handleOnClick}
              icon={action.icon}
              label={action.label}
            />
          )
        })}
      </Menu>
    </>
  )
}

export default TableActions
