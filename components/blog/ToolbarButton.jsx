import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';

const ToolbarButton = ({
    toolbarMenu,
    iconClick,
    actionClick,
}) => {
    const { t } = useTranslation();
    const {id, actions, icon, active} = toolbarMenu
    const hasMultipleActions = actions.length > 1;
 
    const ToolbarMenu = () => {
        return <button className="toolbar-button-menu">
            {actions.map(action => (
                <span
                    className="menu-action"
                    onClick={() =>{
                        action.handler();
                        actionClick(id, action.name)
                    }}
                    style={{
                        backgroundColor: "none"
                    }}
                >
                    {t(`common:${action.name}`)}
                </span>
            ))}
        </button>
    }

    return (
        <span
            className="toolbar-button"
            style={{
                background: active && "#E6D7F5" || "none"
            }}
        >
            <FontAwesomeIcon
                className="toolbar-icon"
                size="lg"
                icon={icon}
                fixedWidth
                onClick={() => {
                    if(!hasMultipleActions) {
                        toolbarMenu.actions[0].handler();
                        return
                    }

                    iconClick(id)
                }}
            />
            {
                active && hasMultipleActions && <ToolbarMenu /> || null
            }
        </span>
    );
};

export default ToolbarButton;