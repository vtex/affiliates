import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMenuState,
} from '@vtex/admin-ui'
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
    <Menu state={state} hideOnClick csx={Styles.Main}>
      <MenuButton
        display="actions"
        variant="tertiary"
        className="line-action-button"
      />

      <MenuList aria-label="actions" state={state} csx={Styles.Container}>
        {actions.map((action) => {
          return (
            <MenuItem
              key={action.label}
              onClick={action.handleOnClick}
              icon={action.icon}
            >
              {action.label}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default TableActions
