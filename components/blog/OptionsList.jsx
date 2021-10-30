
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next';
import { capitalize } from '../../utilities'
import { useState } from 'react'

export const OptionsList = ({
    options,
    setOptions,
    label
}) => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [lastSelected, setLastSelected] = useState(null);
    const { t } = useTranslation();

    const getHoverState = (id) => (lastSelected?.id == id && 'last-selected') ||
        (hoveredCategory === id && 'hovered') ||
        'regular';

    const toggleOption = (id) => {
        return options.map(opt => {
            if (opt.id === id) {
                setLastSelected(opt)
                return { ...opt, isSelected: !opt.isSelected }
            }
            return opt
        })
    }

    return <>
        <div className="options-list">
            <span className="list-label">{label}</span>
            {
                options.map(({ id, name }, idx) => <div
                    key={id}
                    className={options[idx].isSelected ? `selected-option ${getHoverState(id)}` : `neutral-option ${getHoverState(id)}`}
                    onMouseEnter={() => setHoveredCategory(id)}
                    onMouseLeave={() => {
                        setHoveredCategory(null)
                        if (lastSelected) {
                            setLastSelected(null)
                        }
                    }}
                    onClick={() => setOptions(toggleOption(id))}
                >
                    <span>
                        {capitalize(t(`categories:${name}`))}
                    </span>
                    {
                        options[idx].isSelected &&
                        hoveredCategory === id &&
                        lastSelected?.id !== id &&
                        <FontAwesomeIcon
                            color="#F46565"
                            icon={faTimes}
                            size='1x'
                            onClick={close}
                        /> || null
                    }
                    {
                        lastSelected?.id == id &&
                        <FontAwesomeIcon
                            color="#89C804"
                            icon={faCheck}
                            size='1x'
                            onClick={close}
                        /> || null
                    }
                </div>)
            }
        </div>
    </>
};
export default OptionsList;