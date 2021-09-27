import React, { useState, useEffect } from 'react'
import { MarkButton } from './editorButtons/MarkButton'
import { BlockButton } from './editorButtons/BlockButton'
import { ImageButton } from './editorButtons/ImageButton'
import { BaseButton } from './editorButtons/BaseButton'
import { LinkButton } from './editorButtons/LinkButton'
import { RemoveLinkButton } from './editorButtons/RemoveLinkButton'
import { ToolbarMenu } from './'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faImage,
  faParagraph,
  faBars,
  faBold,
} from '@fortawesome/free-solid-svg-icons'

export const Toolbar = React.forwardRef(
  ({ ...props }, ref) => {
    const [toolbarMenus, setToolbarMenus] = useState([
      {
        active: false,
        action: "add"
      },
      {
        active: false,
        action: "bold"
      },
      {
        active: false,
        action: "large"
      },
      {
        active: false,
        action: "numbers"
      },
      {
        active: false,
        action: "random"
      }
    ]);

    const setToolbarMenuAction = (target, action) => {
      const updatedToolbarMenu = toolbarMenus.map((menu, idx) => {
        if (idx === target) {
          menu.action = action
          return menu
        }
        return menu
      })

      setToolbarMenus(updatedToolbarMenu);
    }

    const toggleToolbarMenus = (target) => {
      const toggledMenus = toolbarMenus.map((menu, idx) => {
        if (idx === target) {
          menu.active = !menu.active;
          return menu;
        }
        menu.active = false;
        return menu;
      })

      setToolbarMenus(toggledMenus)
    }

    return <div
      className={props.class}
      {...props}
      ref={ref}
    >
      <ToolbarMenu
        toolbarMenus={toolbarMenus}
        menuId={0}
        icon={faLink}
        iconClick={toggleToolbarMenus}
        optionClick={setToolbarMenuAction}
        options={[{ name: "add" }, { name: "remove" }]}
      />

      <ToolbarMenu
        toolbarMenus={toolbarMenus}
        menuId={1}
        icon={faBold}
        iconClick={toggleToolbarMenus}
        optionClick={setToolbarMenuAction}
        options={[{ name: "underline" }, { name: "italic" }, { name: "bold" }]}
      />

      <ToolbarMenu
        toolbarMenus={toolbarMenus}
        menuId={2}
        icon={faParagraph}
        iconClick={toggleToolbarMenus}
        optionClick={setToolbarMenuAction}
        options={[{ name: "large text" }, { name: "medium text" }, { name: "quote" }]}
      />

      <ToolbarMenu
        toolbarMenus={toolbarMenus}
        menuId={3}
        icon={faBars}
        iconClick={toggleToolbarMenus}
        optionClick={setToolbarMenuAction}
        options={[{ name: "numbers" }, { name: "bullets" }]}
      />

      <ToolbarMenu
        toolbarMenus={toolbarMenus}
        menuId={4}
        icon={faImage}
        iconClick={toggleToolbarMenus}
        optionClick={setToolbarMenuAction}
        options={[{ name: "random" }, { name: "upload" }]}
      />

      {/*       
      <LinkButton label="Link" format="link" icon="/toolbar-icons/link.svg" />
      <RemoveLinkButton label="Remove link" format="unlink" icon="/toolbar-icons/unlink.svg" />
      <MarkButton label="Bold" format="bold" icon="/toolbar-icons/bold.svg" />
      <MarkButton label="Italic" format="italic" icon="/toolbar-icons/italic.svg" />
      <MarkButton label="Underline" format="underline" icon="/toolbar-icons/underline.svg" />
      <BlockButton label="Medium text" format="heading-two" icon="/toolbar-icons/h2.svg" />
      <BlockButton label="Quote" format="block-quote" icon="/toolbar-icons/quote.svg" />
      <BlockButton label="Numbers list" format="numbered-list" icon="/toolbar-icons/list-numbers.svg" />
      <BlockButton label="Bullets list" format="bulleted-list" icon="/toolbar-icons/list-bullets.svg" />
      <ImageButton label="Image" format="image" icon="/toolbar-icons/picture.svg" /> 
      */}
    </div >
  }
)

export default Toolbar;
Toolbar.displayName = 'Toolbar';