"use client";
import HeroSlider from '@/components/HeroSlider';
import VisionSection from '@/components/VisionSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VisionSection />

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Testimonios</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </main>
  );
}
