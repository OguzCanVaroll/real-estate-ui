import React, { useEffect, useRef, useState } from 'react';
import { assets, projectsData } from '../assets/assets';
import { motion } from "motion/react"

const Projects = () => {
  const [cardsToShow, setCardsToShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const gapInPx = 32; // gap-8 (Tailwind) = 2rem = 32px

  // Ekran boyutuna göre kart sayısını ayarla
  const updateCardsToShow = () => {
    const width = window.innerWidth;
    if (width > 1280) setCardsToShow(4);
    else if (width > 1024) setCardsToShow(3);
    else if (width > 640) setCardsToShow(2);
    else setCardsToShow(1);
  };

  // Container genişliğini ölç
  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateCardsToShow();
    updateContainerWidth();

    window.addEventListener('resize', updateCardsToShow);
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateCardsToShow);
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  // Kart genişliğini hesapla (boşlukları çıkararak eşit böl)
  const cardWidth =
    (containerWidth - gapInPx * (cardsToShow - 1)) / cardsToShow;

  // Toplam kaydırılacak px miktarı
  const translateX = currentIndex * (cardWidth + gapInPx);

  // Sınır kontrolü
  const maxIndex = projectsData.length - cardsToShow;

  const nextProject = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <motion.div 
      initial = {{opacity: 0, x:-200}}
      transition = {{ duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once:true}}
      className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'
      id='Projects'
    >
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        Projects{' '}
        <span className='underline underline-offset-4 decoration-1 font-light'>
          Completed
        </span>
      </h1>
      <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>
        Crafting Spaces, Building Legacies - Explore Our Portfolio
      </p>

      {/* Butonlar */}
      <div className='flex justify-end items-center mb-8'>
        <button
          onClick={prevProject}
          className='p-3 bg-gray-200 rounded mr-2'
          aria-label='Previous Project'
        >
          <img src={assets.left_arrow} alt='Previous' />
        </button>
        <button
          onClick={nextProject}
          className='p-3 bg-gray-200 rounded mr-2'
          aria-label='Next Project'
        >
          <img src={assets.right_arrow} alt='Next' />
        </button>
      </div>

      {/* Slider */}
      <div className='overflow-hidden' ref={containerRef}>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{
            gap: `${gapInPx}px`,
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className='relative flex-shrink-0'
              style={{
                width: `${cardWidth}px`,
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-auto mb-14'
              />
              <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    {project.title}
                  </h2>
                  <p className='text-gray-500 text-sm'>
                    {project.price} <span>|</span> {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
