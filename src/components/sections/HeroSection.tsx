import React from 'react';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section 
      className="py-24 md:py-32 min-h-[70vh] flex items-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/Yggdrasil.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay para melhor contraste */}
      <div className="absolute inset-0 bg-gradient-to-br from-fjord-blue/85 to-fjord-blue-light/85 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="font-montserrat font-bold text-5xl md:text-6xl text-viking-gold leading-tight -tracking-wider animate-fadeInUp">
            Dagaz.Dev: Transformando SAP S/4HANA
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-full md:w-4/5 mx-auto md:mx-0 animate-fadeInUp delay-100"></div>
          
          <p className="font-montserrat font-semibold text-2xl md:text-3xl text-glacial-cyan animate-fadeInUp delay-100">
            Inovação, Performance e Conhecimento Ancestral
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-full md:w-4/5 mx-auto md:mx-0 animate-fadeInUp delay-100"></div>

          <p className="font-lato text-lg text-runic-white leading-relaxed max-w-xl mx-auto md:mx-0 animate-fadeInUp delay-200">
            Artigos técnicos profundos, projetos open-source e soluções para otimizar seus processos SAP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4 animate-fadeInUp delay-300">
            <Button variant="primary" size="lg" as="a" href="/blog">
              Explorar Blog
            </Button>
            <Button variant="tertiary" size="lg" as="a" href="/projects">
              Ver Projetos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;