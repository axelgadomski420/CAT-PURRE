import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { AuthProvider } from '../context/AuthContext';
import '../i18n';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
