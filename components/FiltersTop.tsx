import React, { useEffect, useRef, useState } from "react"

import { motion } from "framer-motion"

import HorizontalScroll from "react-scroll-horizontal"

import { 
  ArrowLeft, 
  ArrowRight, 
  FilterOutline 
} from "heroicons-react"

interface FilterTopProps {
  setFilter: (title: string) => void;
  filter?: string;
  categories: any[];
}

import { container, item  } from "../constants/filtersTopResponsive"

const FiltersTop: React.FC<FilterTopProps> = ({ setFilter, filter, categories }) => {
  const [active, setActive] = useState<any> ([{}]);
  useEffect(() => {
    setActive(
      categories.map((i) => (
        { title: i.title, active: false }
      ))
    )
  },[categories, filter]);

  const activeRef: any = useRef();

  const handleActiveFilter = (title: string) => {
    //ACHAR O INDEX RESPONSÁVEL POR ALTERAR O ESTADO DE FILTRO ATIVO  
    let activeFilterIndex = 
      active.findIndex((i: any) => (
        title === i.title 
      ));
    //SETA A PARTIR DO INDEX O FILTRO ATIVO
    active.filter((item: any, idx: number) => 
      idx === activeFilterIndex 
        ? item["active"] = true
        : item["active"] = false
    );
  }

  function scrollLft() {
    console.log("left");
    const distance = 300;
    const outsider:any = document.getElementsByClassName('horizontal-scroll');

    outsider[0].scrollBy({
      left: -distance,
      behavior: 'smooth'
    });
  }
  
  function scrollRight() {
    console.log("right");
    const distance = 300;
    const outsider:any = document.getElementsByClassName('horizontal-scroll');

    outsider[0].scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  }

  return (
    <div>
      <div className="flex bg-[#eff0f4] dark:bg-[#202020] items-start">
        <div 
          className="p-2 h-[50px] relative z-10 xl:left-20 lg:left-10 left-1 top-[2rem] " 
          onClick={scrollLft}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 cursor-pointer text-violet-700">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
          </svg>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="items-center w-full flex xl:mx-40 lg:mx-30 sm:mx-10 md:mx-20 mx-5"
        >
          <HorizontalScroll
            ref={activeRef}
            className="horizontal-scroll"
            style={{ 
              height: '120px', 
              overflowX: 'hidden' 
            }}
          >
            {active && active?.map(({ 
              title, 
              active 
            }: any, idx: number) => (
              <motion.button
                key={idx}
                variants={item}
                style={{ 
                  backgroundColor: active ? '#14d4f1' : '' 
                }}
                className={`my-8 mx-2 h-[50px] text-[#121212] dark:text-[#F9F9F9] bg-[#F8F9FC] min-w-[250px] w-[300px] dark:bg-[#606060] hover:bg-[#14d4f1] dark:hover:bg-[#14d4f1] hover:text-[#5524d9] dark:hover:text-[#5524d9] cursor-pointer`}
                onClick={() =>
                  title === 'Todos' 
                  ? (
                    setFilter("All"), 
                    handleActiveFilter(title) 
                  ) : ( 
                    setFilter(title),
                    handleActiveFilter(title)
                  )
                }
              >
                <h3 className="font-bold text-sm text-center">
                  { title }
                </h3>
              </motion.button>
            ))}
          
          </HorizontalScroll>
        </motion.div>
        
        <div
          className="p-2 h-[50px] relative xl:right-20 lg:right-10 right-1 top-[2rem]"
          onClick={scrollRight}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="z-10 cursor-pointer text-violet-700 w-10 h-10">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <motion.div            
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {
          filter !== "" && (
            <div className="flex row space-x-4 items-center justify-around p-4">
              <motion.button
                variants={item}
                onClick={() => {
                  setFilter("")
                  handleActiveFilter("")
                }} 
                className="flex space-x-2 border-2 border-[#643ADC] row px-2 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#202020] transition-all shadow-lg"
              >
                <ArrowLeft color="#643ADC" />
                <p className="text-[#643ADC] font-medium">
                  back
                </p>
              </motion.button>
              <div className="flex text-center">
                <h3 className="text-xl font-bold hidden sm:visible  uppercase text-violet-800">
                  Categoria name
                </h3>
              </div>
              <motion.div 
                className="flex row space-x-2 items-center"
                variants={item}
              >
                <button className="flex space-x-2 row items-center rounded-xl">
                  <p className="dark:text-white">
                    Ordenar por: 
                  </p>
                </button>
                <select name="" id="" className="bg-white p-2 rounded-lg cursor-pointer">
                  <option value="" className="p-1">Mais recente</option>
                  <option value="" className="p-1">Mais Visto</option>
                </select>
              </motion.div>
            </div>
          )
        }
      </motion.div>

    </div>
  )
}
export default FiltersTop;
