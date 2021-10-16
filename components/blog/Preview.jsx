import { serialize } from "./utils/serialize";
import { BaseButton } from "./editorButtons/BaseButton";
import { FeatureImage } from './FeatureImage'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next';

export const Preview = ({
    nodes,
    isPreview,
    setPreview,
    featureImage,
    title,
    id,
    description
}) => {
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
                        <div className="post-author-container">
                            <div className="post-author-data">
                                <img src="/assets/author.jpg" />
                                <div className="post-author-information">
                                    <strong>Fabiola Muresan</strong>
                                    <p>{t('blog:coach')} &#8226; {t('blog:nutrition specialist')}</p>
                                </div>
                            </div>
                            <div className="post-social">
                                <a href="https://www.facebook.com/FABIOLAFHARAOANA/" target="_blank">
                                    <FontAwesomeIcon icon={faFacebookF} size="lg" className="social-icon" />
                                </a>
                                <a href="#" target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} size="lg" className="social-icon" />
                                </a>
                            </div>
                        </div>
                        {nodes.map(value => serialize(value))}
                        <div
                            class="post-social bottom"
                            data-href="https://yoga-fazakasalexandra.vercel.app/"
                            data-layout="button_count" data-size="small">
                            <a
                                target="_blank"
                                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${process.env.NEXT_PUBLIC_DOMAIN}/posts/${id || null}`}
                                class="fb-xfbml-parse-ignore"
                            >
                                <FontAwesomeIcon icon={faShare} size="lg" className="social-icon" />
                                <strong>{t('blog:share on facebook')}</strong>
                            </a>
                        </div>
                        <div className="post-categories">
                            <span>{t('common:categories')}:</span> <a href="">fitness</a><a href="">diet</a><a href="">fasting</a>
                        </div>
                        <hr className="post-end-line" />
                        <div className="post-author-container">
                            <div className="post-author-data">
                                <img src="/assets/author.jpg" />
                                <div className="post-author-information">
                                    <strong>Fabiola Muresan</strong><span> {t('blog:about author')}</span>
                                </div>
                            </div>
                        </div>
                    </div></> : null}
        </>
    );
};
export default Preview;