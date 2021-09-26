export const FeatureImage = ({ showForm, setImage, featureImage }) => {
    return (
        !featureImage ?
            <div
                style={{
                    marginTop: showForm ? "-294px" : "-10px",
                    cursor: setImage ? "cursor" : "default",
                }}
                className="feature-image-placeholder"
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