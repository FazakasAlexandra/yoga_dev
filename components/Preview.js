import { serialize } from "../utils/serialize";
import { BaseButton } from "./editorButtons/BaseButton";
import Icon from './editorButtons/Icon'

export const Preview = ({
    nodes,
    isPreview,
    setPreview,
    featureImage,
    title,
    description
}) => {
    return (
        <>
            {isPreview ?
                <>
                    <BaseButton
                        style={{
                            border: "none",
                            color: "#4976ED",
                            background: 'none',
                            paddingBottom: '5px',
                            marginBottom: '50px',
                            borderBottom: 'solid',
                            fontSize: '18px',
                            alignSelf: 'flex-end',
                            borderWidth: 'revert',
                            cursor: "pointer"
                        }}
                        onClick={() => setPreview(false)}
                    >
                        Back
                    </BaseButton>
                    <div className="preview-header">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <img src={featureImage} />
                    </div>
                    <div className="preview">
                        {nodes.map(value => serialize(value))}
                    </div></> : null}
        </>
    );
};
export default Preview;