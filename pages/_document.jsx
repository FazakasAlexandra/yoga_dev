import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import favicon from "../public/assets/logo.png";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(d, s, id) {
                                var js, fjs = d.getElementsByTagName(s)[0];
                                if (d.getElementById(id)) return;
                                js = d.createElement(s); js.id = id;
                                js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
                                fjs.parentNode.insertBefore(js, fjs);
                                }(document, 'script', 'facebook-jssdk'));`,
                        }}
                    />
                    <link type="image/x-icon" rel="shortcut icon" href={favicon.src} />
                    <meta property="og:title" content="Blog" />
                    <meta property="og:description" content="Super blog" />
                    <meta property="og:image" content="https://images.unsplash.com/photo-1627820751275-e44b937c5d33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" />
                </Head>
                <body>
                    <div id="fb-root"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
MyDocument.getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles)],
    };
};