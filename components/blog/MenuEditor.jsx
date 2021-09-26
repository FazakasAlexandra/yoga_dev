import React, { useState } from 'react'
import { MenuButton } from './index'
import { BaseButton } from './editorButtons/BaseButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons'

export const MenuEditor = React.forwardRef(
    ({ isPreview, setPreview, toggleForm, showForm, className, ...props }, ref) => {
        const [activeMenu, setMenuActive] = useState(false || showForm);

        return <div
            className="menu-editor"
            {...props}
            ref={ref}
        >
            <div className="editor-buttons-container">
                <MenuButton
                    activeMenu={activeMenu}
                    setMenuActive={setMenuActive}
                    toggleForm={toggleForm}
                />
                <BaseButton
                    class="editor-text-button"
                    onClick={() => setPreview(true)}
                >
                    Preview
                </BaseButton>
                <BaseButton
                    class="editor-text-button"
                >
                    Publish
                </BaseButton>
            </div>
            <div className="editor-toolbar">
                Menu Content
            </div>
            <FontAwesomeIcon
                className="wand"
                icon={faMagic}
                size="lg"
                color="#4976ED"
            />
        </div>
    }
)

export default MenuEditor;