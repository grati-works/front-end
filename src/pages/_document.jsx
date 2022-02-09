import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
          ...initialProps,
          styles: <>{initialProps.styles}</>
        };
      }

    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto:wght@400;500;600;700;800;900&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                    {CssBaseline.flush()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}