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
            active: isLinkActive,
            action: "",
            icon: faLink,
            actions: [
                {
                    name: "add",
                    handler: () => {
                        const url = window.prompt('Enter the URL of the link:')
                        if (!url) return
                        insertLink(url)
                    }
                },
                {
                    name: "remove",
                    handler: removeLink
                }
            ]
        },
        {
            active: false,
            action: "",
            icon: faBold,
            actions: [
                {
                    name: "underline",
                    handler: () => {
                        toggleMark("underline")
                    }
                },
                {
                    name: "italic",
                    handler: () => {
                        toggleMark("italic")
                    }
                },
                {
                    name: "bold",
                    handler: () => {
                        toggleMark("bold")
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
                        toggleBlock("heading-two");
                    }
                },
                {
                    active: false,
                    name: "quote",
                    handler: () => {
                        toggleBlock("block-quote");
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
                        toggleBlock("numbered-list");
                    }
                },
                {
                    active: false,
                    name: "bullets",
                    handler: () => {
                        toggleBlock("bulleted-list");
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
                        insertImage("https://picsum.photos/1000/1000?random=1");
                    }
                },
                {
                    active: false,
                    name: "upload",
                    handler: () => {
                        const url = prompt("Enter an Image URL");
                        insertImage(url);
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