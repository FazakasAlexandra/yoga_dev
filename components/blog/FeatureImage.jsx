import SVG from 'react-inlinesvg';

export const FeatureImage = ({ showForm, setImage, featureImage }) => {
    return (
        !featureImage ?
            <div
                style={{
                    marginTop: showForm ? "-294px" : "-10px",
                    cursor: setImage ? "cursor" : "default",
                    background: "#E6D7F5",
                    height: "700px",
                    width: "100%"
                }}
                className="svg-container"
                onClick={setImage}
            >
                {setImage && <h1>Upload picture</h1>}
            </div> :
            <img
                style={{
                    marginTop: showForm ? "-294px" : "-10px",
                    cursor: setImage ? "cursor" : "default"
                }}
                className="feature-image"
                alt="feature image"
                src={featureImage}
                onClick={setImage}
            />
    )
}
export default FeatureImage;