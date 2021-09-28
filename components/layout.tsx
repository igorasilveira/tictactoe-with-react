import Head from 'next/head';
import { ReactNode } from 'react';

const name = 'NextJS + TailwindCSS Boilerplate';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="max-w-4xl p-2 mx-auto my-6">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        <>
          <img
            src="/images/profile.jpg"
            className="rounded-full w-56 h-5w-56"
            alt={name}
          />
          <h1 className="text-4xl font-bold my-6 text-main-default">{name}</h1>
        </>
      </header>
      <main>{children}</main>
    </div>
  );
}
