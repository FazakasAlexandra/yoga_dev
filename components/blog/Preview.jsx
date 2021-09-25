import { serialize } from "./utils/serialize";
import { BaseButton } from "./editorButtons/BaseButton";
import { FeatureImage } from './FeatureImage'

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
                        <div className="preview-header-txt">
                            <h1>{title || "No title"}</h1>
                            <p>{description || "No description"}</p>
                        </div>
                        <FeatureImage featureImage={featureImage}/>
                    </div>
                    <div className="preview">
                        {nodes.map(value => serialize(value))}
                    </div></> : null}
        </>
    );
};
export default Preview;