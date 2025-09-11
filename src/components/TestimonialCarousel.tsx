"use client";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonialsData = [
  {
    text: "I continue to hold Chapin in a special place in my heart. Being there fueled me with a confidence and thirst for knowledge that is noticeable to all who encounter me. The assumed meekness of women is a detrimental force, holding back many women in the world, but not me. I received an education in an environment that taught me my voice should always be heard. That is the Chapin difference.",
    author: "Faith Bourne",
    role: "Class of 2019",
    image: "/assets/images/testimonials/testimonio1.jpeg"
  },
  {
    text: "No puedo describir lo bien que se han adaptado mis dos hijos al Colegio IEE desde que nos vinimos de Canadá en 2022. El colegio se preocupa profundamente por las necesidades unicas de cada niño. Sus mentes y corazones crecen día a día. Creo firmemente que enviar a sus hijos aquí será una bendición para toda su familia.",
    author: "Tanya Salituro",
    role: "Madre de dos estudiantes",
    image: "/assets/images/testimonials/testimonio2.jpeg"
  },
  {
    text: "Somos los papás de Fiorella y María Pía y estamos muy conformes por la dedicación y enseñanza que le brindan a nuestras hijas. Hace 4 años que formamos parte de esta gran familia llamada IEE.",
    author: "Nicolás y Natali",
    role: "Padres de Fiorella y María Pía",
    image: "/assets/images/testimonials/testimonio3.jpeg"
  },
  {
    text: "Tenemos 4 hijos, a los cuales amamos, cuidamos e instruimos en la palabra de Dios, es nuestro anhelo que ellos crezcan confiando en sus promesas y puedan ser el día de mañana hombres y mujeres de bien y de buen testimonio para esta sociedad. Encontramos en IEE una institución que nació con el mismo anhelo, acompañando a los niños en sus etapas, reafirmando los valores familiares y con una visión cristiana que alumbra el camino y les permite a nuestros hijos divisar un futuro y una eternidad prometedora. Son 12 años confiando en IEE y animando a otros padres.",
    author: "Fabio y Nancy",
    role: "Padres de Evangelina y Elizabeth",
    image: "/assets/images/testimonials/testimonio4.jpeg"
  },
  {
    text: "Another testimonial to show the carousel functionality. This is a great school and I am very happy with the education my children are receiving.",
    author: "John Doe",
    role: "Parent",
    image: "/assets/images/testimonials/testimonio5.jpeg"
  }
];

// Using a gold-like color from Tailwind's palette as a placeholder for var(--color-iee-yellow)
const IEE_YELLOW = '#eab308'; // This is amber-500

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the middle item

  const handleIndicatorClick = (i: number) => {
    setActiveIndex(i);
  };

  const reorderedTemonials = useMemo(() => {
    const testimonials = testimonialsData.map((t, i) => ({ ...t, originalIndex: i }));
    const middle = Math.floor(testimonials.length / 2);
    
    const reordered = [];
    for (let i = 0; i < testimonials.length; i++) {
        const offset = (i - middle + testimonials.length) % testimonials.length;
        const originalIndex = (activeIndex + offset) % testimonials.length;
        const testimonial = testimonials.find(t => t.originalIndex === originalIndex);
        if(testimonial) {
          reordered.push(testimonial);
        }
    }
    return reordered;
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-4xl mx-auto text-center py-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 min-h-[16rem] flex flex-col justify-center items-center" // Prevent overlap
        >
          <blockquote className="text-3xl font-serif italic text-gray-800 mb-6">
            “{testimonialsData[activeIndex].text}”
          </blockquote>
          <p className="font-sans font-bold text-iee-footer">{testimonialsData[activeIndex].author}</p>
          <p className="font-sans text-gray-500">{testimonialsData[activeIndex].role}</p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center items-center gap-4">
        {reorderedTemonials.map((testimonial) => {
          const isActive = activeIndex === testimonial.originalIndex;
          return (
            <motion.button 
              layout
              key={testimonial.originalIndex} 
              onClick={() => handleIndicatorClick(testimonial.originalIndex)}
              className={`focus:outline-none ${isActive ? 'mx-2' : ''}`}
              animate={isActive ? "active" : "inactive"}
              whileHover={isActive ? "active" : "hover"}
              transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
            >
              <motion.div
                className="p-1 rounded-full"
                variants={{
                  inactive: { scale: 0.9, boxShadow: `0 0 0 0px ${IEE_YELLOW}` },
                  active:   { scale: 1.1, boxShadow: `0 0 0 3px ${IEE_YELLOW}` },
                  hover:    { scale: 1,   boxShadow: `0 0 0 3px ${IEE_YELLOW}` }
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-20 h-20 md:w-24 md:h-24"
                />
              </motion.div>
            </motion.button>
          )}
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel;