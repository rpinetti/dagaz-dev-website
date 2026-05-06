/*
 * Filosofia visual: Runic Cyber-Forge.
 * Esta página deve parecer uma forja digital nórdica para transformação SAP: hero escuro,
 * runas como circuitos, cards chanfrados, acentos glacial cyan/viking gold e narrativa B2B.
 * Agora com suporte completo a internacionalização (PT, EN, ES).
 */
import { useMemo, useState } from "react";
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
import { FAQAccordion } from "@/components/FAQAccordion";
import { ReadingTime } from "@/components/ReadingTime";
import { ShareButtons } from "@/components/ShareButtons";
import { faqDataPT, faqDataEN, faqDataES } from "@/data/faqData";
import { useLanguage } from "@/contexts/LanguageContext";

const heroImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-hero-cyber-forge-8PDWLYRFL4xH3A669uxTVa.webp";
const runeSeal = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-rune-seal-XErBXwLt334kDk7sbfa43q.webp";
const servicesImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-services-forge-panels-DzReZnaaEjcPVgNkoqTJkA.webp";
const insightsImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663628243590/XyUenGTrKRhDXVbbUSRY3m/dagaz-insights-editorial-Zpdxpe4MKtf2JAEDbSqKEX.webp";

const sectors = [
  "Varejo omnichannel",
  "Indústria e manufatura",
  "Energia e utilities",
  "Serviços financeiros",
  "Agronegócio",
  "Logística e supply chain",
  "Saúde e life sciences",
  "Tecnologia B2B",
];

// Carrega posts reais para a Home
const mdxFiles = import.meta.glob('/src/content/blog/**/*.mdx', { eager: true });
const testimonialFiles = import.meta.glob('/src/content/testimonials/**/*.mdx', { eager: true });

const allPosts = Object.entries(mdxFiles).map(([path, module]: [string, any]) => {
  const pathParts = path.split('/');
  const fileName = pathParts.pop() || '';
  const lang = pathParts.pop() || '';
  return {
    id: fileName.replace('.mdx', ''),
    lang,
    title: module.frontmatter?.title || 'Título Indefinido',
    date: module.frontmatter?.date || '2026-04-28',
    author: module.frontmatter?.author || 'Caio Dagaz',
    category: module.frontmatter?.category || 'SAP',
    summary: module.frontmatter?.desc || module.frontmatter?.description || '',
    content: module.default?.toString() || "" // Para cálculo de tempo de leitura
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-code text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">{children}</p>;
}

export default function Home() {
  const { t, i18n } = useTranslation(); // i18n necessário para filtragem de posts
  const { language } = useLanguage();

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

  const allTestimonials = useMemo(() => {
    return Object.entries(testimonialFiles).map(([path, module]: [string, any]) => {
      const parts = path.split('/');
      const lang = parts[parts.length - 2];
      const frontmatter = module.frontmatter || {};
      return {
        quote: frontmatter.quote,
        author: frontmatter.author,
        role: frontmatter.role,
        order: frontmatter.order || 99,
        lang
      };
    });
  }, []);

  const currentTestimonials = useMemo(() => {
    const currentLang = i18n.language || 'pt';
    return allTestimonials
      .filter(t => t.lang === currentLang)
      .sort((a, b) => a.order - b.order);
  }, [allTestimonials, i18n.language]);

  const latestPosts = useMemo(() => {
    const currentLang = i18n.language || 'pt';
    return allPosts
      .filter(post => post.lang === currentLang)
      .slice(0, 2);
  }, [i18n.language]);

return (
  <>
    <SEO
      title={t("hero.title")}
      description={t("hero.description")}
      url="/"
    />
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 opacity-40"><img src={heroImage} alt="Hero" className="h-full w-full object-cover" /></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050b12] via-[#06101b]/90 to-[#06101b]/60" />
      <div className="container relative z-10 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1.5 font-code text-[11px] uppercase tracking-[0.28em] text-[#f3d76b]">
            <Flame className="h-4 w-4" /> {t("hero.badge")}
          </div>
          <h1 className="font-heading text-5xl font-extrabold leading-tight text-white md:text-7xl">{t("hero.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t("hero.description")}</p>
          <button className="mt-8 bg-[#D4AF37] px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#071423] transition hover:bg-[#f0ce61]">{t("hero.cta")}</button>
        </div>
        <div className="runic-panel p-8">
          <div className="relative z-10 flex flex-col items-center justify-center gap-6">
            <img src={runeSeal} alt="Runa Dagaz" className="h-32 w-32 object-contain" />
            <p className="font-code text-[10px] uppercase tracking-[0.24em] text-slate-400">{t("hero.sealLabel")}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container">
        <SectionLabel>{t("industries.title")}</SectionLabel>
        <h2 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl">{t("industries.description")}</h2>
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => (
            <div key={sector} className="border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/5">
              <p className="font-code text-sm text-slate-300">{sector}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="sobre" className="py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>{t("about.label")}</SectionLabel>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-6xl">{t("about.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">{t("about.description")}</p>
          </div>
          <div className="grid gap-5">
            {philosophyCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="runic-panel p-6">
                  <div className="relative z-10">
                    <Icon className="h-8 w-8 text-[#00D9FF]" />
                    <h3 className="mt-5 font-heading text-2xl font-bold text-white">{card.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{card.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <section id="servicos" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 opacity-20"><img src={servicesImage} alt="Serviços" className="h-full w-full object-cover" /></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#06101b]/95 to-[#06101b]/70" />
      <div className="container relative z-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <SectionLabel>{t("services.label")}</SectionLabel>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-6xl">{t("services.title")}</h2>
          </div>
          <p className="text-lg leading-8 text-slate-300">{t("services.description")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="runic-panel p-6 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <div className="relative z-10">
                  <Icon className="h-8 w-8 text-[#00D9FF]" />
                  <h3 className="mt-5 font-heading text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{service.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="border border-cyan-300/25 bg-cyan-300/8 px-3 py-1 font-code text-[10px] uppercase tracking-[0.2em] text-cyan-100">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionLabel>{t("contactSection.label")}</SectionLabel>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl">{t("contactSection.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">{t("contactSection.description")}</p>
            <div className="mt-10 space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10 flex-shrink-0">
                  <span className="font-code text-sm font-bold text-[#00D9FF]">✓</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-white">{t("contactSection.features.quickResponse.title")}</p>
                  <p className="text-sm text-slate-400">{t("contactSection.features.quickResponse.description")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10 flex-shrink-0">
                  <span className="font-code text-sm font-bold text-[#00D9FF]">✓</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-white">{t("contactSection.features.freeConsultation.title")}</p>
                  <p className="text-sm text-slate-400">{t("contactSection.features.freeConsultation.description")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-cyan-300/40 bg-cyan-300/10 flex-shrink-0">
                  <span className="font-code text-sm font-bold text-[#00D9FF]">✓</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-white">{t("contactSection.features.dedicatedExperts.title")}</p>
                  <p className="text-sm text-slate-400">{t("contactSection.features.dedicatedExperts.description")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="runic-panel p-8">
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <LanguageTransitionWrapper>
          <FAQAccordion
            items={language === 'pt' ? faqDataPT : language === 'en' ? faqDataEN : faqDataES}
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
          />
        </LanguageTransitionWrapper>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <SectionLabel>{t("testimonials.title")}</SectionLabel>
        <h2 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-6xl">{t("testimonials.description")}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {currentTestimonials.map((testimonial, idx) => (
            <article key={testimonial.author + idx} className="runic-panel p-6">
              <div className="relative z-10">
                <Quote className="h-6 w-6 text-[#D4AF37]" />
                <p className="mt-5 leading-8 text-slate-200">"{testimonial.quote}"</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-heading font-bold text-white">{testimonial.author}</p>
                  <p className="font-code text-[10px] uppercase tracking-[0.2em] text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SectionLabel>{t("blog.label")}</SectionLabel>
            <h2 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-6xl">{t("blog.title")}</h2>
          </div>
          <p className="max-w-md text-slate-300">{t("blog.description")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {latestPosts.map((post) => (
            <article key={post.id} className="group runic-panel p-6 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 font-code text-[10px] uppercase tracking-[0.2em]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[#00D9FF]">{post.category}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[#D4AF37]">{post.author}</span>
                  </div>
                  <ReadingTime minutes={post.readingTime} showIcon={true} />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-bold text-white transition group-hover:text-cyan-100">{post.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{post.summary}</p>
                <div className="mt-6 flex flex-col gap-4">
                  <Link to={`/artigo/${post.id}`} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#00D9FF]">
                    {t("blog.readMore")} <ChevronRight className="h-4 w-4" />
                  </Link>
                  <ShareButtons title={post.title} url={`https://dagaz.dev/artigo/${post.id}`} text={post.summary} showLabels={false} className="border-t border-slate-700 pt-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <SectionLabel>{t("investors.label")}</SectionLabel>
                <h2 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-6xl">{t("investors.title")}</h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">{t("investors.description")}</p>
                <a href="/investidores" className="mt-7 inline-flex items-center gap-2 border border-cyan-200/30 px-5 py-3 font-heading text-sm font-bold uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-300/10">
                  {t("investors.openCenter")} <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { Icon: Landmark, label: t("investors.categories.governance") },
                    { Icon: LineChart, label: t("investors.categories.indicators") },
                    { Icon: FileText, label: t("investors.categories.reports") },
                    { Icon: Globe2, label: t("investors.categories.market") },
                  ].map(({ Icon, label }) => (
                      <div key={label} className="border border-white/10 bg-white/[0.035] p-5">
                        <Icon className="h-6 w-6 text-[#00D9FF]" />
                        <p className="mt-4 font-code text-[10px] uppercase tracking-[0.2em] text-slate-300">{label}</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="runic-panel p-8">
                <div className="relative z-10 flex flex-col gap-6">
                  <div>
                    <p className="font-code text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">{t("investors.latest")}</p>
                    <h3 className="mt-3 font-heading text-2xl font-bold text-white">{t("investors.subtitle")}</h3>
                  </div>
                  <p className="leading-7 text-slate-300">{t("investors.description")}</p>
                  <div className="border-t border-white/10 pt-6">
                    <button className="inline-flex items-center gap-2 bg-[#D4AF37] px-6 py-3 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#071423] transition hover:bg-[#f0ce61]">
                      <Download className="h-4 w-4" /> {t("investors.explore")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> 
        */}
  </>
);
}
