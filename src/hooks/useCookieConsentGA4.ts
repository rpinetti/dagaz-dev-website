import { useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import ReactGA from 'react-ga4';

/**
 * Hook para integrar consentimento de cookies com Google Analytics 4
 * Controla se GA4 deve rastrear baseado no consentimento do usuário
 */
export function useCookieConsentGA4() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    // Listener para mudanças de consentimento
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newConsent = customEvent.detail;

      if (newConsent.analytics) {
        // Ativar GA4
        ReactGA.initialize(import.meta.env.VITE_GA4_ID || 'G-XXXXXXXXXX', {
          gtagOptions: {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          },
        });
      } else {
        // Desativar GA4 - remover cookies
        disableGA4();
      }
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange);
    return () => window.removeEventListener('cookieConsentChanged', handleConsentChange);
  }, []);

  // Desativar GA4 quando consentimento muda
  useEffect(() => {
    if (!consent.analytics) {
      disableGA4();
    }
  }, [consent.analytics]);
}

/**
 * Desativar Google Analytics 4
 * Remove cookies e para rastreamento
 */
function disableGA4() {
  // Remover cookies do GA4
  const cookieNames = ['_ga', '_gat', '_gid', '_ga_*'];
  cookieNames.forEach((name) => {
    const regex = new RegExp(`^${name.replace('*', '.*')}$`);
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      if (regex.test(cookieName)) {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
      }
    });
  });

  // Desabilitar GA4
  const gaDisableKey = 'ga-disable-' + (import.meta.env.VITE_GA4_ID || 'G-XXXXXXXXXX');
  (window as any)[gaDisableKey] = true;
}

export default useCookieConsentGA4;
