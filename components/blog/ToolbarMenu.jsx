import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToolbarMenu = ({
    toolbarMenus,
    menuId,
    icon,
    iconClick,
    optionClick,
    options,
}) => {
    console.log(options)
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
            {toolbarMenus[menuId].active && <div className="toolbar-button-menu">
                {options.map(option => (
                    <span
                        className="menu-option"
                        style={{
                            background: toolbarMenus[menuId].action === option.name && "#E6D7F5" || "none"
                        }}
                        onClick={() => optionClick(menuId, option.name)}
                    >
                        {option.name}
                    </span>
                ))}
            </div> || null}
        </span>
    );
};

export default ToolbarMenu;