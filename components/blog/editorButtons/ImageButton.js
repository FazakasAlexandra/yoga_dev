
import { insertImage } from '../utils/images'
import { useSlate } from 'slate-react'
import { BaseButton } from './BaseButton'

export const ImageButton = ({ icon, label }) => {
  const editor = useSlate()
  return (
    <BaseButton
      label={label}
      onClick={() => {
        const url = prompt("Enter an Image URL");
        insertImage(editor, url);
      }}
    >
    </BaseButton>
  )
}
