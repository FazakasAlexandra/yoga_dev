import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { BaseButton } from '../editorButtons/BaseButton'

export const MenuButton = ({ activeMenu, setMenuActive, toggleForm }) => {
    return (
        !activeMenu ? <BaseButton
            class="editor-text-button"
            active={activeMenu}
            onClick={() => {
                setMenuActive(true);
                toggleForm();
            }}
        >
            Menu
        </BaseButton> : <button
            style={{
                borderRadius: "5px",
                padding: "15px 1.9rem",
            }}
            onClick={() => {
                setMenuActive(false);
                toggleForm();
            }}
        >
            <FontAwesomeIcon
                icon={faTimes}
                className='info-icon'
                height="100%"
                color="#8D8D8D"
                size="lg"
            />
        </button>

    );
};

export default MenuButton;
