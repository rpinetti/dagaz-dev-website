import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { WorldMapSVG } from "@/components/WorldMapSVG";
import type { Country } from "@/components/WorldMapSVG";
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-code text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">{children}</p>;
}

/**
 * Contador animado: conta de 0 até `to` quando entra no viewport.
 * Para valores não numéricos exibe o valor diretamente com fade+scale.
 */
function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const numeric = Number.parseInt(value, 10);
  const isNumeric = !Number.isNaN(numeric);

  // Spring do valor numérico
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView && isNumeric) {
      const timer = setTimeout(() => spring.set(numeric), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, isNumeric, numeric, spring, delay]);

  if (!isNumeric) {
    // Valor não numérico (ex: '24h'): fade + scale simples
    return (
      <motion.span
        ref={ref as React.Ref<HTMLSpanElement>}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000, ease: 'backOut' }}
        className="font-heading text-3xl font-extrabold text-[#00D9FF]"
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className="font-heading text-3xl font-extrabold text-[#00D9FF]">
      <motion.span>{display}</motion.span>
    </span>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('/content/global-presence.json')
      .then((r) => r.json())
      .then((data: { countries: Country[] }) => setCountries(data.countries))
      .catch((err) => console.error('[Contact] Falha ao carregar presença global:', err));
  }, []);

  // Derivar stats a partir dos dados carregados
  const hqCountry = countries.find((c) => c.hq);
  const continents = new Set(
    countries.map((c) => {
      return c.continents;
    })
  );
  const stats = [
    { value: String(countries.length || '—'), label: 'Países Atendidos' },
    { value: String(continents.size || '—'), label: 'Continentes' },
    { value: '2', label: 'Idiomas' },
    { value: '24h', label: 'Suporte' },
  ];

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
              <p className="font-code text-[10px] uppercase tracking-widest text-slate-400">
                {hqCountry ? `HQ: ${hqCountry.capital.city}, ${hqCountry.name}` : 'HQ: Brasília, Brasil'}
              </p>
            </div>

            {/* Stats + Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-white/5">

              {/* Stats */}
              <div className="grid grid-cols-2 border-r border-white/5">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                    className={`flex flex-col items-center justify-center p-6 gap-1 ${i % 2 === 0 ? 'border-r border-white/5' : ''} ${i < 2 ? 'border-b border-white/5' : ''}`}
                  >
                    <AnimatedCounter value={stat.value} delay={i * 120} />
                    <span className="font-code text-[9px] uppercase tracking-[0.2em] text-slate-400 text-center">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Country flags */}
              <div className="grid grid-cols-2">
                {countries.map((country, i) => (
                  <div
                    key={country.name}
                    className={`group flex items-center gap-3 p-5 hover:bg-white/[0.03] transition-colors ${i % 2 === 0 ? 'border-r border-white/5' : ''
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
