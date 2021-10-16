import { useSlate } from 'slate-react'
import {
    Transforms,
    Editor,
    Range,
    Element as SlateElement,
} from 'slate'

const useMark = () => {
    const editor = useSlate()

    const isMarkActive = (format) => {
        const marks = Editor.marks(editor)
        console.log(format, marks)
        return marks ? marks[format] === true : false
    }
    
    const toggleMark = (format) => {
        const isActive = isMarkActive(format)

        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }
    
    return {
        toggleMark,
    }
}

export default useMark;