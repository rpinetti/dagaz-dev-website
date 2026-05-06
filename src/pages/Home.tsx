/*
 * Filosofia visual: Runic Cyber-Forge.
 * Esta página deve parecer uma forja digital nórdica para transformação SAP: hero escuro,
 * runas como circuitos, cards chanfrados, acentos glacial cyan/viking gold e narrativa B2B.
 * Agora com suporte completo a internacionalização (PT, EN, ES).
 */
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LanguageTransitionWrapper } from "@/components/LanguageTransitionWrapper";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Download,
  FileText,
  Flame,
  Gem,
  Globe2,
  Landmark,
  Layers3,
  LineChart,
  Mail,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { faqDataPT, faqDataEN, faqDataES } from "@/data/faqData";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ReadingTime } from "@/components/ReadingTime";
import { ShareButtons } from "@/components/ShareButtons";
import { Newsletter } from "@/components/Newsletter";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import testimonialsData from "@/data/testimonials.json";

const heroImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-hero-cyber-forge-8PDWLYRFL4xH3A669uxTVa.webp";
const runeSeal = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-rune-seal-XErBXwLt334kDk7sbfa43q.webp";
const servicesImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-services-forge-panels-DzReZnaaEjcPVgNkoqTJkA.webp";
const insightsImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-insights-editorial-Zpdxpe4MKtf2JAEDbSqKEX.webp";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-code text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">{children}</p>;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();

  // Estados para dados dinâmicos
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [currentTestimonials, setCurrentTestimonials] = useState<any[]>([]);

  // Carrega Testemunhos de forma segura
  useEffect(() => {
    try {
      const dataObj: any = (testimonialsData as any)?.default || testimonialsData;
      if (dataObj && typeof dataObj === 'object') {
        const currentLang = String(language || 'pt');
        const langData = dataObj[currentLang] || dataObj['pt'] || [];
        if (Array.isArray(langData)) {
          const sorted = [...langData].sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));
          setCurrentTestimonials(sorted);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar testemunhos:", err);
    }
  }, [language]);

  // Carrega Posts do Blog de forma segura
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/content/blog.json');
        if (!res.ok) throw new Error("Falha no fetch");
        const data = await res.json();

        if (data && typeof data === 'object') {
          const postsArray: any[] = [];
          Object.entries(data).forEach(([lang, posts]) => {
            if (Array.isArray(posts)) {
              posts.forEach((post: any) => {
                if (post) postsArray.push({ ...post, lang });
              });
            }
          });

          postsArray.sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          });

          setAllPosts(postsArray);
        }
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    loadPosts();
  }, []);

  const philosophyCards = useMemo(() => [
    {
      icon: Sparkles,
      title: t("about.philosophy.clarity.title"),
      text: t("about.philosophy.clarity.description"),
    },
    {
      icon: Zap,
      title: t("about.philosophy.transformation.title"),
      text: t("about.philosophy.transformation.description"),
    },
    {
      icon: Target,
      title: t("about.philosophy.breakthrough.title"),
      text: t("about.philosophy.breakthrough.description"),
    },
  ], [t]);

  const services = useMemo(() => [
    {
      icon: Cpu,
      title: t("services.items.strategy.title"),
      text: t("services.items.strategy.description"),
      tags: ["S/4HANA", "BTP", t("services.items.integration.title")],
    },
    {
      icon: Code2,
      title: t("services.items.development.title"),
      text: t("services.items.development.description"),
      tags: ["ABAP", "Fiori", "Clean Code"],
    },
    {
      icon: Layers3,
      title: t("services.items.integration.title"),
      text: t("services.items.integration.description"),
      tags: ["APIs", t("services.items.integration.title"), "Governança"],
    },
    {
      icon: ShieldCheck,
      title: t("services.items.consulting.title"),
      text: t("services.items.consulting.description"),
      tags: ["QA", "DevOps", "Performance"],
    },
  ], [t]);

  const latestPosts = useMemo(() => {
    const currentLang = i18n?.language || 'pt';
    return allPosts
      .filter((post: any) => post && post.lang === currentLang)
      .slice(0, 2);
  }, [i18n?.language, allPosts]);

  return (
    <>
      <SEO
        title={t("hero.title")}
        description={t("hero.description")}
        url="/"
      />
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={heroImage}
            alt="Hero"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="container relative z-10 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1.5 font-code text-[11px] uppercase tracking-[0.28em] text-[#f3d76b]">
              <Flame className="h-4 w-4" /> {t("hero.badge")}
            </div>
            <h1 className="font-heading text-5xl font-extrabold leading-tight text-foreground md:text-7xl">{t("hero.title")}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t("hero.description")}</p>
            <Link to="/contato" className="mt-8 inline-block bg-[#D4AF37] px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#071423] transition hover:bg-[#f0ce61]">
              {t("hero.cta")}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="runic-panel p-8"
          >
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
              <OptimizedImage
                src={runeSeal}
                alt="Runa Dagaz"
                className="h-32 w-32 object-contain"
                loading="eager"
                fetchPriority="high"
              />
              <p className="font-code text-[10px] uppercase tracking-[0.24em] text-muted-foreground/80">{t("hero.sealLabel")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-slate-900/30 py-24" id="sobre">
        <div className="container">
          <div className="mb-16 text-center">
            <SectionLabel>{t("about.label")}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">{t("about.title")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{t("about.description")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {philosophyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="runic-panel group p-8 transition hover:-translate-y-2 hover:border-cyan-300/40"
              >
                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] transition group-hover:bg-[#D4AF37] group-hover:text-[#071423]">
                    <card.icon size={24} />
                  </div>
                  <h3 className="mb-4 font-heading text-xl font-bold text-foreground">{card.title}</h3>
                  <p className="leading-7 text-muted-foreground">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24" id="servicos">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionLabel>{t("services.label")}</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">{t("services.title")}</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{t("services.description")}</p>

              <div className="mt-10 overflow-hidden border border-white/10 bg-slate-900/50 p-1">
                <OptimizedImage src={servicesImage} alt="Forge Panels" className="w-full opacity-60 grayscale transition hover:grayscale-0" />
              </div>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="runic-panel p-6"
                >
                  <div className="relative z-10">
                    <service.icon className="mb-4 h-8 w-8 text-[#00D9FF]" />
                    <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{service.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map(tag => (
                        <span key={tag} className="border border-white/10 bg-white/5 px-2 py-0.5 font-code text-[9px] uppercase tracking-wider text-[#00D9FF]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {currentTestimonials.length > 0 && (
        <section className="bg-slate-900/30 py-24">
          <div className="container">
            <div className="mb-16 text-center">
              <SectionLabel>Alianças Estratégicas</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">{t("testimonials.title")}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {(currentTestimonials || []).map((t: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="runic-panel p-8 italic"
                >
                  <div className="relative z-10">
                    <Quote className="mb-4 h-8 w-8 text-[#D4AF37]/40" />
                    <p className="mb-6 leading-7 text-muted-foreground">"{t?.quote || ''}"</p>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="h-10 w-10 border border-cyan-300/30 bg-cyan-300/10 flex items-center justify-center">
                        <span className="font-code text-[#00D9FF]">{t?.author ? t.author[0] : 'ᛞ'}</span>
                      </div>
                      <div>
                        <p className="font-heading text-sm font-bold text-foreground">{t?.author || 'Anônimo'}</p>
                        <p className="font-code text-[10px] uppercase tracking-wider text-slate-500">{t?.role || ''}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog/Insights Section */}
      <section className="py-24" id="insights">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
          >
            <div>
              <SectionLabel>{t("blog.label")}</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">{t("blog.title")}</h2>
            </div>
            <p className="max-w-md text-muted-foreground">{t("blog.description")}</p>
          </motion.div>
          {loadingPosts ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {(latestPosts || []).map((post: any, i: number) => (
                <motion.article
                  key={post?.id || i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group runic-panel p-6 transition hover:-translate-y-1 hover:border-cyan-300/40"
                >
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3 font-code text-[10px] uppercase tracking-[0.2em]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[#00D9FF]">{post?.category || 'SAP'}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-[#D4AF37]">{post?.author || 'Dagaz'}</span>
                      </div>
                      <ReadingTime minutes={post?.readingTime || '0'} showIcon={true} />
                    </div>
                    <h3 className="mt-4 font-heading text-2xl font-bold text-foreground transition group-hover:text-cyan-100">{post?.title || ''}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground">{post?.summary || ''}</p>
                    <div className="mt-6 flex flex-col gap-4">
                      <Link to={`/artigo/${post?.id || ''}`} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#00D9FF]">
                        {t("blog.readMore")} <ChevronRight className="h-4 w-4" />
                      </Link>
                      <ShareButtons title={post?.title || ''} url={`https://dagaz.dev/artigo/${post?.id || ''}`} text={post?.summary || ''} showLabels={false} className="border-t border-slate-700 pt-4" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* FAQ Section */}
      <section className="bg-slate-900/30 py-24">
        <div className="container max-w-4xl">
          <div className="mb-16 text-center">
            <SectionLabel>Conhecimento</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">Dúvidas Frequentes</h2>
          </div>
          <FAQAccordion items={language === 'es' ? faqDataES : language === 'en' ? faqDataEN : faqDataPT} />
        </div>
      </section>
    </>
  );
}
