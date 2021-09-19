import React, { useCallback, useEffect, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import {
    createEditor,
} from 'slate'
import { ThemeProvider } from '@material-ui/core'
import { withHistory } from 'slate-history'
import { Toolbar } from '../../../components/Toolbar'
import { Leaf } from '../../../utils/Leaf'
import { initialValue } from '../../../utils/initialValue'
import { Element } from '../../../utils/Element'
import { withImages } from '../../../utils/insertImage'
import { withLinks } from '../../../utils/withLinks'
import { toggleMark } from '../../../components/editorButtons/MarkButton'
import { Preview } from '../../../components/Preview'
// @refresh reset
import AdminLayout from '../../../components/AdminLayout'
import Layout from '../../../components/Layout'
import { toolbarTheme } from '../../../utilities.js'
import TextField from '@material-ui/core/TextField'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const Blog = () => {
    const [featureImage, setFeatureImage] = useState("https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    const [editorContent, setEditorContent] = useState(initialValue)
    const [isPreview, setIsPreview] = useState(false)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withLinks(withImages(withHistory(withReact(createEditor())))), [])

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        console.log(editorContent)
    }, [editorContent])

    return (
        <Layout activeTab={'account'}>
            <AdminLayout activeTab="blog" style={{ padding: '2rem 0' }}>
                {!isPreview ?
                    <div
                        className="editor"
                        style={{
                            borderRadius: "10px",
                        }}
                    >

                        <Slate
                            editor={editor}
                            value={editorContent}
                            onChange={value => setEditorContent(value)}>
                            <Toolbar
                                isPreview={isPreview}
                                setPreview={setIsPreview}
                                toggleForm={() => setShowForm(!showForm)}
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                            />
                            {showForm && <ThemeProvider theme={toolbarTheme}>
                                <div className="textfields">
                                    <TextField
                                        label="Title"
                                        fullWidth
                                        margin="dense"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <TextField
                                        label="Short description"
                                        multiline
                                        rows={5}
                                        fullWidth
                                        margin="dense"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </ThemeProvider>}
                            <img
                                onClick={() => {
                                    const url = prompt("Enter an Image URL");
                                    if (url) {
                                        setFeatureImage(url);
                                    }
                                }}
                                className="feature-image"
                                style={{ marginTop: showForm ? "-254px" : "-10px" }}
                                src={featureImage}
                                alt="feature image"
                            />
                            <Editable
                                style={{ padding: '0 38px 38px' }}
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                                placeholder="Write anything…"
                                spellCheck={false}
                                autoFocus={false}
                                autoCapitalize="false"
                                autoCorrect="false"
                                onKeyDown={event => {
                                    for (const hotkey in HOTKEYS) {
                                        if (isHotkey(hotkey, event)) {
                                            event.preventDefault()
                                            const mark = HOTKEYS[hotkey]
                                            toggleMark(editor, mark)
                                        }
                                    }
                                }}
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