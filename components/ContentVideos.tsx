import React, { useEffect, useState } from "react"

import Video from "./Video"

import { motion } from "framer-motion"

interface VideosProps {
  videos: any[];
  filter?: string;
  search?: string;
}

const ContentVideos: React.FC<VideosProps> = ({ videos, filter = "", search = "" }) => {
  const [myVideos, setMyVideos] = useState<any>([{}]);
  useEffect(() => {
    setMyVideos(videos);
  },[videos])

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <div className="flex-col py-4 px-6">
      {filter !== "" && (
        <>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="visible"
            className="container grid justify-center gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 flex-wrap bg-transparent"
          >
            {(
              myVideos?.map(({ 
                id,
                category_id,
                title,
                media,
                time,
                thumb,
                description,
                difficulty,
            }, idx) =>
              title.toLowerCase().includes(search.toLocaleLowerCase().trim()) && 
                title.toLocaleLowerCase().includes(filter.slice(0, 6).toLocaleLowerCase()) &&
               (
                <motion.div
                  key={idx} 
                  className="item" 
                  variants={item}
                >
                  <Video 
                    key={idx}
                    videoId={id}
                    categoryId={category_id}
                    media={media}
                    title={title}
                    description={description}
                    difficulty={difficulty}
                    thumb={thumb}
                    time={time}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}

export default ContentVideos;