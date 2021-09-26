import React, { useState } from 'react'
import { MarkButton } from './editorButtons/MarkButton'
import { BlockButton } from './editorButtons/BlockButton'
import { ImageButton } from './editorButtons/ImageButton'
import { BaseButton } from './editorButtons/BaseButton'
import { LinkButton } from './editorButtons/LinkButton'
import { RemoveLinkButton } from './editorButtons/RemoveLinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const Toolbar = React.forwardRef(
  ({ ...props }, ref) => {

    return <div
      className={props.class}
      {...props}
      ref={ref}
    >
      <LinkButton label="Link" format="link" icon="/toolbar-icons/link.svg" />
      <RemoveLinkButton label="Remove link" format="unlink" icon="/toolbar-icons/unlink.svg" />
      <MarkButton label="Bold" format="bold" icon="/toolbar-icons/bold.svg" />
      <MarkButton label="Italic" format="italic" icon="/toolbar-icons/italic.svg" />
      {/*         <MarkButton label="Underline" format="underline" icon="/toolbar-icons/underline.svg" />
        <BlockButton label="Medium text" format="heading-two" icon="/toolbar-icons/h2.svg" />
        <BlockButton label="Quote" format="block-quote" icon="/toolbar-icons/quote.svg" />
        <BlockButton label="Numbers list" format="numbered-list" icon="/toolbar-icons/list-numbers.svg" />
        <BlockButton label="Bullets list" format="bulleted-list" icon="/toolbar-icons/list-bullets.svg" />
*/}
      <ImageButton label="Image" format="image" icon="/toolbar-icons/picture.svg" />
    </div>
  }
)

export default Toolbar;
Toolbar.displayName = 'Toolbar';