import React, { Fragment, useState } from 'react'

import logo from '../public/images/logo.png'

import {
  MicrophoneIcon,
  CalendarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars2Icon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

import Image from 'next/image'
import Link from 'next/link'

import Switcher from './Switcher'

import { motion } from 'framer-motion'
import Moment from 'react-moment'

import { useRouter } from 'next/router'

import { useSession, signOut } from 'next-auth/react'

import { LogoutOutline } from 'heroicons-react'

interface HeaderProps {
  setShow: (value: any) => any;
  setSearch: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  setShow, 
  setSearch
}) => {

  const router = useRouter();
  const { redirect }:any = router.query;
  
  const [todayDate] = useState(Date.now());
  const { data: session } = useSession();

  return (
    <header
      className='flex-1 flex xl:mx-40 lg:mx-30 md:mx-20 flex-wrap md:flex-wrap space-y-4 min-w-[150px] space-x-2 sm:justify-between justify-center items-center py-8'
    >
      <div className='mx-3 flex cursor-pointer items-center'>
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            },
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
          <MenuOutline 
            className='h-7 mr-4 dark:text-[#FFF] text-[#121212] hover:text-[#5524d9] dark:hover:text-[#5524d9] transition-all'
            onClick={
              () => setShow((value:any) => !value)
            } 
          />
        </motion.div> */}
      
        <Link href="/" className='container'>
          <motion.div
            className="box rounded-xl mx-4 transition hover:scale-105 mb-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            <Image
              alt="logo" 
              src={logo}
              width={135}
              height={120}
              style={{ minWidth:50, maxWidth: 135 }}
            />
          </motion.div>
        </Link>

        <motion.div 
          className='flex justify-center items-center relative top-1'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            },
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
          <Switcher />
        </motion.div>
      </div>

      <div className='flex w-[600px] space-x-2 items-center justify-center px-1 sm:px-0'> 
        <motion.form 
          className='flex-1 flex items-center justify-center mx:5 rounded-l-full w-[50%]'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            },
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
          <input 
            type="text"
            placeholder='Search' 
            className='flex w-full shadow-md p-3 bg-[#ebedf3] dark:bg-[#404040] h-10 placeholder:text-lg dark:placeholder:text-white placeholder:relative placeholder:left-2 rounded-l-xl z-10 cursor-pointer' 
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className='h-10 w-12 items-center shadow-md bg-[#643ADC] text-white border-l-2 border-gray-300 dark:border-gray-900 rounded-r-xl justify-center flex'>
            <MagnifyingGlassIcon className='h-5' />
          </button>
        </motion.form>

        <motion.button 
          className="bg-[#643ADC] text-white h-10 w-10 shadow-lg rounded-full flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            },
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
          <MicrophoneIcon className='h-[30px] w-[30px]' />
        </motion.button>
      </div>
      
      <div className='lg:flex hidden lg:visible justify-between items-center space-x-5 border-l-2 border-l-yellow-400'>
        <div className='flex flex-wrap mx-4'>
          <p className='text-md dark:text-white'>
            <Moment date={todayDate} format="LL" />
          </p>
        </div>

        <button>
          <CalendarIcon color="gray" className='hover:text-[#5524d9] h-[30px] w-[30px] transition-all' />
        </button>
        {session && (
          <button 
            onClick={() => 
              signOut()
            }>
            <LogoutOutline 
              size={30} 
              color="gray" 
              className='hover:text-[#5524d9] transition-all' 
            />
          </button>
        )}
      </div>
      
      <div className='lg:flex hidden cursor-pointer lg:visible justify-between space-x-2 items-center pl-4 border-l-2 border-l-gray-300'>
        {session ? (
          <Fragment>
            <p className='font-semibold text-md text-[#909090] hover:text-[#5524d9]'>
              { session?.user.name }
            </p>
            <Image 
              src={{ src: `/${session?.user.image}` , width: 40, height: 40 }}
              alt="image"
              className="rounded-full w-[25%] h-[100%]" 
            />
          </Fragment>
        ) : (
          <button 
            className='bg-violet-700 text-white font-medim text-md text-center px-4 py-2 rounded-3xl'
            onClick={ () =>
              router.push(`/login?redirect=${redirect || '/'}`)
            }
          >
            Signin
          </button>
        )}
      </div>

    </header>
  )
}

export default Header