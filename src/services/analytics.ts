import ReactGA from 'react-ga4';

/**
 * Serviço de Analytics - Google Analytics 4
 * Rastreia eventos, páginas e conversões do site Dagaz Dev
 */

// ID de medição do Google Analytics 4
// Substitua por seu ID real do GA4
const GA4_ID = import.meta.env.VITE_GA4_ID || 'G-XXXXXXXXXX';

/**
 * Inicializar Google Analytics 4
 * Deve ser chamado uma única vez no App.tsx
 */
export const initializeGA4 = () => {
  if (GA4_ID && GA4_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA4_ID, {
      gtagOptions: {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
      },
    });
  }
};

/**
 * Rastrear visualização de página
 * Chamado automaticamente pelo router
 */
export const trackPageView = (path: string, title?: string) => {
  if (GA4_ID && GA4_ID !== 'G-XXXXXXXXXX') {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
  }
};

/**
 * Rastrear evento customizado
 * @param category - Categoria do evento (ex: "engagement", "conversion")
 * @param action - Ação do evento (ex: "click", "submit")
 * @param label - Rótulo do evento (ex: "contact_form", "blog_post")
 * @param value - Valor numérico (opcional)
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (GA4_ID && GA4_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

/**
 * Rastrear clique em botão
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('engagement', 'button_click', `${buttonName}${location ? ` - ${location}` : ''}`);
};

/**
 * Rastrear envio de formulário
 */
export const trackFormSubmit = (formName: string, status: 'success' | 'error') => {
  trackEvent('conversion', 'form_submit', `${formName} - ${status}`);
};

/**
 * Rastrear clique em link externo
 */
export const trackExternalLink = (url: string, label?: string) => {
  trackEvent('engagement', 'external_link_click', label || url);
};

/**
 * Rastrear clique em link de compartilhamento social
 */
export const trackSocialShare = (platform: string, postTitle?: string) => {
  trackEvent('engagement', 'social_share', `${platform}${postTitle ? ` - ${postTitle}` : ''}`);
};

/**
 * Rastrear visualização de post do blog
 */
export const trackBlogPostView = (postTitle: string, author: string, category: string) => {
  trackEvent('content', 'blog_post_view', `${postTitle} by ${author}`, undefined);
  trackEvent('content', 'blog_category_view', category);
};

/**
 * Rastrear tempo gasto em página
 */
export const trackTimeOnPage = (pageName: string, timeInSeconds: number) => {
  trackEvent('engagement', 'time_on_page', pageName, Math.round(timeInSeconds));
};

/**
 * Rastrear mudança de idioma
 */
export const trackLanguageChange = (fromLanguage: string, toLanguage: string) => {
  trackEvent('engagement', 'language_change', `${fromLanguage} → ${toLanguage}`);
};

/**
 * Rastrear abertura de menu mobile
 */
export const trackMobileMenuOpen = () => {
  trackEvent('engagement', 'mobile_menu_open', 'navigation');
};

/**
 * Rastrear clique em busca
 */
export const trackSearchClick = () => {
  trackEvent('engagement', 'search_click', 'global_search');
};

/**
 * Rastrear busca executada
 */
export const trackSearch = (query: string, resultsCount?: number) => {
  trackEvent('engagement', 'search_executed', query, resultsCount);
};

/**
 * Rastrear clique em WhatsApp
 */
export const trackWhatsAppClick = (messageType?: string) => {
  trackEvent('conversion', 'whatsapp_click', messageType || 'general');
};

/**
 * Rastrear abertura do balão de notificação WhatsApp
 */
export const trackWhatsAppBalloonView = () => {
  trackEvent('engagement', 'whatsapp_balloon_view', 'notification');
};

/**
 * Rastrear clique em FAQ
 */
export const trackFAQClick = (questionTitle: string) => {
  trackEvent('engagement', 'faq_click', questionTitle);
};

/**
 * Rastrear visualização de seção
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('engagement', 'section_view', sectionName);
};

/**
 * Rastrear clique em CTA (Call to Action)
 */
export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent('conversion', 'cta_click', `${ctaText} - ${location}`);
};

/**
 * Rastrear scroll até elemento
 */
export const trackScrollToElement = (elementName: string) => {
  trackEvent('engagement', 'scroll_to_element', elementName);
};

/**
 * Rastrear erro na aplicação
 */
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', errorType, errorMessage);
};

/**
 * Rastrear performance de página
 */
export const trackPagePerformance = (pageName: string, loadTimeMs: number) => {
  trackEvent('performance', 'page_load', pageName, Math.round(loadTimeMs));
};

/**
 * Rastrear clique em link de navegação
 */
export const trackNavigationClick = (linkName: string, destination: string) => {
  trackEvent('navigation', 'link_click', `${linkName} → ${destination}`);
};

/**
 * Rastrear visualização de modal/diálogo
 */
export const trackModalView = (modalName: string) => {
  trackEvent('engagement', 'modal_view', modalName);
};

/**
 * Rastrear fechamento de modal/diálogo
 */
export const trackModalClose = (modalName: string, action: 'close_button' | 'outside_click' | 'escape') => {
  trackEvent('engagement', 'modal_close', `${modalName} - ${action}`);
};

export default {
  initializeGA4,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackFormSubmit,
  trackExternalLink,
  trackSocialShare,
  trackBlogPostView,
  trackTimeOnPage,
  trackLanguageChange,
  trackMobileMenuOpen,
  trackSearchClick,
  trackSearch,
  trackWhatsAppClick,
  trackWhatsAppBalloonView,
  trackFAQClick,
  trackSectionView,
  trackCTAClick,
  trackScrollToElement,
  trackError,
  trackPagePerformance,
  trackNavigationClick,
  trackModalView,
  trackModalClose,
};
