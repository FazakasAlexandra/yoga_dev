import { useState } from 'react'
import {
    faLink,
    faImage,
    faParagraph,
    faBars,
    faBold,
} from '@fortawesome/free-solid-svg-icons'

export const useToolbarMenus = () => {
    const [toolbarMenus, setToolbarMenus] = useState([
        {
            active: false,
            action: "add",
            icon: faLink,
            actions: [
                {
                    name: "add",
                    handler: () => {
                        console.log('hello')
                    }
                },
                {
                    name: "remove",
                    handler: () => {
                        console.log('hello')
                    }
                }
            ]
        },
        {
            active: false,
            action: "bold",
            icon: faBold,
            actions: [
                {
                    name: "underline",
                    handler: () => {
                        console.log('underline')
                    }
                },
                {
                    name: "italic",
                    handler: () => {
                        console.log('italic')
                    }
                },
                {
                    name: "bold",
                    handler: () => {
                        console.log('bold')
                    }
                }
            ]
        },
        {
            active: false,
            action: "large",
            icon: faParagraph,
            actions: [
                {
                    active: false,
                    name: "larget text",
                    handler: () => {
                        console.log('large text')
                    }
                },
                {
                    active: false,
                    name: "medium text",
                    handler: () => {
                        console.log('medium text')
                    }
                },
                {
                    active: false,
                    name: "quote",
                    handler: () => {
                        console.log('quote list')
                    }
                }
            ]
        },
        {
            active: false,
            action: "numbers",
            icon: faBars,
            actions: [
                {
                    active: false,
                    name: "numbers",
                    handler: () => {
                        console.log('numbers list')
                    }
                },
                {
                    active: false,
                    name: "bullets",
                    handler: () => {
                        console.log('bullets list')
                    }
                },
            ]
        },
        {
            active: false,
            action: "random",
            icon: faImage,
            actions: [
                {
                    active: false,
                    name: "random",
                    handler: () => {
                        console.log('random image')
                    }
                },
                {
                    active: false,
                    name: "upload",
                    handler: () => {
                        console.log('upload image')
                    }
                }
            ]
        }
    ]);

    const setToolbarMenuAction = (target, action) => {
        setToolbarMenus(toolbarMenus.map((menu, idx) => {
            if (idx === target) {
                menu.action = action
                return menu
            }
            return menu
        }));
    }

    const toggleToolbarMenus = (target) => {
        setToolbarMenus(toolbarMenus.map((menu, idx) => {
            if (idx === target) {
                menu.active = !menu.active;
                return menu;
            }
            menu.active = false;
            return menu;
        }));
    }

    return {
        toggleToolbarMenus,
        setToolbarMenuAction,
        toolbarMenus
    }
}


export default useToolbarMenus;