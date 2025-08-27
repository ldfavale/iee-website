'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Custom hook to handle hydration safely
const useHydrationSafeState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return [value, setValue, isHydrated] as const;
};

interface Slide {
  id: string;
  type: 'image' | 'video';
  src: string;
  webp?: string;
  poster?: string;
  alt: string;
  priority?: boolean;
}

const OptimizedImage = React.memo(({ slide, isActive }: { slide: Slide; isActive: boolean }) => (
  <picture>
    {slide.webp && (
      <source srcSet={slide.webp} type="image/webp" />
    )}
    <img
      src={slide.src}
      alt={slide.alt}
      className="w-full h-full object-cover"
      loading={slide.priority ? 'eager' : 'lazy'}
      decoding={isActive ? 'sync' : 'async'}
    />
  </picture>
));
OptimizedImage.displayName = 'OptimizedImage';

const OptimizedVideo = React.memo(({ slide, index, isActive, videoRefs, setIsVideoLoaded }: { slide: Slide; index: number; isActive: boolean; videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>; setIsVideoLoaded: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <video
    ref={(el) => { videoRefs.current[index] = el; }}
    className="w-full h-full object-cover"
    muted
    loop
    playsInline
    preload={isActive ? 'auto' : 'metadata'}
    poster={slide.poster}
    onLoadedData={() => setIsVideoLoaded(true)}
    onError={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.warn('Video load error:', e)}
  >
    <source src={slide.src} type="video/mp4" />
    Su navegador no soporta videos HTML5.
  </video>
));
OptimizedVideo.displayName = 'OptimizedVideo';


const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion, isHydrated] = useHydrationSafeState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHydrated) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [isHydrated, setPrefersReducedMotion]);

  const slides = useMemo<Slide[]>(() => [
    {
      id: 'slide-1',
      type: 'image',
      src: '/assets/slider/slider1.jpeg',
      alt: 'Instalaciones del Instituto Educativo Evangélico',
      priority: true
    },
    {
      id: 'slide-2',
      type: 'image',
      src: '/assets/slider/slider2.jpeg',
      alt: 'Actividades educativas del IEE'
    },
    {
      id: 'slide-3',
      type: 'image',
      src: '/assets/slider/slider3.jpeg',
      alt: 'Comunidad estudiantil del IEE'
    },
    {
      id: 'slide-4',
      type: 'video',
      src: '/assets/slider/slider4.mp4',
      poster: '/assets/slider/slider3.jpeg',
      alt: 'Video promocional del IEE'
    }
  ], []);

  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion || !isHydrated) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        if (slides[next]?.type === 'video' && videoRefs.current[next]) {
          videoRefs.current[next]?.load();
        }
        return next;
      });
    }, 5000);
  }, [slides, prefersReducedMotion, isHydrated]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return stopAutoplay;
  }, [isPlaying, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (!isHydrated) return;
    
    const currentVideo = videoRefs.current[currentSlide];
    
    if (slides[currentSlide]?.type === 'video' && currentVideo) {
      if (isPlaying && !prefersReducedMotion) {
        currentVideo.play().catch(console.warn);
      } else {
        currentVideo.pause();
      }
    }

    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentSlide) {
        video.pause();
      }
    });
  }, [currentSlide, isPlaying, prefersReducedMotion, slides, isHydrated]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-0" role="img" aria-label="Slider de hero">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {slide.type === 'video' ? (
              <OptimizedVideo 
                slide={slide} 
                index={index} 
                isActive={index === currentSlide}
                videoRefs={videoRefs}
                setIsVideoLoaded={setIsVideoLoaded}
              />
            ) : (
              <OptimizedImage 
                slide={slide} 
                isActive={index === currentSlide} 
              />
            )}
          </div>
        ))}
      </div>

      <header className="relative z-20">
        {/* Top gradient overlay */}
        <div className="absolute inset-0 h-48 md:h-64 bg-gradient-to-b from-[#0f1f2e]/70 via-[#0f1f2e]/50 to-transparent z-0"></div>
        
        {/* Mobile and Tablet Nav */}
        <nav className="relative z-30 lg:hidden flex items-center justify-between px-4 sm:px-8 py-6">
          <Link href="/">
            <Image src="/assets/logo.png" alt="IEE Logo" width={100} height={40} className="h-auto w-24" />
          </Link>
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-label="Abrir menú"
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>

        {/* Desktop Nav */}
        <nav className="relative z-30 hidden lg:flex items-center justify-center px-8 py-6" role="navigation">
          <div className="flex items-center justify-center w-full max-w-6xl space-x-16">
            {/* Left side navigation */}
            <div className="flex items-center space-x-8">
              <a href="#admisiones" className="group relative text-white font-semibold transition-colors text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 rounded text-center whitespace-nowrap">
                INICIO
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#acerca" className="group relative text-white font-semibold transition-colors text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 rounded text-center whitespace-nowrap">
                QUIENES SOMOS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#academicos" className="group relative text-white font-semibold transition-colors text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 rounded text-center whitespace-nowrap">
                ACADÉMICO
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            {/* Center logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="/assets/logo.png" alt="IEE Logo" width={120} height={50} className="h-auto" />
              </Link>
            </div>
            
            {/* Right side navigation */}
            <div className="flex items-center space-x-8">
              <a href="#novedades" className="group relative text-white font-semibold transition-colors text-sm font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 rounded text-center whitespace-nowrap">
                NOVEDADES
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#vida-estudiantil" className="group relative text-white font-semibold transition-colors text-sm font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 rounded text-center whitespace-nowrap">
                VIDA ESTUDIANTIL
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contacto" className="group relative text-white font-semibold transition-colors text-sm font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 rounded text-center whitespace-nowrap">
                CONTACTO
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#0f1f2e]/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute top-6 right-4 sm:right-8">
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Cerrar menú"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-8">
            <a href="#admisiones" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-semibold">INICIO</a>
            <a href="#acerca" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-semibold">QUIENES SOMOS</a>
            <a href="#academicos" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-semibold">ACADÉMICO</a>
            <a href="#novedades" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-semibold">NOVEDADES</a>
            <a href="#vida-estudiantil" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-semibold">VIDA ESTUDIANTIL</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-semibold">CONTACTO</a>
          </nav>
        </div>
      )}

      {/* Bottom gradient overlay for content */}
      <div className="absolute bottom-0 inset-x-0 h-64 md:h-96 bg-gradient-to-t from-[#0f1f2e]/85 to-transparent z-10"></div>
      
      <div className="absolute bottom-28 sm:bottom-32 md:bottom-26 left-1/2 transform -translate-x-1/2 z-20 text-white text-center w-full px-4">
        <p className="text-xl md:text-2xl mb-4 uppercase font-thin text-center">
           <span className='font-bold'>Educación</span> con 
        </p>
        <h1 className="font-thin tracking-wider leading-none text-5xl sm:text-6xl lg:text-8xl uppercase">
          <span 
            className="text-transparent font-thin font-family-sans"
            style={{
              WebkitTextStroke: '1px white',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em'
            } as React.CSSProperties}
            aria-label="PROPOSITO"
          >
            Propósito
          </span>
        </h1>
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none"
          aria-label={isPlaying ? 'Pausar presentación' : 'Reproducir presentación'}
          disabled={prefersReducedMotion || !isHydrated}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3 ml-0.5" />
          )}
        </button>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-2">
        <button
          onClick={prevSlide}
          className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="w-3 h-3" />
        </button>

        <button
          onClick={nextSlide}
          className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 focus:outline-none"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#content" aria-label="Scroll down">
          <div className="animate-subtle-bounce">
            <ChevronDown className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </a>
      </div>

      {slides[currentSlide]?.type === 'video' && !isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/10">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
