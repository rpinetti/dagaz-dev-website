import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Componente de captura de Newsletter.
 * Inclui animações e suporte a internacionalização.
 */
export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aqui você integraria com Mailchimp, SendGrid, etc.
      console.log('Subscribing:', email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-50" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-300/10 bg-white/[0.02] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10">
                <Mail className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="mt-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
                {subscribed ? "Bem-vindo à Alcateia!" : "Assine o Insight Dagaz"}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {subscribed 
                  ? "Sua jornada rumo à clareza SAP começou. Você receberá nossos pergaminhos em breve." 
                  : "Receba estratégias SAP, novidades sobre BTP e Clean Code diretamente no seu e-mail."
                }
              </p>
            </div>

            <div className="relative">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-xl bg-cyan-400/5 p-8 text-center border border-cyan-400/20"
                >
                  <CheckCircle2 className="h-12 w-12 text-cyan-400" />
                  <p className="mt-4 font-heading font-bold text-foreground uppercase tracking-wider">Inscrição Confirmada!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com"
                      className="w-full rounded-lg border border-border bg-card/50 py-4 pl-12 pr-4 text-foreground placeholder-slate-500 outline-none transition focus:border-primary/50 focus:bg-card"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-[#071423] transition hover:bg-cyan-300"
                  >
                    Assinar <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-slate-600 md:text-left">
                Prometemos: zero spam, apenas expertise técnica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
