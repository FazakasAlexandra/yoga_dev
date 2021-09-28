import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToolbarButton = ({
    toolbarMenus,
    menuId,
    icon,
    iconClick,
    actionClick,
    actions,
}) => {

    const ToolbarMenu = () => {
        return <div className="toolbar-button-menu">
            {actions.map(action => (
                <span
                    className="menu-action"
                    onClick={() =>{
                        actionClick(menuId, action.name)
                        action.handler();
                    }}
                    style={{
                        backgroundColor: toolbarMenus[menuId].action === action.name && "#E6D7F5" || "none"
                    }}
                >
                    {action.name}
                </span>
            ))}
        </div>
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
                toolbarMenus[menuId].active && <ToolbarMenu />
            }
        </span>
    );
};

export default ToolbarButton;