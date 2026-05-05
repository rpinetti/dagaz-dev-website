import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

/**
 * Banner de Consentimento de Cookies
 * Conforme LGPD (Lei Geral de Proteção de Dados)
 * Filosofia visual: Runic Cyber-Forge
 * - Design elegante e não invasivo
 * - Opções claras de aceitar/rejeitar
 * - Detalhes sobre cada tipo de cookie
 * - Animações suaves
 */
export function CookieConsentBanner() {
  const { t } = useTranslation();
  const { showBanner, setShowBanner, acceptAll, rejectAll, consent, updateConsent } =
    useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0A2E5C] to-[#1A3A6E] rounded-xl shadow-2xl border border-[#00D9FF]/20 p-6 sm:p-8">
            {/* Cabeçalho */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                  🍪 {t('cookies.banner.title')}
                </h3>
                <p className="font-lato text-sm text-cyan-100 leading-relaxed">
                  {t('cookies.banner.description')}
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 text-cyan-300 hover:text-white transition ml-4"
                aria-label="Fechar"
                title="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Detalhes (Expansível) */}
            {showDetails && (
              <div className="mb-6 p-4 bg-black/20 rounded-lg border border-[#00D9FF]/10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-4">
                  {/* Cookies Necessários */}
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#D4AF37] mb-2">
                      ✓ {t('cookies.types.necessary')}
                    </h4>
                    <p className="font-lato text-xs text-cyan-100">
                      {t('cookies.descriptions.necessary')}
                    </p>
                  </div>

                  {/* Cookies de Analytics */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={consent.analytics}
                        onChange={(e) => updateConsent({ analytics: e.target.checked })}
                        className="w-4 h-4 rounded border-[#00D9FF] bg-black/40 cursor-pointer"
                      />
                      <div className="flex-1">
                        <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                          {t('cookies.types.analytics')}
                        </h4>
                        <p className="font-lato text-xs text-cyan-100">
                          {t('cookies.descriptions.analytics')}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Cookies de Marketing */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={consent.marketing}
                        onChange={(e) => updateConsent({ marketing: e.target.checked })}
                        className="w-4 h-4 rounded border-[#00D9FF] bg-black/40 cursor-pointer"
                      />
                      <div className="flex-1">
                        <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                          {t('cookies.types.marketing')}
                        </h4>
                        <p className="font-lato text-xs text-cyan-100">
                          {t('cookies.descriptions.marketing')}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Cookies de Preferências */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={consent.preferences}
                        onChange={(e) => updateConsent({ preferences: e.target.checked })}
                        className="w-4 h-4 rounded border-[#00D9FF] bg-black/40 cursor-pointer"
                      />
                      <div className="flex-1">
                        <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                          {t('cookies.types.preferences')}
                        </h4>
                        <p className="font-lato text-xs text-cyan-100">
                          {t('cookies.descriptions.preferences')}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Link para Política de Privacidade */}
                <div className="mt-4 pt-4 border-t border-[#00D9FF]/10">
                  <a
                    href="/privacy"
                    className="font-lato text-xs text-[#00D9FF] hover:text-[#D4AF37] transition inline-flex items-center gap-1"
                  >
                    {t('cookies.banner.privacyPolicy')} →
                  </a>
                </div>
              </div>
            )}

            {/* Botão de Expandir Detalhes */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mb-4 flex items-center gap-2 text-cyan-300 hover:text-[#D4AF37] transition font-lato text-xs font-semibold"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
              />
              {showDetails ? t('cookies.banner.hideDetails') : t('cookies.banner.showDetails')}
            </button>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={rejectAll}
                variant="outline"
                className="flex-1 font-heading font-semibold border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 hover:text-[#D4AF37]"
              >
                {t('cookies.banner.rejectAll')}
              </Button>

              <Button
                onClick={acceptAll}
                className="flex-1 font-heading font-semibold bg-gradient-to-r from-[#00D9FF] to-[#D4AF37] text-[#0A2E5C] hover:shadow-lg hover:shadow-[#00D9FF]/50 transition"
              >
                {t('cookies.banner.acceptAll')}
              </Button>
            </div>

            {/* Texto Legal */}
            <p className="font-code text-[10px] text-cyan-200/60 mt-4 text-center">
              {t('cookies.banner.legalText')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookieConsentBanner;
