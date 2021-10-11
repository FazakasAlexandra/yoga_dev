import { serialize } from "./utils/serialize";
import { BaseButton } from "./editorButtons/BaseButton";
import { FeatureImage } from './FeatureImage'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Preview = ({
    nodes,
    isPreview,
    setPreview,
    featureImage,
    title,
    id,
    description
}) => {
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
                            Back
                        </BaseButton> || null
                    }
                    <div className="preview-header">
                        <div className="preview-header-txt">
                            <h1>{title || "No title"}</h1>
                            <p>{description || "No description"}</p>
                        </div>
                        <FeatureImage featureImage={featureImage} />
                    </div>
                    <div className="preview">
                        <hr className="post-start-line" />
                        <div className="post-author-container">
                            <div className="post-author-data">
                                <img src="https://scontent.fotp7-2.fna.fbcdn.net/v/t1.6435-9/95666084_2892816780834850_1221673073338482688_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=unsW1fcIXMAAX-PjZ6-&tn=xslcSqs3Bf_v3Iy_&_nc_ht=scontent.fotp7-2.fna&oh=64aaf6f3d4baba1f2955e367e47ef38a&oe=61877F51" />
                                <div className="post-author-information">
                                    <strong>Fabiola Muresan</strong>
                                    <p>Coach &#8226; Nutrition specialist</p>
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
                                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${process.env.NEXT_PUBLIC_DOMAIN}/events/${id || null}`}
                                class="fb-xfbml-parse-ignore"
                            >
                                <FontAwesomeIcon icon={faShare} size="lg" className="social-icon" />
                                <strong>Share on facebook</strong>
                            </a>
                        </div>
                        <div className="post-categories">
                            <span>Categories:</span> <a href="">fitness</a><a href="">diet</a><a href="">fasting</a>
                        </div>
                        <hr className="post-end-line" />
                        <div className="post-author-container">
                            <div className="post-author-data">
                                <img src="https://scontent.fotp7-2.fna.fbcdn.net/v/t1.6435-9/95666084_2892816780834850_1221673073338482688_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=unsW1fcIXMAAX-PjZ6-&tn=xslcSqs3Bf_v3Iy_&_nc_ht=scontent.fotp7-2.fna&oh=64aaf6f3d4baba1f2955e367e47ef38a&oe=61877F51" />
                                <div className="post-author-information">
                                    <strong>Fabiola Muresan</strong><span> is an author, coach and antreprenour. Owning her own fitness studio in Bistrita, she writes form her over 10 years experience of helping people reach their body goals.</span>
                                </div>
                            </div>
                        </div>
                    </div></> : null}
        </>
    );
};
export default Preview;