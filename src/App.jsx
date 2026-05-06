import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Lazy loading das páginas para melhor performance
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Componente de loading simples para o Suspense
const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-300 border-t-transparent"></div>
  </div>
);

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

import SEO from './components/SEO';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <ErrorBoundary>
      <CookieConsentProvider>
        <LanguageProvider>
          <ThemeProvider defaultTheme="dark" switchable={true}>
            <TooltipProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/artigo/:id" element={<Article />} />
                      <Route path="/sobre" element={
                        <div className="container" style={{marginTop: '2rem'}}>
                          <SEO title="O Mentor" description="Conheça a jornada de Caio Dagaz, arquiteto SAP e mentor." url="/sobre" />
                          <h1>O Mentor</h1>
                          <p>Em construção...</p>
                        </div>
                      } />
                      <Route path="/contato" element={<Contact />} />
                      <Route path="/privacidade" element={<PrivacyPolicy />} />
                      <Route path="/termos" element={<TermsOfService />} />
                      <Route path="*" element={
                        <div className="container" style={{marginTop: '2rem'}}>
                          <SEO title="404 - Não Encontrado" description="Página não encontrada no portal Dagaz.Dev." />
                          <h1>404 - Fora do mapa, guerreiro!</h1>
                        </div>
                      } />
                    </Routes>
                  </Suspense>
                </Layout>
              </BrowserRouter>
              <WhatsAppButton phoneNumber="5511999999999" />
              <CookieConsentBanner />
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </CookieConsentProvider>
    </ErrorBoundary>
  );
}

export default App;
