import { useSlate } from 'slate-react'
import {
    Transforms,
    Editor,
    Range,
    Element as SlateElement,
} from 'slate'

const useBlock = () => {
    const LIST_TYPES = ['numbered-list', 'bulleted-list']
    const editor = useSlate()


    const isBlockActive = (format) => {
        const [match] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
        })

        return !!match
    }

    const toggleBlock = (format) => {
        const isActive = isBlockActive(format)
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

    return {
        toggleBlock
    }
}

export default useBlock;