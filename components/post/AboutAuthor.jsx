import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const AboutAuthor = ({ isBiography }) => {
    const { t } = useTranslation();
    const AUTHOR_NAME = "Fabiola Muresan"
    const links = {
        facebook : "https://www.facebook.com/FABIOLAFHARAOANA/",
        instagram : ""
    }

    return (<div className="post-author-container">
        {
            isBiography && <div className="post-author-data">
                <img src="/assets/author.jpg" />
                <div className="post-author-information">
                    <strong>{AUTHOR_NAME}</strong><span> {t('blog:about author')}</span>
                </div>
            </div> || <>
                <div className="post-author-data">
                    <img src="/assets/author.jpg" />
                    <div className="post-author-information">
                        <strong>{AUTHOR_NAME}</strong>
                        <p>{t('blog:coach')} &#8226; {t('blog:nutrition specialist')}</p>
                    </div>
                </div>
                <div className="post-social">
                    <a href={links.facebook} target="_blank">
                        <FontAwesomeIcon icon={faFacebookF} size="lg" className="social-icon" />
                    </a>
                    <a href={links.instagram} target="_blank">
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="social-icon" />
                    </a>
                </div>
            </>
        }
    </div>

    );
};
export default AboutAuthor;