import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';

const ToolbarButton = ({
    toolbarMenus,
    menuId,
    icon,
    iconClick,
    actionClick,
    actions,
}) => {
    const { t } = useTranslation(); 

    const ToolbarMenu = () => {
        return <button className="toolbar-button-menu">
            {actions.map(action => (
                <span
                    className="menu-action"
                    onClick={() =>{
                        action.handler();
                        actionClick(menuId, action.name)
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
                background: toolbarMenus[menuId].active && "#E6D7F5" || "none"
            }}
        >
            <FontAwesomeIcon
                className="toolbar-icon"
                size="lg"
                icon={icon}
                fixedWidth
                onClick={() => iconClick(menuId)}
            />
            {
                toolbarMenus[menuId].active && <ToolbarMenu /> || null
            }
        </span>
    );
};

export default ToolbarButton;