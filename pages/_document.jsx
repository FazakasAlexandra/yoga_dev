import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import favicon from "../public/favicon.ico";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v12.0&appId=381128173719978&autoLogAppEvents=1" nonce="izOwTzly"></script>
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

