import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';

interface ExtendedDocumentInitialProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >[];
}

export default class MyDocument extends Document<ExtendedDocumentInitialProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<ExtendedDocumentInitialProps> {
    const initialProps = await documentGetInitialProps(ctx);
    const emotionStyleTags: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >[] =
      initialProps.head?.filter(
        (tag): tag is React.ReactElement =>
          tag !== null &&
          tag !== undefined &&
          Boolean(tag.key?.includes('emotion'))
      ) ?? [];
    return { ...initialProps, emotionStyleTags };
  }

  render() {
    const { emotionStyleTags, ...props } = this.props;
    return (
      <Html lang="en">
        <Head>
          <DocumentHeadTags emotionStyleTags={emotionStyleTags} {...props} />
          ...
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
