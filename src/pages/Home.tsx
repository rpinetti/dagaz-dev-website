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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cloud,
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
import { wpService } from "@/services/wpService";
import { OptimizedImage } from "@/components/OptimizedImage";
import testimonialsData from "@/data/testimonials.json";

const heroImage = "./image/dagaz-hero-cyber-forge-8PDWLYRFL4xH3A669uxTVa.webp";
const runeSeal = "./image/dagaz-rune-seal-XErBXwLt334kDk7sbfa43q.webp";
const servicesImage = "./image/dagaz-services-forge-panels-DzReZnaaEjcPVgNkoqTJkA.webp";
const insightsImage = "./image/dagaz-insights-editorial-Zpdxpe4MKtf2JAEDbSqKEX.webp";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-code text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">{children}</p>;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dagaz.Dev",
    "alternateName": "Dagaz Dev",
    "description": t("hero.description"),
    "url": "https://dagaz.dev",
    "logo": "https://dagaz.dev/favicon.svg",
    "image": "https://dagaz.dev/image/dagaz-hero-cyber-forge-8PDWLYRFL4xH3A669uxTVa.webp",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressLocality": "São Paulo",
      "addressRegion": "SP"
    },
    "founder": {
      "@type": "Person",
      "name": "Caio Dagaz",
      "jobTitle": "Principal SAP Solutions Architect & Mentor",
      "sameAs": [
        "https://www.linkedin.com/in/caiodagaz"
      ]
    },
    "sameAs": [
      "https://linkedin.com/company/dagaz-dev",
      "https://instagram.com/dagaz.dev"
    ],
    "priceRange": "$$$"
  };

  // Estados para dados dinâmicos
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
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

  // Carrega Posts do WordPress de forma segura
  useEffect(() => {
    const loadPosts = async () => {
      setLoadingPosts(true);
      try {
        const currentLang = i18n?.language || 'pt';
        const data = await wpService.getPosts({
          lang: currentLang,
          per_page: 2
        });
        setLatestPosts(data);
      } catch (err) {
        console.error("Erro ao carregar posts do WordPress:", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    loadPosts();
  }, [i18n?.language]);

  const philosophyCards = useMemo(() => [
    {
      image: "/icons/Explorador.png",
      title: t("about.philosophy.clarity.title"),
      text: t("about.philosophy.clarity.description"),
    },
    {
      image: "/icons/Ferreiro.png",
      title: t("about.philosophy.transformation.title"),
      text: t("about.philosophy.transformation.description"),
    },
    {
      image: "/icons/Berserker.png",
      title: t("about.philosophy.breakthrough.title"),
      text: t("about.philosophy.breakthrough.description"),
    },
    {
      image: "/icons/Jarl.png",
      title: t("about.philosophy.leadership.title"),
      text: t("about.philosophy.leadership.description"),
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


  return (
    <>
      <SEO
        title={t("hero.title")}
        description={t("hero.description")}
        url="/"
        schema={homeSchema}
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

        {/* Partículas Dinâmicas (Fagulhas da Forja) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full blur-[1px] bg-[#00D9FF]"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -Math.random() * 200 - 100],
                x: [0, Math.random() * 40 - 20],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
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
            <h1 className="font-heading text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00D9FF] bg-clip-text text-transparent drop-shadow-sm">
                {t("hero.title")}
              </span>
            </h1>
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="runic-panel group p-8 transition hover:border-cyan-300/40 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
              >
                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-2 transition group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20">
                    <img src={card.image} alt={card.title} className="h-full w-full object-contain drop-shadow-md" />
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
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="runic-panel hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all cursor-pointer flex flex-col h-full"
                >
                  <Dialog>
                    <DialogTrigger className="text-left w-full h-full p-6 focus:outline-none flex-1">
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
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] runic-panel border-cyan-300/30 bg-background/95 backdrop-blur-xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl font-heading text-cyan-100">
                          <service.icon className="h-6 w-6 text-[#00D9FF]" />
                          {service.title}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-4 text-base leading-relaxed">
                          {service.text}
                          <br /><br />
                          Nossos especialistas estão prontos para desenhar a arquitetura ideal e acelerar a jornada digital do seu negócio com as melhores práticas de mercado e foco absoluto em performance e segurança.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 border-t border-white/10 pt-6">
                        <h4 className="font-code text-xs uppercase tracking-widest text-[#D4AF37] mb-4">Tecnologias & Foco</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map(tag => (
                            <span key={tag} className="border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-code text-xs uppercase tracking-wider text-[#00D9FF]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-8">
                          <Link to="/contato" className="inline-flex w-full justify-center items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#071423] bg-[#00D9FF] hover:bg-cyan-300 px-6 py-4 transition">
                            Falar com um Especialista <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Certifications Section */}
      <section className="bg-slate-900/50 py-24 border-y border-white/5 relative">
        <div className="absolute inset-0 grid-forge opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Metrics */}
            <div>
              <SectionLabel>Performance & Impacto</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">A Forja em Números</h2>
              <p className="mt-6 text-muted-foreground">
                Resultados concretos gerados no coração dos sistemas corporativos mais complexos. Não apenas código, mas eficiência operacional.
              </p>
              
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  { value: "+15", label: "Anos de Expertise SAP", desc: "Forjados em grandes corporações e migrações globais." },
                  { value: "+50", label: "Sistemas Modernizados", desc: "Do código legado ao ecossistema moderno em nuvem." },
                  { value: "0", label: "Downtime Crítico", desc: "Garantia absoluta de continuidade operacional." },
                  { value: "100%", label: "Clean Code", desc: "Arquitetura e código limpos, fáceis de manter." }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-white/5 bg-white/[0.01] p-6 hover:border-cyan-500/25 transition"
                  >
                    <p className="font-heading text-4xl font-extrabold text-[#00D9FF]">{stat.value}</p>
                    <p className="mt-2 font-heading text-sm font-bold text-foreground">{stat.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications & Badges */}
            <div className="flex flex-col justify-center">
              <SectionLabel>Autoridade Técnica</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-bold text-foreground">Chancelas e Certificações</h2>
              <p className="mt-6 text-muted-foreground">
                Garantia técnica endossada pelas maiores autoridades globais em tecnologia da informação.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "SAP Certified Associate", desc: "Solutions Architect & ABAP Specialist", icon: Cpu },
                  { title: "AWS Solutions Architect", desc: "Arquitetura de Nuvem e BTP Integration", icon: Cloud },
                  { title: "Scrum Master", desc: "Metodologias ágeis aplicadas ao ecossistema SAP", icon: Target },
                  { title: "Clean ABAP Advocate", desc: "Pioneirismo em código limpo no mercado SAP", icon: Code2 }
                ].map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="runic-panel p-5 flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                      <cert.icon className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-foreground">{cert.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{cert.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                    <p className="mt-3 leading-7 text-muted-foreground">{post?.desc || ''}</p>
                    <div className="mt-6 flex flex-col gap-4">
                      <Link to={`/artigo/${post?.id || ''}`} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#00D9FF]">
                        {t("blog.readMore")} <ChevronRight className="h-4 w-4" />
                      </Link>
                      <ShareButtons title={post?.title || ''} url={`https://dagaz.dev/artigo/${post?.id || ''}`} text={post?.desc || ''} showLabels={false} className="border-t border-slate-700 pt-4" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SLA & Promessa de Aço */}
      <section className="py-24 relative overflow-hidden">
        <div className="container max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="runic-panel p-8 md:p-12 border-cyan-300/30 text-center relative overflow-hidden"
          >
            {/* Glow decorativo */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#00D9FF] opacity-10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-[#D4AF37] opacity-10 blur-3xl" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 mb-6">
              <ShieldCheck className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              A Promessa de Aço: Migração sem Riscos e Sem Downtime
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sabemos que cada minuto inativo custa caro para a sua operação. Nossa abordagem de consultoria foca em arquitetura resiliente e processos blindados, garantindo uma transição para o S/4HANA segura, com transições em background e impacto operacional nulo.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-left border-t border-white/10 pt-8">
              {[
                { title: "Segurança de Dados", desc: "Backup e auditoria em tempo real em todas as etapas." },
                { title: "Monitoramento Ativo", desc: "Observabilidade 360° pré e pós migração." },
                { title: "Continuidade de Negócio", desc: "Operação crítica preservada sob SLA severo." }
              ].map((item, i) => (
                <div key={item.title} className="flex gap-3 max-w-xs">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00D9FF] mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
