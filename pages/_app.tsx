import { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { SessionProvider } from 'next-auth/react'

import { store } from '../redux/store/store'

import { ToastContainer } from 'react-toastify'

import '../styles/globals.css'
import '../styles/input.css'
import 'react-toastify/dist/ReactToastify.css'
import { HelmetProvider } from 'react-helmet-async'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={ store }>
        <HelmetProvider>
          <ToastContainer position='bottom-center' limit={1} />
          <div className='flex-1 w-[100%] overscroll-x-hidden dark:bg-[#121212] bg-[#F8F9FC] h-[100vh]'>
            <Component {...pageProps} />
          </div>
        </HelmetProvider>
      </Provider>
    </SessionProvider>
  );
}

export default App;