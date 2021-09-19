import '../public/styles/style.css'
import { Provider } from 'next-auth/client'
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { StylesProvider } from '@material-ui/core/styles';

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider injectFirst>
      <Provider
        options={{
          clientMaxAge: 0,
          keepAlive: 0
        }}
        session={pageProps.session} >
        <Component {...pageProps} />
      </Provider>
    </StylesProvider>
  )
}

export default MyApp
