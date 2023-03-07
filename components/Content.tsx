import React, { lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCategories } from '../redux/slicer/CategoriesSlicer'

import { useVideos } from '../redux/slicer/VideosSlicer'

const ContentVideos = lazy(() => import('./ContentVideos'))

import FiltersTop from './FiltersTop'

interface ContentProps {
  search: string;
}

const Content:React.FC<ContentProps> = ({ search }) => {
  const [useFilterVideo, setUseFilterVideos] = useState("");
  const [myVideos, setMyVideos] = useState([{}]);

  const stateVideos = 
    useSelector(useVideos);
  const stateCategories = 
    useSelector(useCategories);

  useEffect(() => {
    if(stateVideos && stateCategories) {
      console.log({ 
        stateCategories 
      }, { 
        stateVideos 
      },'redux');
    }

    setMyVideos(
      stateVideos?.map((i) => i)
    );
  },[stateCategories, stateVideos, search]);

  return (
    <div className='flex-1 w-full flex-col'>
      <FiltersTop 
        setFilter={setUseFilterVideos} 
        filter={useFilterVideo}
        categories={stateCategories}
      />

      <div className='flex xl:mx-40 lg:mx-30 md:mx-20'>
        <ContentVideos 
          videos={myVideos} 
          filter={useFilterVideo}
          search={search}
        />
      </div>
    </div>
  )
}

export default Content;
