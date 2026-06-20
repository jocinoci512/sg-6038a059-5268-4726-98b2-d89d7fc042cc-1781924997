import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cipherstracer" />
        <meta name="copyright" content="Cipherstracer" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cipherstracer" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Cipherstracer" />
        <meta name="twitter:creator" content="@Cipherstracer" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cipherstracer",
              "url": "https://cipherstracer.com",
              "logo": "https://cipherstracer.com/logo.png",
              "description": "Professional blockchain investigation and cryptocurrency recovery services. Expert wallet tracing, fraud investigation, and digital asset forensics.",
              "email": "support@cipherstracer.com",
              "telephone": "+1-940-560-9662",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://twitter.com/Cipherstracer",
                "https://www.linkedin.com/company/cipherstracer"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-940-560-9662",
                "contactType": "customer service",
                "email": "support@cipherstracer.com",
                "availableLanguage": ["English"],
                "areaServed": "Worldwide"
              }
            })
          }}
        />
        
        {/* Structured Data - Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Cipherstracer Blockchain Investigation Services",
              "url": "https://cipherstracer.com",
              "description": "Expert blockchain forensics, cryptocurrency fraud investigation, and digital asset recovery services trusted by law enforcement and victims worldwide.",
              "priceRange": "$$$$",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "0",
                  "longitude": "0"
                },
                "geoRadius": "20000000"
              },
              "serviceType": [
                "Blockchain Investigation",
                "Cryptocurrency Recovery",
                "Digital Asset Forensics",
                "Fraud Investigation",
                "Asset Tracing"
              ]
            })
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Performance: DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="RSvRSqLZoY9Z7WgAMBx-7DKpsxl44-Dk8cizHYYLDnU" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}