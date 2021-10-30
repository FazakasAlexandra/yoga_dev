import { serialize } from "./utils/serialize";
import { BaseButton } from "./editorButtons/BaseButton";
import { FeatureImage } from './FeatureImage'
import { useTranslation } from 'next-i18next';
import { AboutAuthor, FacebookShare } from './';
import Link from 'next/link';

export const Preview = ({
    nodes,
    isPreview,
    setPreview,
    featureImage,
    title,
    id,
    description,
    categories
}) => {
    console.log(categories)
    const { t } = useTranslation();
    return (
        <>
            {isPreview ?
                <>
                    {
                        setPreview && <BaseButton
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
                                cursor: "pointer",
                                margin: "2rem 0rem"
                            }}
                            onClick={() => setPreview(false)}
                        >
                            {t('common:back')}
                        </BaseButton> || null
                    }
                    <div className="preview-header">
                        <div className="preview-header-txt">
                            <h1>{title || t("blog:No title")}</h1>
                            <p>{description || t("blog:No description")}</p>
                        </div>
                        <FeatureImage featureImage={featureImage} />
                    </div>
                    <div className="preview">
                        <hr className="post-start-line" />
                        <AboutAuthor />
                        {nodes.map(value => serialize(value))}
                        <FacebookShare postId={id} />
                        <div className="post-categories">
                            <span>{t('common:categories')}:</span>
                            {categories.map((category) => {
                                const name = category.category_name && category.category_name || category.name;
                                return <Link href={`/blog/${name}`}>
                                    <a>{name}</a>
                                </Link>
                            })}
                        </div>
                        <hr className="post-end-line" />
                        <AboutAuthor isBiography={true} />
                    </div></> : null}
        </>
    );
};
export default Preview;