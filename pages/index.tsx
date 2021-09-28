import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="font-2xl text-main-2 leading-loose">
        <p>NextJS + TailwindCSS Boilerplate</p>
        <p>
          This is a boilerplate to kickstart your next NextJS project with TailwindCSS styling.
          Head over to
          {' '}
          <code>pages/index.tsx</code>
          {' '}
          and start hacking.
        </p>
      </section>
    </Layout>
  );
}
