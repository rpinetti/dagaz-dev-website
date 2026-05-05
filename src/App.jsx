import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

function App() {
  return (
    <ErrorBoundary>
      <CookieConsentProvider>
        <LanguageProvider>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/artigo/:id" element={<Article />} />
                    <Route path="/sobre" element={<div className="container" style={{marginTop: '2rem'}}><h1>O Mentor</h1><p>Em construção...</p></div>} />
                    <Route path="/contato" element={<div className="container" style={{marginTop: '2rem'}}><h1>Contato</h1><p>Em construção...</p></div>} />
                    <Route path="/privacidade" element={<PrivacyPolicy />} />
                    <Route path="/termos" element={<TermsOfService />} />
                    <Route path="*" element={<div className="container" style={{marginTop: '2rem'}}><h1>404 - Fora do mapa, guerreiro!</h1></div>} />
                  </Routes>
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
