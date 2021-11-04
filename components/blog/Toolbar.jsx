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
    } = useToolbarMenus(props.pictures, props.openGallery);

    return <div
      className={props.toolbarClassName}
      ref={ref}
    > 
      {
        toolbarMenus.map((toolbarMenu) => {
          return <ToolbarButton
            key={toolbarMenu.id}
            toolbarMenu={toolbarMenu}
            iconClick={toggleToolbarMenus}
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