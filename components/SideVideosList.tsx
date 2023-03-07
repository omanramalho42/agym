import React, { useEffect, useState, FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { InformationCircleOutline } from 'heroicons-react'

import Skeleton from 'react-loading-skeleton'

const SideVideosList:FC<any> = ({ video }) => {
  const [useLoading, setUseLaoding] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setUseLaoding(false);
    }, 4000);
  },[]);
  
  if(useLoading) {
    return (
      <div className="flex row w-full">
        <Skeleton width={200} height={150} className="rounded-full" />
        <div className="flex-col my-2 mx-2">
          <Skeleton count={3} width={200} height={15} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Link 
        href={`/video/${video.id}`}
        className="flex space-y-2 space-x-2 row h-[160px] hover:bg-gray-100 dark:hover:bg-[#202020] transition-all cursor-pointer"
      >
        <Image
          src={{
            src: video.thumb,
            width: 200,
            height: 200
          }} 
          alt="img" 
          width={250} 
          height={50} 
          className="rounded-lg mr-2"
        />
        <div className='flex-col'>
          <h1 className='md:text-lg lg:text-sm text-sm font-medium text-[#121212] dark:text-[#F9F9F9] mb-1'>
            { video.title }
          </h1>
          <div className='flex row items-center space-x-2'>
            <p className='text-sm font-medium text-gray-400 md:text-lg lg:text-sm'>
              video.channelTitle
            </p>
            <InformationCircleOutline size={12} className="dark:text-[#fff]" />
          </div>
          <p className='font-ligth text-sm dark:text-gray-100 md:text-lg lg:text-sm'>
            27 mil visualizaçoes . há 23 horas
          </p>
        </div>
      </Link>
    </>
  )
}

export default SideVideosList