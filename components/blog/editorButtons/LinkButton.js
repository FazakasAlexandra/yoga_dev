import { useSlate } from 'slate-react'
import {
    Transforms,
    Editor,
    Range,
    Element as SlateElement,
} from 'slate'
import { BaseButton } from './BaseButton'

export const LinkButton = ({ icon, label }) => {
    const editor = useSlate()

    return (
        <BaseButton
            label={label}
            active={isLinkActive(editor)}
            onClick={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                insertLink(editor, url)
            }}
        >
        </BaseButton>
    )
}
const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrap
        Link(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}


const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}