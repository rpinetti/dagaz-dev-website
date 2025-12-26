import React from 'react';
import ContactForm from '@/components/forms/ContactForm';

export const metadata = {
  title: 'Contato - Dagaz.Dev',
  description: 'Entre em contato conosco para dúvidas, sugestões ou parcerias relacionadas a SAP, ABAP e Fiori.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-montserrat font-bold text-5xl text-viking-gold text-center mb-4">
        Entre em Contato
      </h1>
      <p className="font-lato text-lg text-runic-white text-center max-w-2xl mx-auto mb-16">
        Tem uma pergunta, sugestão ou proposta de colaboração? Adoraríamos ouvir de você! Preencha o formulário abaixo e entraremos em contato em breve.
      </p>

      <div className="bg-fjord-blue-dark p-8 md:p-12 rounded-2xl shadow-lg border border-fjord-blue-light">
        <ContactForm />
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-glacial-cyan/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-glacial-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="font-montserrat font-semibold text-glacial-cyan text-lg mb-2">Email</h3>
          <p className="font-lato text-runic-white">contato@dagaz.dev</p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-viking-gold/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-viking-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.5 13c1.93 0 3.76.5 5.36 1.41l1.59-1.59C13.68 11.46 11.42 10 9 10c-4.42 0-8 3.58-8 8s3.58 8 8 8c2.42 0 4.68-.86 6.45-2.29l-1.59-1.59C12.26 12.5 10.43 13 8.5 13z"></path>
            </svg>
          </div>
          <h3 className="font-montserrat font-semibold text-viking-gold text-lg mb-2">GitHub</h3>
          <p className="font-lato text-runic-white">@rpinetti</p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-glacial-cyan/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-glacial-cyan" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm5 4c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-4h4l1.25 1.25L15 12l4 4.5z"></path>
            </svg>
          </div>
          <h3 className="font-montserrat font-semibold text-glacial-cyan text-lg mb-2">LinkedIn</h3>
          <p className="font-lato text-runic-white"><a href="https://www.linkedin.com/in/roberto-martinelli-pinetti">Conecte-se comigo</a></p>
        </div>
      </div>
    </div>
  );
}
