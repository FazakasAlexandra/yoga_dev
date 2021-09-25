import React, { useCallback, useEffect, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import {
    createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { Toolbar } from '../../../components/blog/Toolbar'
import { Leaf } from '../../../components/blog/utils/Leaf'
import { initialValue } from '../../../components/blog/utils/initialValue'
import { Element } from '../../../components/blog/utils/Element'
import { withImages } from '../../../components/blog/utils/insertImage'
import { withLinks } from '../../../components/blog/utils/withLinks'
import { toggleMark } from '../../../components/blog/editorButtons/MarkButton'
import { Preview } from '../../../components/blog/Preview'
import { FeatureImage } from '../../../components/blog/FeatureImage'
import { Menu } from '../../../components/blog/Menu'
// @refresh reset
import AdminLayout from '../../../components/AdminLayout'
import Layout from '../../../components/Layout'


const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const Blog = () => {
    const [featureImage, setFeatureImage] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [isPreview, setIsPreview] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [editorContent, setEditorContent] = useState(initialValue)
    const editor = useMemo(() => withLinks(withImages(withHistory(withReact(createEditor())))), [])
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    useEffect(() => {
        console.log(editorContent)
    }, [editorContent])

    const setImage = () => {
        const url = prompt("Enter an Image URL");
        if (url) {
            setFeatureImage(url);
        }
    }

    const handleKeydown = (event) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            }
        }
    }

    return (
        <Layout activeTab={'account'}>
            <AdminLayout activeTab="blog" style={{ padding: '2rem 0' }}>
                {
                    !isPreview ?
                        <div className="editor">
                            <Slate
                                editor={editor}
                                value={editorContent}
                                onChange={value => setEditorContent(value)}
                            >
                                <Toolbar
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                    isPreview={isPreview}
                                    showForm={showForm}
                                    setPreview={setIsPreview}
                                    toggleForm={() => setShowForm(!showForm)}
                                />
                                {
                                    showForm && <Menu
                                        title={title}
                                        description={description}
                                        setTitle={setTitle}
                                        setDescription={setDescription}
                                    />
                                }
                                <FeatureImage
                                    featureImage={featureImage}
                                    showForm={showForm}
                                    setImage={setImage}
                                />
                                <Editable
                                    style={{ padding: '20px 20%' }}
                                    spellCheck={false}
                                    autoFocus={false}
                                    className="editable"
                                    placeholder="Write anything…"
                                    autoCapitalize="false"
                                    autoCorrect="false"
                                    renderElement={renderElement}
                                    renderLeaf={renderLeaf}
                                    onKeyDown={event => handleKeydown(event)}
                                />
                            </Slate>
                        </div>
                        : <Preview
                            title={title}
                            featureImage={featureImage}
                            description={description}
                            nodes={editorContent}
                            isPreview={isPreview}
                            setPreview={setIsPreview}
                        />
                }
            </AdminLayout>
        </Layout>
    )
}

export default Blog