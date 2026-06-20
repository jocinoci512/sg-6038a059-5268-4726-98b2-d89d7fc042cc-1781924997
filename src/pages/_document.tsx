import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="S384xREiSNxO1dCu-mL0KO1rmFwKF0NPesWNM4tz9oQ" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CipherTrace" />
        <meta name="copyright" content="CipherTrace - A Mastercard Company" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CipherTrace" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}