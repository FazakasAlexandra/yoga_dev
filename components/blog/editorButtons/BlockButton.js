import { useSlate } from 'slate-react'
import { BaseButton } from './BaseButton'
import { Editor, Element as SlateElement, Transforms } from 'slate'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const BlockButton = ({ format, icon, label }) => {
    const editor = useSlate()
    return (
        <BaseButton
            label={label}
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
        </BaseButton>
    )
}

export const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}