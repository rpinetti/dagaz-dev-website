import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente utilitário para forçar o scroll para o topo da página
 * sempre que houver uma mudança de rota (pathname).
 * Resolve o problema de navegação em SPAs onde a posição do scroll é mantida.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
