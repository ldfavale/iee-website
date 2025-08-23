"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    text: "No puedo describir lo bien que se han adaptado mis dos hijos al Colegio IEE desde que nos vinimos de Canadá en 2022. El colegio se preocupa profundamente por las necesidades unicas de cada niño. Sus mentes y corazones crecen día a día. Creo firmemente que enviar a sus hijos aquí será una bendición para toda su familia.",
    author: "Tanya Salituro",
    role: "Madre de dos estudiantes",
  },
  {
    text: "Somos los papás de Fiorella y María Pía y estamos muy conformes por la dedicación y enseñanza que le brindan a nuestras hijas. Hace 4 años que formamos parte de esta gran familia llamada IEE.",
    author: "Nicolás y Natali",
    role: "Padres de Fiorella y María Pía",
  },
  {
    text: "Tenemos 4 hijos, a los cuales amamos, cuidamos e instruimos en la palabra de Dios, es nuestro anhelo que ellos crezcan confiando en sus promesas y puedan ser el día de mañana hombres y mujeres de bien y de buen testimonio para esta sociedad. Encontramos en IEE una institución que nació con el mismo anhelo, acompañando a los niños en sus etapas, reafirmando los valores familiares y con una visión cristiana que alumbra el camino y les permite a nuestros hijos divisar un futuro y una eternidad prometedora. Son 12 años confiando en IEE y animando a otros padres.",
    author: "Fabio y Nancy",
    role: "Padres de Evangelina y Elizabeth",
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <p className="text-gray-600 mb-4">{testimonials[index].text}</p>
          <p className="font-bold text-iee-footer">{testimonials[index].author}</p>
          <p className="text-gray-500">{testimonials[index].role}</p>
        </motion.div>
      </AnimatePresence>
      <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">‹</button>
      <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">›</button>
    </div>
  );
};

export default TestimonialCarousel;
