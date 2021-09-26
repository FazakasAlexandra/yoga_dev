import {
    Text,
} from 'slate'

export const serialize = node => {
    if (Text.isText(node)) {
        let string = node.text
        if (node.bold) {
            return <strong>{string}</strong>
        }
        if(node.code) {
            return <code>{string}</code>
        }
        if (node.italic) {
            return <i>{string}</i>
        }
        return string
    }

    const children = node.children.map(n => serialize(n))

    switch (node.type) {
        case 'link':
            return <a target="_blank" className="link" href={node.url}>{children}</a>
        case 'quote':
            return <blockquote><p>{children}</p></blockquote>
        case 'paragraph':
            return <p>{children}</p>
        case 'heading-two':
            return <h2>{children}</h2>
        case 'numbered-list':
            return <ol>{children}</ol>
        case 'list-item':
            return <li>{children}</li>
        case 'block-quote':
            return <blockquote>{children}</blockquote>
        case 'image':
            return <img src={node.url} alt={node.alt} style={{ width: "100%" }} />
        default:
            return children
    }
}

export default serialize;