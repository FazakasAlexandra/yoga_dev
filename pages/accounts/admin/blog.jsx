// @refresh reset
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, } from 'slate'
import { withHistory } from 'slate-history'
import { toggleMark } from '../../../components/blog/editorButtons/MarkButton'
import { useMediaQuery } from 'beautiful-react-hooks';
import {
    AdminLayout,
    Layout
} from '../../../components/'
import {
    MenuEditor,
    FeatureImage,
    Preview,
    PostForm,
    Toolbar
} from '../../../components/blog/'
import {
    Leaf,
    Element,
    withLinks,
    withImages,
    initialValue,
} from '../../../components/blog/utils'
import db from '../../../db'
import isHotkey from 'is-hotkey'
import { ToastContainer, toast } from 'react-toastify'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

export async function getStaticProps({ locale }) {
    const categoriesRes = await db.posts.getCategories();
    const categories = await categoriesRes.json()

    return {
        props: {
            categories: categories.data,
            ...(await serverSideTranslations(locale, ['blog', 'common', 'categories']))
        },
    }
}


const Blog = (props) => {
    const isMobile = useMediaQuery('(max-width: 820px)');
    const [featureImage, setFeatureImage] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [isPreview, setIsPreview] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    const [categories, setCategories] = useState(props.categories.map((category) => {
        return { ...category, isSelected: false };
    }))
    const [editorContent, setEditorContent] = useState(initialValue)
    const editor = useMemo(() => withLinks(withImages(withHistory(withReact(createEditor())))), [])
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const { t } = useTranslation();

    const publishPost = () => {
        db.getJWT().then(({ jwtToken }) => {

            db.posts.publish({
                title,
                description,
                categories: categories.filter(category => category.isSelected).map(({ name, id }) => {
                    return { name, id }
                }),
                feature_image: featureImage,
                content: editorContent,
            }, jwtToken)
                .then(res => res.json())
                .then(res => {
                    if (res.code === 500) {
                        toast.error(t("common:publish error"))
                        return
                    }
                    toast.success(t("common:published"))
                })
        })
    }

    const setImage = () => {
        const url = prompt(t("common:enter url"));
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
                                <MenuEditor
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                    publishPost={publishPost}
                                    isPreview={isPreview}
                                    showForm={showForm}
                                    showToolbar={showToolbar}
                                    setShowToolbar={setShowToolbar}
                                    setPreview={setIsPreview}
                                    toggleForm={() => setShowForm(!showForm)}
                                />
                                {
                                    showForm && <PostForm
                                        close={() => setShowForm(false)}
                                        showForm={showForm}
                                        title={title}
                                        description={description}
                                        setTitle={setTitle}
                                        setDescription={setDescription}
                                        categories={categories}
                                        setCategories={setCategories}
                                    />
                                }
                                <FeatureImage
                                    featureImage={featureImage}
                                    showForm={showForm}
                                    setImage={setImage}
                                />
                                <Editable
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
                                {isMobile && showToolbar && <Toolbar
                                    showToolbar={showToolbar}
                                    className="mobile-toolbar"
                                /> || null}
                            </Slate>
                        </div>
                        : <Preview
                            title={title}
                            categories={categories.filter(category => category.isSelected)}
                            featureImage={featureImage}
                            description={description}
                            nodes={editorContent}
                            isPreview={isPreview}
                            setPreview={setIsPreview}
                        />
                }
            </AdminLayout>
            <ToastContainer />
        </Layout>
    )
}

export default Blog