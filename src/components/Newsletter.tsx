import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Send, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { wpService } from '@/services/wpService';

const FREE_DOMAINS = [
  'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com',
  'aol.com', 'icloud.com', 'zoho.com', 'protonmail.com', 'gmx.com',
  'yandex.com', 'mail.com', 'uol.com.br', 'bol.com.br', 'terra.com.br'
];

/**
 * Componente de captura de Leads (E-book).
 * Inclui animações e suporte a internacionalização.
 */
export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isFreeDomain, setIsFreeDomain] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const parts = val.split('@');
    if (parts.length > 1) {
      const domain = parts[1].toLowerCase();
      setIsFreeDomain(FREE_DOMAINS.some(d => domain.endsWith(d)));
    } else {
      setIsFreeDomain(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      const result = await wpService.submitLead(email, 'home_newsletter');
      
      if (result.success) {
        setSubscribed(true);
        setEmail('');
        setIsFreeDomain(false);
        toast.success('Sucesso! Guia enviado para o seu e-mail.');
      } else {
        toast.error('Erro ao enviar e-mail. Tente novamente.');
      }
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-50" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#D4AF37]/20 bg-white/[0.02] p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                <BookOpen className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h2 className="mt-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
                {subscribed ? "Guia Desbloqueado!" : "Baixe o Guia Definitivo S/4HANA"}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {subscribed 
                  ? "Sua jornada rumo à clareza SAP começou. Enviamos o link de download para o seu e-mail." 
                  : "Descubra as 5 estratégias essenciais para uma migração S/4HANA sem riscos e com foco em performance."
                }
              </p>
            </div>

            <div className="relative">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-xl bg-[#D4AF37]/10 p-8 text-center border border-[#D4AF37]/30"
                >
                  <Download className="h-12 w-12 text-[#D4AF37] animate-bounce" />
                  <p className="mt-4 font-heading font-bold text-foreground uppercase tracking-wider">Verifique sua caixa de entrada</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <BookOpen className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com corporativo"
                      className="w-full rounded-lg border border-border bg-card/50 py-4 pl-12 pr-4 text-foreground placeholder-slate-500 outline-none transition focus:border-[#D4AF37]/50 focus:bg-card"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      disabled={loading}
                    />
                    {isFreeDomain && (
                      <p className="mt-1.5 text-yellow-500/80 font-code text-[9px] uppercase tracking-wider text-left">
                        Recomendamos usar seu e-mail corporativo.
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-[#071423] transition hover:bg-[#f0ce61] disabled:opacity-50"
                  >
                    {loading ? 'Forjando...' : 'Baixar'} <Download className="h-4 w-4" />
                  </button>
                </form>
              )}
              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-slate-500 md:text-left">
                Prometemos: zero spam, apenas expertise técnica de alto nível.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
