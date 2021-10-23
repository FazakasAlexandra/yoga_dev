import React, { useState, useEffect } from 'react'
import {
  ToolbarButton,
} from './'
import {
  useToolbarMenus
} from './hooks'

export const Toolbar = React.forwardRef(
  ({ ...props }, ref) => {
    const {
      toolbarMenus,
      setToolbarMenuAction,
      toggleToolbarMenus,
      toggleToolbarMenuOptions
    } = useToolbarMenus();

    return <div
      className={props.class}
      {...props}
      ref={ref}
    > 
      {
        toolbarMenus.map(({
          actions,
          icon,
          id
        }) => {
          return <ToolbarButton
            key={id}
            menuId={id}
            icon={icon}
            toolbarMenus={toolbarMenus}
            iconClick={toggleToolbarMenus}
            actions={actions}
            actionClick={setToolbarMenuAction}
            toggleToolbarMenuOptions={toggleToolbarMenuOptions}
          />
        })
      }
    </div >
  }
)

export default Toolbar;
Toolbar.displayName = 'Toolbar';