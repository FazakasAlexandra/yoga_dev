import { useState } from 'react'
import {
    faLink,
    faImage,
    faParagraph,
    faBars,
    faBold,
} from '@fortawesome/free-solid-svg-icons'
import { useLink, useMark, useBlock, useImage } from './';

const useToolbarMenus = () => {
    const { isLinkActive, insertLink, removeLink } = useLink()
    const { toggleMark } = useMark();
    const { toggleBlock } = useBlock();
    const { insertImage } = useImage();

    const [toolbarMenus, setToolbarMenus] = useState([
        {
            id: 0,
            active: false,
            icon: faLink,
            actions: [
                {
                    name: "add",
                    active: false,
                    handler: () => {
                        const url = window.prompt('Enter the URL of the link:')
                        if (!url) return
                        insertLink(url)
                    }
                },
                {
                    name: "remove",
                    active: false,
                    handler: removeLink
                }
            ]
        },
        {
            id: 1,
            active: false,
            icon: faBold,
            actions: [
                {
                    name: "underline",
                    active: false,
                    handler: () => {
                        toggleMark("underline")
                    }
                },
                {
                    name: "italic",
                    active: false,
                    handler: () => {
                        toggleMark("italic")
                    }
                },
                {
                    name: "bold",
                    active: false,
                    handler: () => {
                        toggleMark("bold")
                    }
                }
            ]
        },
        {
            id: 2,
            active: false,
            icon: faParagraph,
            actions: [
                {
                    name: "larget text",
                    active: false,
                    handler: () => {
                        toggleBlock("heading-two");
                    }
                },
                {
                    name: "quote",
                    active: false,
                    handler: () => {
                        toggleBlock("block-quote");
                    }
                }
            ]
        },
        {
            id: 3,
            active: false,
            icon: faBars,
            actions: [
                {
                    name: "numbers",
                    active: false,
                    handler: () => {
                        toggleBlock("numbered-list");
                    }
                },
                {
                    name: "bullets",
                    active: false,
                    handler: () => {
                        toggleBlock("bulleted-list");
                    }
                },
            ]
        },
        {
            id: 4,
            active: false,
            icon: faImage,
            actions: [
                {
                    name: "random",
                    active: false,
                    handler: () => {
                        insertImage("https://picsum.photos/1000/1000?random=1");
                    }
                },
                {
                    name: "upload",
                    active: false,
                    handler: () => {
                        const url = prompt("Enter an Image URL");
                        insertImage(url);
                    }
                }
            ]
        }
    ]);

    const setToolbarMenuAction = (target, triggeredAction) => {
        console.log(target, triggeredAction)

        setToolbarMenus(toolbarMenus.map((menu, idx) => {
            if (idx === target) {
                console.log(menu.actions)

                const actions = menu.actions.map(action => {
                    if (action.name === triggeredAction) {
                        action.active = !action.active
                    }
                    return action

                })
                menu.actions = actions;
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