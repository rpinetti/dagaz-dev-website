import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Contexto de Consentimento de Cookies
 * Gerencia consentimento do usuário para rastreamento e cookies
 * Conforme LGPD (Lei Geral de Proteção de Dados)
 */

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  necessary: boolean; // Sempre true, necessários para funcionamento
}

interface CookieConsentContextType {
  consent: CookieConsent;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  hasUserConsented: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'dagaz-cookie-consent';
const BANNER_DISMISSED_KEY = 'dagaz-cookie-banner-dismissed';

/**
 * Provider de Consentimento de Cookies
 */
export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>({
    analytics: false,
    marketing: false,
    preferences: false,
    necessary: true,
  });
  const [showBanner, setShowBanner] = useState(false);
  const [hasUserConsented, setHasUserConsented] = useState(false);

  // Carregar consentimento do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);

    if (stored) {
      try {
        const parsedConsent = JSON.parse(stored);
        setConsent(parsedConsent);
        setHasUserConsented(true);
      } catch (error) {
        console.error('Erro ao carregar consentimento:', error);
        setShowBanner(true);
      }
    } else if (!bannerDismissed) {
      // Mostrar banner apenas se não foi dismissido antes
      setShowBanner(true);
    }
  }, []);

  // Salvar consentimento no localStorage
  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setConsent(newConsent);
    setHasUserConsented(true);
    setShowBanner(false);

    // Disparar evento customizado para notificar mudança de consentimento
    window.dispatchEvent(
      new CustomEvent('cookieConsentChanged', { detail: newConsent })
    );
  };

  const acceptAll = () => {
    const newConsent: CookieConsent = {
      analytics: true,
      marketing: true,
      preferences: true,
      necessary: true,
    };
    saveConsent(newConsent);
  };

  const rejectAll = () => {
    const newConsent: CookieConsent = {
      analytics: false,
      marketing: false,
      preferences: false,
      necessary: true,
    };
    saveConsent(newConsent);
  };

  const updateConsent = (updates: Partial<CookieConsent>) => {
    const newConsent = { ...consent, ...updates };
    saveConsent(newConsent);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner,
        setShowBanner,
        acceptAll,
        rejectAll,
        updateConsent,
        hasUserConsented,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

/**
 * Hook para usar contexto de consentimento de cookies
 */
export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent deve ser usado dentro de CookieConsentProvider');
  }
  return context;
}

export default CookieConsentContext;
