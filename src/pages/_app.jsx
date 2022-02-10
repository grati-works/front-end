import '../styles/global.scss';
import { NextUIProvider } from '@nextui-org/react';
import { UIProvider } from '../providers/UIProvider';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </NextUIProvider>
  )
}

export default MyApp;
