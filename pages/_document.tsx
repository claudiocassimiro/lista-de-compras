import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-512x512.png" />
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="Meu Carrinho é um aplicativo de ofertas em estabelecimentos parceiros e também serve como lista de compras. Economize comprando, compre economizando e acompanhe o valor total do seu carrinho"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
