import React from 'react'

import Head from 'next/head'

import { Helmet } from 'react-helmet'

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  desc: string;
}

const Layout = ({ children, title, desc }: LayoutProps) => {
  return (
    <div>
      <Head>
        <Helmet>
          <title>{ title }</title>
          <meta name="description" content={desc} />
        </Helmet>
      </Head>
      
      <>
        { children }
      </>
    </div>
  )
}

export default Layout