import SVG from 'react-inlinesvg';

const color = "#4976ED"

const Icon = (props) => <SVG fill={color} src={props.icon} width={20} height={20}/>

export default Icon