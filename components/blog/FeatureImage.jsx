import SVG from 'react-inlinesvg';

export const FeatureImage = ({ showForm, setImage, featureImage }) => {
    return (
        !featureImage ?
            <div
                style={{
                    marginTop: showForm ? "-294px" : "-10px",
                    cursor: setImage ? "cursor" : "default"
                }}
                className="svg-container"
                onClick={setImage}
            >
                {setImage && <h1>Upload picture</h1>}
                <SVG src="/assets/blog_placeholder.svg" />
            </div> :
            <img
                className="feature-image"
                alt="feature image"
                src={featureImage}
                onClick={setImage}
            />
    )
}