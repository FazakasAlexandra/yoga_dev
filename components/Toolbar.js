import React from 'react'
import { MarkButton } from './editorButtons/MarkButton'
import { BlockButton } from './editorButtons/BlockButton'
import { ImageButton } from './editorButtons/ImageButton'
import { BaseButton } from './editorButtons/BaseButton'
import { LinkButton } from './editorButtons/LinkButton'
import { RemoveLinkButton } from './editorButtons/RemoveLinkButton'

export const Toolbar = React.forwardRef(
  ({ isPreview, setPreview, toggleForm, showForm, className, ...props }, ref) => (
    <div
      class="toolbar"
      {...props}
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 38px',
        position: 'sticky',
        top: '0',
        left: '0',
        zIndex: 2,
        background: 'white'
      }}
    >
      <div style={{flexGrow: 1}}>
        <BaseButton
          style={{
            color: "#4976ED",
            background: 'none',
            paddingBottom: '5px',
            borderBottom: 'solid',
            fontSize: '18px',
            borderWidth: 'revert'
          }}
          onClick={toggleForm}
        >
          Menu
        </BaseButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
        <LinkButton label="Link" format="link" icon="/toolbar-icons/link.svg" />
        <RemoveLinkButton label="Remove link" format="unlink" icon="/toolbar-icons/unlink.svg" />
        <MarkButton label="Bold" format="bold" icon="/toolbar-icons/bold.svg" />
        <MarkButton label="Italic" format="italic" icon="/toolbar-icons/italic.svg" />
        <MarkButton label="Underline" format="underline" icon="/toolbar-icons/underline.svg" />
        {/* <MarkButton label="Code" format="code" icon="/toolbar-icons/code.svg" /> */}
        <BlockButton label="Large text" format="heading-one" icon="/toolbar-icons/h1.svg" />
        <BlockButton label="Medium text" format="heading-two" icon="/toolbar-icons/h2.svg" />
        <BlockButton label="Quote" format="block-quote" icon="/toolbar-icons/quote.svg" />
        <BlockButton label="Numbers list" format="numbered-list" icon="/toolbar-icons/list-numbers.svg" />
        <BlockButton label="Bullets list" format="bulleted-list" icon="/toolbar-icons/list-bullets.svg" />
        <ImageButton label="Image" format="image" icon="/toolbar-icons/picture.svg" />
      </div>
      <div style={{ flexGrow: 1, textAlign: 'end' }}>
        <BaseButton
          style={{
            color: "#4976ED",
            background: 'none',
            paddingBottom: '5px',
            borderBottom: 'solid',
            fontSize: '18px',
            borderWidth: 'revert'
          }}
          onClick={() =>
            setPreview(true)
          }
        >
          Preview
        </BaseButton>
      </div>
    </div>
  )
)

Toolbar.displayName = 'Toolbar';