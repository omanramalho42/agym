import { useContext, useEffect, useState } from 'react'

import { GetServerSideProps, GetStaticProps } from 'next'

import Link from 'next/link'
import Image from 'next/image'

import { signOut, useSession } from 'next-auth/react'

import { Header, Layout, Main } from '../components'
import { getCategories } from '../lib/categories'

import { useDispatch, useSelector } from 'react-redux'

import { getAllVideos } from '../lib/videos'

import { setCategories, useCategories } from '../redux/slicer/CategoriesSlicer'

import { setVideos, useVideos } from '../redux/slicer/VideosSlicer'

import { useRouter } from 'next/router'

// export const getStaticProps: GetStaticProps = async () => {
//   const categories = await getCategories();
//   const videos = await getAllVideos();
  
//   return {
//     props: {
//       categories,
//       videos
//     },
//     revalidate: 5
//   };
// }

//A CADA REQ DO CLIENT 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getCategories();
  const videos = await getAllVideos();
 
  return {
    props: {
      categories,
      videos
    },
    // revalidate: 5
  };
}

export default function Home(props, context) {
  const { categories, videos } = props || context;
  const dispatch = useDispatch();

  useEffect(() => {
    if(categories) {
      dispatch(
        setCategories(categories)
      );
    } 
    if (videos) {
      dispatch(
        setVideos(videos)
      );
    }
  },[props]);

  const router = useRouter();

  const [useShowToggleMenu, setUseShowToggleMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data: session } = useSession();

  const { redirect }:any = router.query;

  useEffect(() => {
    if(!session?.user) {
      router.push(redirect || '/login')
    }
  },[router,session,redirect]);

  return (
    <Layout
      title='Página inicial'
      desc='Página inicial Homepage'
    >
      <div>
      {session && (
        <div className='flex-1 p-2 bg-[#5524d9]'>
          <p className='flex flex-wrap justify-center text-xl font-semibold text-white text-center p-2 space-x-2'>
            Olá { session.user.name }, a sua rotina de exercícios está esperando por ti!
          </p>
        </div>
      )}

      <main className={`dark:bg-[#121212] bg-[#F8F9FC] `}>
        {/* HEADER */}
        <div>
          <Header
            setSearch={setSearch}
            setShow={setUseShowToggleMenu} 
          />
        </div>
        {/* INFO */}
        <Main 
          search={search}
          setShow={
            () => setUseShowToggleMenu((value) => !value)
          }
          show={useShowToggleMenu} 
        />
      </main>

    </div>

    </Layout>
  )
}
