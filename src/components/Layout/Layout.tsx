import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Menu, X, ArrowRight, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageTransitionWrapper } from "@/components/LanguageTransitionWrapper";

// blogData agora é carregado dinamicamente no componente

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/content/blog.json')
      .then(res => res.json())
      .then(data => {
        const postsArray = Object.entries(data).flatMap(([lang, posts]: [string, any]) => {
          return posts.map((post: any) => ({
            id: post.id,
            lang,
            title: post.title,
            category: post.category,
            desc: post.desc || post.summary || ""
          }));
        });
        setAllPosts(postsArray);
      })
      .catch(err => console.error("Erro ao carregar blog.json no Layout:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredResults = searchQuery.trim().length > 1 
    ? allPosts.filter(post => 
        post.lang === (i18n.language || 'pt') && 
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         post.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <LanguageTransitionWrapper animationType="fade-slide">
      <div className="min-h-screen bg-background text-foreground">
        <header className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
          scrolled ? "h-16 bg-background/95 backdrop-blur-3xl" : "h-20 bg-background/80 backdrop-blur-2xl"
        }`}>
          <div className="container flex h-full items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 transition hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10">
                <span className="font-code text-sm font-bold text-[#00D9FF]">ᛞ</span>
              </div>
              <span className="font-heading font-bold text-foreground">Dagaz.Dev</span>
              <span className="font-code text-[9px] uppercase tracking-[0.24em] text-[#D4AF37]">#CodandoComoVikings</span>
            </Link>

            <nav className="hidden items-center gap-7 font-code text-xs uppercase tracking-[0.18em] text-muted-foreground lg:flex">
              <a className="transition hover:text-[#00D9FF]" href="/#sobre">{t("nav.sobre")}</a>
              <a className="transition hover:text-[#00D9FF]" href="/#servicos">{t("nav.servicos")}</a>
              <Link className="transition hover:text-[#00D9FF]" to="/blog">{t("nav.insights")}</Link>
              <Link className="transition hover:text-[#00D9FF]" to="/contato">{t("nav.contato") || "Contato"}</Link>
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="hidden items-center gap-2 border border-cyan-200/25 px-4 py-2 font-code text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-100 transition hover:bg-cyan-300/10 sm:flex">
                <Search className="h-4 w-4" /> {t("nav.busca")}
              </button>
              <ThemeToggle />
              <LanguageSwitcher />
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="flex items-center gap-2 lg:hidden"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-white/10 bg-background p-4 lg:hidden">
              <div className="container grid gap-3 font-code text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {[
                  { label: t("nav.sobre"), href: "/#sobre", isLink: false },
                  { label: t("nav.servicos"), href: "/#servicos", isLink: false },
                  { label: t("nav.insights"), href: "/blog", isLink: true },
                  { label: t("nav.contato") || "Contato", href: "/contato", isLink: true },
                ].map(({ label, href, isLink }) => (
                  isLink ? (
                    <Link key={label} to={href} onClick={() => setMenuOpen(false)} className="border border-white/8 p-3 transition hover:border-cyan-300/30 hover:text-[#00D9FF]">{label}</Link>
                  ) : (
                    <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border border-white/8 p-3 transition hover:border-cyan-300/30 hover:text-[#00D9FF]">{label}</a>
                  )
                ))}
                <button onClick={() => { setSearchOpen(true); setMenuOpen(false); }} className="border border-cyan-200/25 p-3 text-left text-cyan-100">{t("nav.busca")}</button>
              </div>
            </div>
          )}
        </header>

        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-20 backdrop-blur-md">
            <div className="w-full max-w-2xl px-4">
              <div className="overflow-hidden border border-cyan-300/30 bg-background shadow-2xl shadow-cyan-500/20">
                <form onSubmit={handleSearch} className="relative border-b border-white/10 p-6">
                  <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400/50" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder={t("nav.busca")} 
                    className="w-full bg-transparent pl-10 font-code text-lg text-foreground placeholder-slate-500 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                   <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                    aria-label="Fechar busca"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </form>

                {searchQuery.trim().length > 1 && (
                  <div className="max-h-[60vh] overflow-y-auto p-4">
                    <p className="mb-4 font-code text-[10px] uppercase tracking-widest text-[#D4AF37]">Resultados da Forja</p>
                    {filteredResults.length > 0 ? (
                      <div className="grid gap-2">
                        {filteredResults.map(post => (
                          <Link 
                            key={post.id} 
                            to={`/artigo/${post.id}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                            className="group flex items-start gap-4 border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/5"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5">
                              <FileText className="h-5 w-5 text-slate-400 group-hover:text-cyan-400 transition" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="font-code text-[9px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400/70">{post.category}</span>
                                <h3 className="font-heading font-bold text-foreground group-hover:text-cyan-600 transition">{post.title}</h3>
                              </div>
                              <p className="mt-1 line-clamp-1 text-xs text-slate-400">{post.desc}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 self-center text-slate-600 group-hover:text-cyan-400 transition" />
                          </Link>
                        ))}
                        <Link 
                          to={`/blog?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                          className="mt-2 block py-2 text-center font-code text-[10px] uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition"
                        >
                          Ver todos os resultados no blog &rarr;
                        </Link>
                      </div>
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-sm text-slate-500 italic">Nenhum pergaminho encontrado para "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
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
                  <li><Link to="/privacidade" className="transition hover:text-[#00D9FF]">Privacidade</Link></li>
                  <li><Link to="/termos" className="transition hover:text-[#00D9FF]">Termos</Link></li>
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
