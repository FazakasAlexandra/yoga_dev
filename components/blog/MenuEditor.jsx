import React, { useEffect, useState, ReactFragment } from 'react'
import { BaseButton } from './editorButtons/BaseButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'beautiful-react-hooks';
import { Toolbar } from './'
import { useTranslation } from 'next-i18next';

export const MenuEditor = React.forwardRef(
    ({
        showToolbar,
        setShowToolbar,
        isPreview,
        setPreview,
        toggleForm,
        showForm,
        className,
        publishPost,
        ...props
    }, ref) => {
        const isMobile = useMediaQuery('(max-width: 820px)');
        const { t } = useTranslation(); 

        return <div
            className="menu-editor"
            {...props}
            ref={ref}
        >
            <div className="editor-buttons-container">
                {
                    !showForm || isMobile ? <BaseButton
                        class="editor-text-button"
                        onClick={toggleForm}
                    >
                        {t("common:menu")}
                    </BaseButton> : <button
                        className="menu-close"
                        onClick={toggleForm}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            className='info-icon'
                            height="100%"
                            color="#8D8D8D"
                            size="lg"
                        />
                    </button>
                }
                <BaseButton
                    class="editor-text-button"
                    onClick={() => setPreview(true)}
                >
                    {t("common:preview")}
                </BaseButton>
                <BaseButton
                    onClick={() => {
                        console.log('clicked')
                        publishPost()
                    }}
                    class="editor-text-button"
                >
                    {t("common:publish")}
                </BaseButton>
            </div>
            {
                !isMobile && <Toolbar class="toolbar"></Toolbar> || null
            }
            {
                isMobile && <span
                    className="wand"
                    onClick={() => setShowToolbar(!showToolbar)}
                    style={{ background: showToolbar && "#E6D7F5" || "none" }}
                >
                    <FontAwesomeIcon
                        icon={faMagic}
                        size="lg"
                        color="#4976ED"
                    />
                </span> || null
            }
        </div>
    }
)

export default MenuEditor;