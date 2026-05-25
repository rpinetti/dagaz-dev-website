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
const Links = lazy(() => import('./pages/Links'));

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
import { useCookieConsentGA4 } from '@/hooks/useCookieConsentGA4';
import { usePageTracking } from '@/hooks/usePageTracking';

// Helper component to initialize hooks within the router context
function AnalyticsTracker() {
  useCookieConsentGA4();
  usePageTracking();
  return null;
}

// Componente auxiliar para rotas com Layout
const WithLayout = ({ children }) => <Layout>{children}</Layout>;

function App() {
  return (
    <ErrorBoundary>
      <CookieConsentProvider>
        <LanguageProvider>
          <ThemeProvider defaultTheme="dark" switchable={true}>
            <TooltipProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AnalyticsTracker />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Rota sem Layout (Link in Bio) */}
                    <Route path="/links" element={<Links />} />
                    
                    {/* Rotas normais (Com Header/Footer) */}
                    <Route path="/" element={<WithLayout><Home /></WithLayout>} />
                    <Route path="/blog" element={<WithLayout><Blog /></WithLayout>} />
                    <Route path="/artigo/:id" element={<WithLayout><Article /></WithLayout>} />
                    <Route path="/sobre" element={
                      <WithLayout>
                        <div className="container" style={{ marginTop: '2rem' }}>
                          <SEO title="O Mentor" description="Conheça a jornada de Caio Dagaz, arquiteto SAP e mentor." url="/sobre" />
                          <h1>O Mentor</h1>
                          <p>Em construção...</p>
                        </div>
                      </WithLayout>
                    } />
                    <Route path="/contato" element={<WithLayout><Contact /></WithLayout>} />
                    <Route path="/privacidade" element={<WithLayout><PrivacyPolicy /></WithLayout>} />
                    <Route path="/termos" element={<WithLayout><TermsOfService /></WithLayout>} />
                    <Route path="*" element={
                      <WithLayout>
                        <div className="container" style={{ marginTop: '2rem' }}>
                          <SEO title="404 - Não Encontrado" description="Página não encontrada no portal Dagaz.Dev." />
                          <h1>404 - Fora do mapa, guerreiro!</h1>
                        </div>
                      </WithLayout>
                    } />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <WhatsAppButton />
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
