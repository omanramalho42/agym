import Head from 'next/head';
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  desc: string;
}

const Layout = ({ children, title, desc }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={desc} />
      </Head>

      <>
        { children }
      </>
    </div>
  )
}

export default Layout