import Image from '../Image'

export const Element = (props) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'link':
            return <a className="link" {...attributes} href={element.url}>{children}</a>
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'image':
            return <Image {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

export default Element;