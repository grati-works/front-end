import { NextUIProvider, createTheme } from '@nextui-org/react';
import { UIProvider } from '../providers/UIProvider';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  const lightTheme = createTheme({
    type: 'light',
    theme: {
      fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      },
      colors: {
        primaryLight: '#7b87f0',
        primary: '#6874E8',
        primaryDark: '#5562db',

        background: '#F6F7F8',
        backgroundHighlight: '#FFF',

        tone1: '$gray100',
        tone2: '$gray200',
        tone3: '$gray300',
        tone4: '$gray400',
        tone5: '$gray500',
        tone6: '$gray600',
        tone7: '$gray700',
        tone8: '$gray800',
        tone9: '$gray900',
      },
    },
  });

  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      },
      colors: {
        primaryLight: '#7b87f0',
        primary: '#6874E8',
        primaryDark: '#5562db',

        background: '#1a1a1a',
        backgroundHighlight: '#252525',

        text1: '#e6e6e6',
        text5: '',

        tone1: '$gray900',
        tone2: '$gray800',
        tone3: '$gray700',
        tone4: '$gray600',
        tone5: '$gray500',
        tone6: '$gray400',
        tone7: '$gray300',
        tone8: '$gray200',
        tone9: '$gray100',
      },
    },
  });

  return (
    <NextThemesProvider
      defaultTheme='light'
      disableTransitionOnChange
      storageKey='theme'
      attribute='class'
      value={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      <NextUIProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
