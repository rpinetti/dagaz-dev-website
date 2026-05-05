import { Facebook, Linkedin, Instagram, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Componente de Botões de Compartilhamento Social
 * Filosofia visual: Runic Cyber-Forge
 * - Compartilhamento para Facebook, LinkedIn, Instagram
 * - Copiar link para clipboard
 * - Animações suaves
 * - Design responsivo
 * - Suporte a múltiplos idiomas
 */

interface ShareButtonsProps {
  title: string;
  url: string;
  text?: string;
  showLabels?: boolean;
  className?: string;
}

export function ShareButtons({
  title,
  url,
  text = '',
  showLabels = true,
  className = '',
}: ShareButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const handleInstagramShare = () => {
    // Instagram não suporta compartilhamento direto via URL
    // Abrimos a página do Instagram com instruções
    const instagramUrl = `https://www.instagram.com/`;
    window.open(instagramUrl, '_blank');
  };

  const shareButtons = [
    {
      id: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50',
      onClick: handleFacebookShare,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:text-blue-700',
      bgColor: 'hover:bg-blue-50',
      onClick: handleLinkedInShare,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      color: 'hover:text-pink-600',
      bgColor: 'hover:bg-pink-50',
      onClick: handleInstagramShare,
    },
    {
      id: 'copy',
      label: copied ? 'Copiado!' : 'Copiar link',
      icon: copied ? Check : Link2,
      color: copied ? 'text-green-600' : 'hover:text-slate-600',
      bgColor: copied ? 'bg-green-50' : 'hover:bg-slate-50',
      onClick: handleCopyLink,
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-code text-xs uppercase tracking-[0.18em] text-slate-400">
        {t('blog.share') || 'Compartilhar'}
      </span>
      <div className="flex items-center gap-2">
        {shareButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.id}
              onClick={button.onClick}
              className={`p-2 rounded-lg border border-slate-200 transition ${button.bgColor} ${button.color}`}
              title={button.label}
              aria-label={button.label}
            >
              <Icon className="h-4 w-4" />
              {showLabels && (
                <span className="ml-2 text-xs font-code uppercase tracking-[0.1em]">
                  {button.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Versão compacta dos botões de compartilhamento (apenas ícones)
 */
export function ShareButtonsCompact({
  title,
  url,
  text = '',
  className = '',
}: ShareButtonsProps) {
  return <ShareButtons title={title} url={url} text={text} showLabels={false} className={className} />;
}
