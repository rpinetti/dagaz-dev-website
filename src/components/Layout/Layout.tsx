import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LanguageTransitionWrapper } from "@/components/LanguageTransitionWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <LanguageTransitionWrapper animationType="fade-slide">
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06101b]/80 backdrop-blur-2xl">
          <div className="container flex h-20 items-center justify-between">
            <a href="/" className="inline-flex items-center gap-2 transition hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10">
                <span className="font-code text-sm font-bold text-[#00D9FF]">ᛞ</span>
              </div>
              <span className="font-heading font-bold text-white">Dagaz.Dev</span>
              <span className="font-code text-[9px] uppercase tracking-[0.24em] text-[#D4AF37]">#CodandoComoVikings</span>
            </a>

            <nav className="hidden items-center gap-7 font-code text-xs uppercase tracking-[0.18em] text-slate-300 lg:flex">
              <a className="transition hover:text-[#00D9FF]" href="/#sobre">{t("nav.sobre")}</a>
              <a className="transition hover:text-[#00D9FF]" href="/#servicos">{t("nav.servicos")}</a>
              <a className="transition hover:text-[#00D9FF]" href="/blog">{t("nav.insights")}</a>
              <a className="transition hover:text-[#00D9FF]" href="/contato">{t("nav.investidores")}</a>
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="hidden items-center gap-2 border border-cyan-200/25 px-4 py-2 font-code text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/10 sm:flex">
                <Search className="h-4 w-4" /> {t("nav.busca")}
              </button>
              <LanguageSwitcher />
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 lg:hidden">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-white/10 bg-[#06101b] p-4 lg:hidden">
              <div className="container grid gap-3 font-code text-xs uppercase tracking-[0.18em] text-slate-300">
                {[
                  [t("nav.sobre"), "/#sobre"],
                  [t("nav.servicos"), "/#servicos"],
                  [t("nav.insights"), "/blog"],
                  [t("nav.investidores"), "/contato"],
                ].map(([label, href]) => (
                  <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border border-white/8 p-3 transition hover:border-cyan-300/30 hover:text-[#00D9FF]">{label}</a>
                ))}
                <button onClick={() => { setSearchOpen(true); setMenuOpen(false); }} className="border border-cyan-200/25 p-3 text-left text-cyan-100">{t("nav.busca")}</button>
              </div>
            </div>
          )}
        </header>

        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 backdrop-blur-sm">
            <div className="w-full max-w-2xl">
              <div className="relative border border-cyan-300/30 bg-[#06101b] p-6">
                <input type="text" placeholder={t("nav.busca")} className="w-full bg-transparent font-code text-sm text-white placeholder-slate-500 outline-none" />
                <button onClick={() => setSearchOpen(false)} className="absolute right-4 top-4"><X className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
        )}

        <main>
          {children}
        </main>

        <footer className="border-t border-white/10 bg-[#050b12] py-12 md:py-16">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-4">
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10">
                  <span className="font-code text-sm font-bold text-[#00D9FF]">ᛞ</span>
                </div>
                <p className="mt-4 font-code text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">#CodandoComoVikings</p>
                <p className="mt-2 text-sm text-slate-400">O amanhecer da clareza em meio à complexidade do código.</p>
              </div>
              <div>
                <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Navegação</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li><a href="/#sobre" className="transition hover:text-[#00D9FF]">{t("nav.sobre")}</a></li>
                  <li><a href="/#servicos" className="transition hover:text-[#00D9FF]">{t("nav.servicos")}</a></li>
                  <li><a href="/blog" className="transition hover:text-[#00D9FF]">{t("nav.insights")}</a></li>
                </ul>
              </div>
              <div>
                <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Contato</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li><a href="mailto:hello@dagaz.dev" className="transition hover:text-[#00D9FF]">hello@dagaz.dev</a></li>
                  <li><a href="tel:+5511999999999" className="transition hover:text-[#00D9FF]">+55 (11) 9999-9999</a></li>
                </ul>
              </div>
              <div>
                <p className="font-code text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Legal</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li><a href="/privacidade" className="transition hover:text-[#00D9FF]">Privacidade</a></li>
                  <li><a href="/termos" className="transition hover:text-[#00D9FF]">Termos</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-center font-code text-[10px] uppercase tracking-[0.2em] text-slate-500">© 2026 Dagaz Dev. Todos os direitos reservados. ᛞ</p>
            </div>
          </div>
        </footer>
      </div>
    </LanguageTransitionWrapper>
  );
}
