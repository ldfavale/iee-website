'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 256) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const academicLinks = [
    { href: '/academico/inicial', title: 'Nivel Inicial', description: 'Un comienzo sólido con bases en el juego y la exploración.' },
    { href: '/academico/primaria', title: 'Primaria', description: 'Fomentando la curiosidad y el pensamiento crítico.' },
    { href: '/academico/secundaria', title: 'Secundaria', description: 'Preparando a los jóvenes para los desafíos del futuro.' },
  ];

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-md sticky top-0 z-50"
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link href="/">
              <Image src="/assets/logo.png" alt="IEE Logo" width={100} height={40} />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-iee-blue transition-colors">Inicio</Link>
            <Link href="/acerca" className="text-gray-600 hover:text-iee-blue transition-colors">Acerca de IEE</Link>
            
            <div onMouseEnter={() => setIsMegaMenuOpen(true)}>
              <button className="flex items-center text-gray-600 hover:text-iee-blue transition-colors">
                Académico
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link href="/contacto" className="text-gray-600 hover:text-iee-blue transition-colors">Contacto</Link>
            <Link href="/novedades" className="text-gray-600 hover:text-iee-blue transition-colors">Novedades</Link>
          </div>

          

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-iee-blue focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200"
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8">
              {academicLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block p-6 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-xl text-iee-blue mb-2">{link.title}</h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="flex flex-col space-y-4 px-4 pt-2 pb-4">
              <Link href="/" className="text-gray-600 hover:text-iee-blue">Inicio</Link>
              <Link href="/acerca" className="text-gray-600 hover:text-iee-blue">Acerca de IEE</Link>
              <h3 className="text-gray-800 font-semibold">Académico</h3>
              <div className="flex flex-col space-y-2 pl-4">
                {academicLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-gray-600 hover:text-iee-blue">{link.title}</Link>
                ))}
              </div>
              <Link href="/contacto" className="text-gray-600 hover:text-iee-blue">Contacto</Link>
              <Link href="/novedades" className="text-gray-600 hover:text-iee-blue">Novedades</Link>
              <Link href="/contacto">
                <button className="btn btn-primary w-full mt-4">Contáctanos</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
