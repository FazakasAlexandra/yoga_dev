import { useTranslation } from 'next-i18next';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FacebookShare = ({ postId }) => {
    const { t } = useTranslation();

    return (
        <div
            class="post-social bottom"
            data-href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
            data-layout="button_count"
            data-size="small"
        >
            <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://${process.env.NEXT_PUBLIC_DOMAIN}/posts/${postId}`}
                class="fb-xfbml-parse-ignore"
            >
                <FontAwesomeIcon icon={faShare} size="lg" className="social-icon" />
                <strong>{t('blog:share on facebook')}</strong>
            </a>
        </div>
    );
};
export default FacebookShare;