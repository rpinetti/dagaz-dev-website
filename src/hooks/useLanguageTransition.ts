import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook que gerencia animações de transição ao trocar de idioma.
 * Retorna um estado que indica se está em transição e o idioma atual.
 */
export function useLanguageTransition() {
  const { i18n } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      // Inicia a transição
      setIsTransitioning(true);

      // Aguarda um pequeno delay para criar efeito visual
      const timer = setTimeout(() => {
        setCurrentLanguage(lng);
        setIsTransitioning(false);
      }, 300); // Duração da animação fade-out

      return () => clearTimeout(timer);
    };

    // Listener para mudanças de idioma
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return { isTransitioning, currentLanguage };
}
