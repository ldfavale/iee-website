'use client';

import React from 'react';
import EducationLevelCard from './EducationLevelCard';

const VisionSection = () => {
  const educationLevels = [
    {
      title: 'Inicial',
      description: 'Una base sólida para el futuro, fomentando la curiosidad y el amor por el aprendizaje.',
      imageUrl: '/assets/slider/slider1.jpeg',
      link: '/academico/inicial',
    },
    {
      title: 'Primaria',
      description: 'Desarrollo de habilidades fundamentales y valores en un ambiente de apoyo y descubrimiento.',
      imageUrl: '/assets/slider/slider2.jpeg',
      link: '/academico/primaria',
    },
    {
      title: 'Secundaria',
      description: 'Preparación para los desafíos del mañana con excelencia académica y formación integral.',
      imageUrl: '/assets/slider/slider3.jpeg',
      link: '/academico/secundaria',
    },
  ];

  return (
    <div className="relative bg-white pb-20">
      <div className="pointer-events-none absolute right-0 top-0  transform z-0">
        <h1 className="text-[50rem] font-serif italic  text-iee-blue opacity-5" style={{lineHeight: '0.8'}}>
          IEE
        </h1>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-24 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="font-serif text-5xl italic text-gray-800 md:text-6xl">
              Educacion con <span className="font-sans text-5xl font-thin tracking-widest text-iee-blue md:text-6xl">Propósito</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Con el fin de orientar la tarea educativa hacia el desarrollo de los talentos y capacidades (Inteligencias ) de los alumnos a partir de la incorporación de talleres variados, nuevas estrategias y recursos orientados al desarrollo de competencias ,a fin de acompañarlos en el desarrollo y fortalecimiento  necesario para su exitoso desenvolvimiento en la vida , a la vez que comprende que es un individuo único y especial diseñado con un plan y propósito individual y único,, llegando a ser una persona íntegra, para beneficio propio y siendo a su vez agente y fuente  de cambio y mejora  favoraable  en los lugares donde socialice.
            </p>
          </div>
          <div></div>
        </div>

      </div>
      <div className="relative mx-auto max-w-9xl px-8 sm:px-6 lg:px-8 z-10">

          <div className="mt-28 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {educationLevels.map((level) => (
              <EducationLevelCard key={level.title} {...level} />
            ))}
          </div>
      </div>
    </div>
  );
};

export default VisionSection;
