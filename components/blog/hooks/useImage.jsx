import { useSlate } from 'slate-react'
import {
    Transforms,
} from 'slate'
import isUrl from 'is-url'

const useImage = () => {
    const editor = useSlate()

    const insertImage = (url) => {
        if (!url) return;

        Transforms.insertNodes(editor, {
            type: "image",
            alt: "image",
            isVoid: true,
            url,
            children: [{ text: "" }]
        })
    };

    const isImageUrl = (url) => {
        if (!url) return false
        if (!isUrl(url)) return false
        const ext = new URL(url).pathname.split('.').pop()
        return imageExtensions.includes(ext)
    }

    const withImages = editor => {
        const { insertData, isVoid } = editor

        editor.isVoid = element => {
            return element.type === 'image' ? true : isVoid(element)
        }

        editor.insertData = data => {
            const text = data.getData('text/plain')
            const { files } = data

            if (files && files.length > 0) {
                for (const file of files) {
                    const reader = new FileReader()
                    const [mime] = file.type.split('/')

                    if (mime === 'image') {
                        reader.addEventListener('load', () => {
                            const url = reader.result
                            insertImage(editor, url)
                        })

                        reader.readAsDataURL(file)
                    }
                }
            } else if (isImageUrl(text)) {
                insertImage(editor, text)
            } else {
                insertData(data)
            }
        }

        return editor
    }

    return {
        withImages,
        isImageUrl,
        insertImage
    }

}

export default useImage;