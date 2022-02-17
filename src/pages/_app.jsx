import { NextUIProvider, createTheme } from '@nextui-org/react';
import { UIProvider } from '../providers/UIProvider';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import '../styles/global.scss';
import '../styles/attachment.css'

function MyApp({ Component, pageProps }) {
  const defaultColors = {
    primaryLight: '#7b87f0',
    primary: '#6874E8',
    primaryDark: '#5562db',

    success: '#4CD62B',
    error: '#E83F5B'
  }

  const lightTheme = createTheme({
    type: 'light',
    theme: {
      fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      },
      colors: {
        ...defaultColors,

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
      shadows: {
        xs: '-4px 0 4px rgb(0 0 0 / 5%);',
        sm: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
        md: '0 8px 30px rgba(0, 0, 0, 0.15)',
        lg: '0 30px 60px rgba(0, 0, 0, 0.15)',
        xl: '0 40px 80px rgba(0, 0, 0, 0.25)'
      }
    },
  });

  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      },
      colors: {
        ...defaultColors,

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
      shadows: {
        xs: '-4px 0 15px rgb(0 0 0 / 50%)',
        sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
        md: '0 8px 30px rgba(20, 20, 20, 0.15)',
        lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
        xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
      }
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
