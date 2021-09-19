
import { insertImage } from '../../utils/insertImage'
import { useSlate } from 'slate-react'
import { BaseButton } from './BaseButton'
import Icon from './Icon'

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
      <Icon icon={icon} />
    </BaseButton>
  )
}
