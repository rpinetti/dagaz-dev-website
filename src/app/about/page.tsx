import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-montserrat font-bold text-5xl text-viking-gold text-center mb-12">
        Sobre o Dagaz.Dev
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/images/profile.jpg"
            alt="Roberto, criador do Dagaz.Dev"
            width={250}
            height={250}
            className="rounded-full border-4 border-glacial-cyan shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="font-montserrat font-semibold text-3xl text-glacial-cyan mb-4">
            Minha Jornada no Universo SAP
          </h2>
          <p className="font-lato text-lg text-runic-white leading-relaxed mb-4">
            Olá! Eu sou Roberto, o criador por trás do Dagaz.Dev. Minha paixão por tecnologia e pelo ecossistema SAP me levou a explorar as profundezas do S/4HANA, ABAP e Fiori. Com anos de experiência em projetos desafiadores, percebi a necessidade de um espaço para compartilhar conhecimento, insights e soluções práticas.
          </p>
          <p className="font-lato text-lg text-runic-white leading-relaxed">
            O Dagaz.Dev nasceu da vontade de construir uma comunidade onde desenvolvedores e consultores SAP possam encontrar recursos valiosos, discutir tendências e aprimorar suas habilidades. Acredito que a inovação e a colaboração são as chaves para desvendar todo o potencial do SAP.
          </p>
        </div>
      </div>

      <div className="bg-fjord-blue-dark p-10 rounded-xl shadow-lg mb-16">
        <h2 className="font-montserrat font-semibold text-3xl text-viking-gold text-center mb-6">
          Minha Expertise
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 font-lato text-lg text-runic-white list-disc list-inside">
          <li>Desenvolvimento ABAP (OO, CDS Views, AMDP)</li>
          <li>Extensões e Customizações em SAP S/4HANA</li>
          <li>Criação e Otimização de Fiori Apps (UI5, Fiori Elements)</li>
          <li>Integração SAP (OData, REST, SOAP)</li>
          <li>Performance Tuning e Best Practices</li>
          <li>Arquitetura de Soluções SAP</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="font-montserrat font-semibold text-3xl text-glacial-cyan mb-6">
          Vamos Conectar!
        </h2>
        <p className="font-lato text-lg text-runic-white leading-relaxed mb-8">
          Tenho certeza de que podemos aprender muito juntos. Sinta-se à vontade para explorar o blog, conferir meus projetos no GitHub ou entrar em contato.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" as="a" href="/contact">
            Entrar em Contato
          </Button>
          <Button variant="tertiary" size="lg" as="a" href="https://www.linkedin.com/in/roberto-martinelli-pinetti" target="_blank" rel="noopener noreferrer">
            Conectar no LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
}
