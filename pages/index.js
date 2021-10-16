import Layout from '../components/Layout'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HomeSection from '../components/HomeSection';
import Map from '../components/Map';
import sectionsContent from '../homePageContent.json';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({locale}){
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home']))
    }
  }
}

export default function Home() {
  const { t } = useTranslation();

  const getHomePageSections = () => {
    return sectionsContent.map(({ id, src, title, content }, idx) => {
      return <HomeSection
        key={id}
        imgPosition={idx % 2 === 0 && idx != 0 ? 'left' : 'right'}
        title={title}
        src={src}
        content={content}
      />
    })
  }

  return (
    <Layout activeTab={"home"}>
      <h2>{t('home:welcome_msg')}</h2>
      <div className="home-wraper">
        {getHomePageSections()}
        <div className="social-contact-container">
          <h1>Keep in touch </h1>
          <div className="phone-container">
            <FontAwesomeIcon icon={faPhone} size="2x" className="social-icon" />
            <span className="phone">0740858539</span>
          </div>
          <div className="icons-wraper">
            <a href="https://www.facebook.com/Indian-School-of-Yoga-Therapy-187045138576522" target="_blank"><FontAwesomeIcon style={{ marginRight: "1rem" }} icon={faFacebook} size="3x" className="social-icon" /></a>
            <a href="#" target="_blank"><FontAwesomeIcon icon={faInstagram} size="3x" className="social-icon" /></a>
          </div>
        </div>
      </div>
      <div className="home-wraper visit">
        <h1>Visit our studio</h1>
        <strong>Cluj-Napoca</strong>
        <p>Bulevardul Titulescu, no. 1</p>
      </div>
      <Map />
    </Layout>
  )
}
