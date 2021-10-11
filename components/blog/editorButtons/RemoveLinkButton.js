import { useSlate } from 'slate-react'
import {
    Transforms,
    Editor,
    Range,
    Element as SlateElement,
} from 'slate'
import { BaseButton } from './BaseButton'

export const RemoveLinkButton = ({ icon, label }) => {
    const editor = useSlate()
    return (
        <BaseButton
            label={label}
            onMouseDown={() => {
              if (isLinkActive(editor)) {
                unwrapLink(editor)
              }
            }}
        >
        </BaseButton>
    )
}

const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}

const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}