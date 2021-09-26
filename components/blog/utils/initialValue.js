export const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<div> Hello {{ variable }}</div>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text: "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text: ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: "Once I was a wise quote. Now I don't know anymore !" }],
    },
    {
        type: 'heading-two',
        children: [{ text: 'Try it out for yourself!' }],
    },
    {
        type: 'image',
        children: [{ text: '' }],
        alt: 'random-image',
        url: 'https://picsum.photos/1000/1000?random=1'
    }
]
export default initialValue;