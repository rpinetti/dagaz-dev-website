import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/services/analytics';

/**
 * Hook para rastrear visualizações de página automaticamente
 * Deve ser usado no componente raiz (App.tsx)
 */
export const usePageTracking = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Rastrear visualização de página quando a rota muda
    trackPageView(location, document.title);

    // Scroll para o topo da página
    window.scrollTo(0, 0);
  }, [location]);
};

export default usePageTracking;
