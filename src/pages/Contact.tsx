import React from 'react';
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { WorldMapSVG } from "@/components/WorldMapSVG";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-code text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">{children}</p>;
}

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] py-20 md:py-32">
      <SEO 
        title="Contato" 
        description="Entre em contato com a Dagaz.Dev para consultoria, mentoria e soluções SAP personalizadas." 
        url="/contato" 
      />
      
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionLabel>Fale com a Forja</SectionLabel>
            <h1 className="mt-4 font-heading text-4xl font-extrabold text-white md:text-6xl">Pronto para sua próxima jornada SAP?</h1>
            <p className="mt-8 text-lg leading-8 text-slate-300">
              Seja para uma consultoria estratégica S/4HANA, desenvolvimento BTP ou mentoria técnica, 
              estamos prontos para ajudar sua empresa a alcançar clareza e excelência.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10">
                  <Mail className="h-5 w-5 text-[#00D9FF]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white">E-mail</p>
                  <a href="mailto:hello@dagaz.dev" className="text-slate-400 hover:text-[#00D9FF] transition">hello@dagaz.dev</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10">
                  <Phone className="h-5 w-5 text-[#00D9FF]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white">WhatsApp</p>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00D9FF] transition">+55 (11) 9999-9999</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10">
                  <MapPin className="h-5 w-5 text-[#00D9FF]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white">Localização</p>
                  <p className="text-slate-400">São Paulo, Brasil (Atendimento Global)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="font-code text-xs uppercase tracking-widest text-[#D4AF37]">Tempo de resposta</p>
              <p className="mt-2 text-slate-300">Geralmente respondemos em até 24 horas úteis.</p>
            </div>
          </div>

          <div className="runic-panel p-8 md:p-12">
            <div className="relative z-10">
              <h2 className="mb-8 font-heading text-2xl font-bold text-white">Envie sua mensagem</h2>
              <ContactForm />
            </div>
          </div>
        </div>
        
        {/* ── Presença Global ─────────────────────────────────── */}
        <div className="mt-20 border border-white/10 p-1 runic-panel bg-slate-900/50">
          <div className="relative z-10">

            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black/40 border-b border-white/5">
              <p className="font-heading font-bold text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#00D9FF]" /> Presença Global
              </p>
              <p className="font-code text-[10px] uppercase tracking-widest text-slate-400">HQ: São Paulo, Brasil</p>
            </div>

            {/* Stats + Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-white/5">

              {/* Stats */}
              <div className="grid grid-cols-2 border-r border-white/5">
                {[
                  { value: '4', label: 'Países Atendidos' },
                  { value: '3', label: 'Continentes' },
                  { value: '2', label: 'Idiomas' },
                  { value: '24h', label: 'Suporte' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-center justify-center p-6 gap-1 ${
                      i % 2 === 0 ? 'border-r border-white/5' : ''
                    } ${i < 2 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="font-heading text-3xl font-extrabold text-[#00D9FF]">{stat.value}</span>
                    <span className="font-code text-[9px] uppercase tracking-[0.2em] text-slate-400 text-center">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Country flags */}
              <div className="grid grid-cols-2">
                {[
                  { flag: '🇧🇷', name: 'Brasil', city: 'São Paulo', hq: true },
                  { flag: '🇺🇸', name: 'EUA', city: 'Atendimento Remoto' },
                  { flag: '🇦🇷', name: 'Argentina', city: 'Atendimento Remoto' },
                  { flag: '🇮🇹', name: 'Itália', city: 'Atendimento Remoto' },
                ].map((country, i) => (
                  <div
                    key={country.name}
                    className={`group flex items-center gap-3 p-5 hover:bg-white/[0.03] transition-colors ${
                      i % 2 === 0 ? 'border-r border-white/5' : ''
                    } ${i < 2 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="text-3xl leading-none">{country.flag}</span>
                    <div>
                      <p className="font-heading text-sm font-bold text-white flex items-center gap-1.5">
                        {country.name}
                        {country.hq && (
                          <span className="inline-block px-1.5 py-0.5 font-code text-[8px] uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                            HQ
                          </span>
                        )}
                      </p>
                      <p className="font-code text-[9px] text-slate-500 mt-0.5">{country.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map SVG */}
            <WorldMapSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
