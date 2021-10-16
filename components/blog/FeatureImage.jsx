import { useTranslation } from 'next-i18next';

export const FeatureImage = ({ showForm, setImage, featureImage }) => {
    const { t } = useTranslation(); 

    return (
        setImage ?
            <div
                style={{
                    marginTop: showForm ? "-294px" : "-10px",
                    cursor: setImage ? "cursor" : "default",
                }}
                className="feature-image-placeholder"
                onClick={setImage}
            >
                <h1>{t("common:upload picture")}</h1>
            </div> :
            <img
                style={{
                    marginTop: showForm ? "-294px" : "-10px",
                    cursor: setImage ? "cursor" : "default"
                }}
                className="feature-image"
                alt="feature image"
                src={featureImage || "/assets/fallback_image_large.jpg"}
                onClick={setImage}
            />
    )
}
export default FeatureImage;