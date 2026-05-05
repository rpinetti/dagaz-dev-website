import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackWhatsAppClick, trackWhatsAppBalloonView } from '@/services/analytics';

/**
 * Componente de botão flutuante do WhatsApp
 * Filosofia visual: Runic Cyber-Forge
 * - Botão flutuante fixo no canto inferior direito
 * - Menu com mensagens pré-definidas
 * - Balão de notificação animado com boas-vindas
 * - Suporte completo a i18n (PT, EN, ES)
 * - Animações suaves
 * - Responsivo para mobile e desktop
 */

interface WhatsAppMessage {
  id: string;
  label: string;
  text: string;
}

interface WhatsAppButtonProps {
  phoneNumber?: string;
  messages?: WhatsAppMessage[];
  companyName?: string;
  showBalloonOnLoad?: boolean;
  balloonTimeout?: number;
}

const DEFAULT_MESSAGES: WhatsAppMessage[] = [
  {
    id: 'greeting',
    label: 'Olá! Gostaria de saber mais sobre os serviços.',
    text: 'Olá! Gostaria de saber mais sobre os serviços da Dagaz Dev.',
  },
  {
    id: 'consultation',
    label: 'Solicitar uma consultoria gratuita',
    text: 'Gostaria de agendar uma consultoria gratuita para discutir meu projeto SAP.',
  },
  {
    id: 'demo',
    label: 'Agendar uma demonstração',
    text: 'Tenho interesse em agendar uma demonstração dos seus serviços.',
  },
];

export function WhatsAppButton({
  phoneNumber = '5511999999999',
  messages = DEFAULT_MESSAGES,
  companyName = 'Dagaz Dev',
  showBalloonOnLoad = true,
  balloonTimeout = 10000,
}: WhatsAppButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showBalloon, setShowBalloon] = useState(showBalloonOnLoad);
  const [balloonDismissed, setBalloonDismissed] = useState(false);

  // Rastrear visualização do balão
  useEffect(() => {
    if (showBalloon && !balloonDismissed) {
      trackWhatsAppBalloonView();
    }
  }, [showBalloon, balloonDismissed]);

  // Esconder balão após timeout ou quando o menu abrir
  useEffect(() => {
    if (isOpen) {
      setShowBalloon(false);
    }
  }, [isOpen]);

  // Esconder balão após o tempo especificado
  useEffect(() => {
    if (!balloonDismissed && showBalloon) {
      const timer = setTimeout(() => {
        setShowBalloon(false);
      }, balloonTimeout);
      return () => clearTimeout(timer);
    }
  }, [balloonDismissed, showBalloon, balloonTimeout]);

  const handleDismissBalloon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBalloon(false);
    setBalloonDismissed(true);
  };

  const handleSendMessage = (message: string) => {
    // Rastrear clique em WhatsApp
    trackWhatsAppClick();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleQuickMessage = () => {
    const message = `Olá! Gostaria de conversar sobre a transformação digital da minha empresa.`;
    handleSendMessage(message);
  };

  return (
    <>
      {/* Balão de notificação com boas-vindas */}
      {showBalloon && !balloonDismissed && (
        <div className="fixed bottom-32 right-4 z-40 sm:right-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="relative">
            {/* Balão principal */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs animate-bounce">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-heading text-sm font-bold text-[#0A2E5C]">
                    {t('whatsapp.balloon.greeting')}
                  </p>
                  <p className="font-lato text-xs text-gray-600 mt-2 leading-relaxed">
                    {t('whatsapp.balloon.message')}
                  </p>
                </div>
                <button
                  onClick={handleDismissBalloon}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Fechar notificação"
                  title="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Seta apontando para o botão */}
            <div className="absolute bottom-0 right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Menu de mensagens */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-40 sm:right-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 max-w-xs">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A2E5C] to-[#00D9FF] px-4 py-3">
              <p className="font-heading text-sm font-bold text-white">
                {t('whatsapp.menu.greeting')}
              </p>
              <p className="font-code text-xs text-cyan-100 mt-1">
                {t('whatsapp.menu.question')}
              </p>
            </div>

            {/* Mensagens rápidas */}
            <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSendMessage(msg.text)}
                  className="w-full text-left p-3 rounded border border-gray-200 hover:border-[#00D9FF] hover:bg-cyan-50 transition text-sm text-gray-700 hover:text-[#0A2E5C] font-lato"
                >
                  {msg.label}
                </button>
              ))}
            </div>

            {/* Rodapé */}
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
              <p className="font-code text-[10px] text-gray-500 text-center">
                {t('whatsapp.menu.footer')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botão flutuante principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group relative ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-[#25D366] hover:bg-[#20BA5A] hover:scale-110'
        }`}
        title={isOpen ? 'Fechar' : 'Enviar mensagem via WhatsApp'}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir WhatsApp'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            {/* Pulsação de animação */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-pulse" />
            {/* Badge de notificação */}
            {showBalloon && !balloonDismissed && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse border border-white" />
            )}
          </>
        )}
      </button>

      {/* Overlay para fechar menu */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30"
          aria-label="Fechar menu"
        />
      )}
    </>
  );
}
