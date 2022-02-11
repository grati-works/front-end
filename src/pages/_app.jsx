import '../styles/global.scss';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { UIProvider } from '../providers/UIProvider';

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    type: "light",
    theme: {  
      fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
      }
    }
  });

  return (
    <NextUIProvider theme={theme}>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </NextUIProvider>
  )
}

export default MyApp;
