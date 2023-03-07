import React from 'react'

import { 
  CogOutline, 
  GlobeOutline, 
  HomeOutline, 
  PlayOutline, 
  VideoCameraOutline 
} from 'heroicons-react'

import { motion } from'framer-motion'

import { container, item } from '../constants/filtersTopResponsive'

const Sidebar:React.FC<any> = ({ handleShow }) => {
  interface SideBarProps {
    title: string;
    icon: React.ReactNode;
  }

  const sidebarItems: SideBarProps[] = [
    { title: 'Home', icon: <HomeOutline className='h-6' /> },
    { title: 'Explorar', icon: <GlobeOutline className='h-6' /> },
    { title: 'Shorts', icon: <VideoCameraOutline className='h-6' /> },
    { title: 'Subscriptions', icon: <PlayOutline className='h-6' /> },
    { title: 'Library', icon: <CogOutline className='h-6' /> },
    { title: 'History', icon: <GlobeOutline className='h-6' /> }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ minWidth: '80px' }} 
      className='w-[5%] h-[100vh] flex flex-col items-center bg-[#5524d9] text-[#f9f9f9] transition-all'
    >
      {sidebarItems.map(({ icon, title }, idx) => (
        <motion.div 
          key={idx}
          variants={item}
          onClick={handleShow}
          className='flex flex-col justify-center cursor-pointer items-center transition-all hover:font-bold hover:text-white w-full h-20'
        >
          { icon }
          <h4 className='text-[10px]'>
            { title }
          </h4>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Sidebar;