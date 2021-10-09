import { useSlate } from 'slate-react'
import {
    Transforms,
    Editor,
    Range,
    Element as SlateElement,
} from 'slate'

const useLink = () => {
    const editor = useSlate()

    const insertLink = (url) => {
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

    const removeLink = () => {
        if (isLinkActive(editor)) {
            Transforms.unwrapNodes(editor, {
                match: n =>
                    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
            })
        }
    }

    const isLinkActive = () => {
        const [link] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
        return !!link
    }

    return {
        insertLink,
        isLinkActive,
        removeLink
    }
}

export default useLink;