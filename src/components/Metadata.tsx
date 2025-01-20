import React from 'react';
import { Helmet } from 'react-helmet-async';

type MetadataProps = {
  children: React.ReactNode;
};

const Metadata: React.FC<MetadataProps> = ({ children }) => {
  return (
    <Helmet>
      <meta
        name="description"
        content="Portfolio website of I Gusti Ngurah A Pradnya Kuswara. A software engineer and web developer"
      />
      <meta
        name="google-site-verification"
        content="G6rLax3jFoLMfH1U-PzbNp2iuAzh881Mf6QwBhyGJnk"
      />

      <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
      <link
        rel="apple-touch-icon"
        href="/assets/images/apple-icon-180x180.png"
      />
      <meta
        name="keywords"
        content="Pradnya Kuswara, Pradnya, Kuswara, Gusti Ngurah A Pradnya Kuswara, Gusti Ngurah A Pradnya, Gusti Ngurah A, Gusti Ngurah, Gusti, Ngurah, A Pradnya Kuswara, A Pradnya, A, Pradnya Kuswara, Pradnya, Kuswara"
      />
      <meta name="author" content="Pradnya Kuswara" />
      <link rel="author" href="https://pradnyakuswara.web.id" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@pradnyakuswara" />
      <meta name="twitter:creator" content="@pradnyakuswara" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="https://pradnyakuswara.web.id" />
      <meta property="og:title" content="Pradnya Kuswara" />
      <meta
        property="og:description"
        content="Portfolio website of I Gusti Ngurah A Pradnya Kuswara"
      />
      <meta
        property="og:image"
        content="https://pradnyakuswara.web.id/assets/images/logo.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Pradnya Kuswara" />
      {children}
    </Helmet>
  );
};

export default Metadata;
