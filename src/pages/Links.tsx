import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Instagram, Linkedin, Github, Globe, ArrowRight, Download, BookOpen } from 'lucide-react';
import SEO from '@/components/SEO';
import { wpService } from '@/services/wpService';

const links = [
  {
    title: 'Visite nosso Site Oficial',
    url: '/',
    icon: Globe,
    primary: true
  },
  {
    title: 'LinkedIn: Conecte-se conosco',
    url: 'https://www.linkedin.com/company/dagaz-dev',
    icon: Linkedin,
    primary: false
  },
  {
    title: 'Instagram: Acompanhe a Forja',
    url: 'https://instagram.com/dagaz.dev',
    icon: Instagram,
    primary: false
  },
  {
    title: 'GitHub: Nossos Repositórios',
    url: 'https://github.com/dagaz-dev',
    icon: Github,
    primary: false
  }
];

export default function Links() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const result = await wpService.submitLead(email, 'links_page');
    
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050b12] text-foreground flex flex-col items-center py-12 px-4 relative overflow-hidden">
      <SEO 
        title="Links Oficiais | Dagaz.Dev" 
        description="Acesse nossos links oficiais, baixe o guia S/4HANA e conecte-se com a Dagaz.Dev." 
        url="/links" 
      />
      
      {/* Background Particles/Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050b12] to-[#050b12] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 flex flex-col items-center"
      >
        {/* Avatar / Logo */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_30px_rgba(0,217,255,0.15)]">
          <span className="font-code text-4xl font-bold text-[#00D9FF]">ᛞ</span>
        </div>
        
        <h1 className="font-heading text-2xl font-bold text-white mb-2">@dagaz.dev</h1>
        <p className="font-code text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] mb-8 text-center">
          #CodandoComoVikings
        </p>

        {/* Lead Magnet Panel */}
        <div className="w-full runic-panel p-6 mb-8 border-cyan-300/30 bg-background/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-[#00D9FF]" />
            <h2 className="font-heading font-bold text-cyan-100 text-lg">Guia S/4HANA</h2>
          </div>
          
          {status === 'success' ? (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="text-center py-4"
             >
               <p className="text-sm text-cyan-300 mb-2">Pergaminho enviado!</p>
               <p className="text-xs text-muted-foreground">Verifique sua caixa de entrada para baixar o PDF.</p>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground mb-2">Baixe agora as 5 estratégias essenciais para migração SAP.</p>
              <input 
                type="email" 
                required
                placeholder="Seu e-mail corporativo"
                className="w-full rounded border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#00D9FF] px-4 py-3 font-heading text-xs font-bold uppercase tracking-widest text-[#071423] transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {status === 'loading' ? 'Forjando...' : 'Receber E-book'} <Download className="h-4 w-4" />
              </button>
              {status === 'error' && <p className="text-[10px] text-red-400 mt-1 text-center">Erro ao conectar com a forja. Tente novamente.</p>}
            </form>
          )}
        </div>

        {/* Links List */}
        <div className="w-full flex flex-col gap-4">
          {links.map((link, idx) => (
            <motion.a
              key={link.title}
              href={link.url}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx + 1) }}
              className={`group flex items-center justify-between p-4 runic-panel transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] ${
                link.primary ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon className={`h-5 w-5 ${link.primary ? 'text-[#D4AF37]' : 'text-slate-400 group-hover:text-white transition'}`} />
                <span className={`font-heading text-sm font-semibold ${link.primary ? 'text-[#D4AF37]' : 'text-slate-300 group-hover:text-white transition'}`}>
                  {link.title}
                </span>
              </div>
              <ArrowRight className={`h-4 w-4 ${link.primary ? 'text-[#D4AF37]' : 'text-slate-500 group-hover:text-white transition'}`} />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-12 font-code text-[9px] uppercase tracking-widest text-slate-600">
          © {new Date().getFullYear()} Dagaz Dev
        </p>
      </motion.div>
    </div>
  );
}
