"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      {/* <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-cover bg-center bg-fixed text-white text-center py-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="container mx-auto px-4 bg-black bg-opacity-50 py-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">¡Inscripciones abiertas 2024 para inicial, primaria y secundaria!</h1>
          <Link href="/contacto">
            <button className="btn btn-secondary">Contáctanos</button>
          </Link>
        </div>
      </motion.section> */}
      <HeroSlider/>

      {/* ACSI Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-iee-footer mb-4">Instituto Educativo Evangélico está asociado a la Asociación Internacional de Colegios Cristianos</h2>
          <a href="https://acsilat.org" target="_blank" rel="noopener noreferrer" className="text-iee-blue hover:underline">Más información en acsilat.org</a>
        </div>
      </section>

      {/* Academic Levels Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <Image src="https://images.unsplash.com/photo-1577896851281-d61253615520?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Inicial" width={600} height={400} className="rounded-lg mb-4" />
              <h3 className="text-2xl font-bold text-iee-footer">Inicial</h3>
              <Link href="/academico/inicial" className="text-iee-blue hover:underline">Ver más</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <Image src="https://images.unsplash.com/photo-1541339907198-e08756611fca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Primaria" width={600} height={400} className="rounded-lg mb-4" />
              <h3 className="text-2xl font-bold text-iee-footer">Primaria</h3>
              <Link href="/academico/primaria" className="text-iee-blue hover:underline">Ver más</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Secundaria" width={600} height={400} className="rounded-lg mb-4" />
              <h3 className="text-2xl font-bold text-iee-footer">Secundaria</h3>
              <Link href="/academico/secundaria" className="text-iee-blue hover:underline">Ver más</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-iee-footer mb-8">Testimonios</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </main>
  );
}
