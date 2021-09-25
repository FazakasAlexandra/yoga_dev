import { useSlate } from 'slate-react'
import { Editor } from 'slate'
import { BaseButton } from './BaseButton'
import Icon from './Icon'

export const MarkButton = ({ format, icon, label }) => {
    const editor = useSlate()
    return (
        <BaseButton
            label={label}
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon icon={icon}/>
        </BaseButton>
    )
}
const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

