import { Clock } from 'lucide-react';

/**
 * Componente de Medidor de Tempo de Leitura
 * Filosofia visual: Runic Cyber-Forge
 * - Calcula tempo de leitura baseado no número de palavras
 * - Exibe ícone de relógio com tempo estimado
 * - Suporta múltiplos idiomas
 * - Design responsivo
 */

interface ReadingTimeProps {
  text?: string;
  minutes?: number;
  wordsPerMinute?: number;
  showIcon?: boolean;
  className?: string;
}

/**
 * Calcula o tempo de leitura estimado baseado no número de palavras
 * Usa média de 200 palavras por minuto (padrão de leitura)
 */
function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Formata o tempo de leitura em string legível
 */
function formatReadingTime(minutes: number, language: string = 'pt'): string {
  if (minutes < 1) {
    switch (language) {
      case 'en':
        return 'Less than 1 min';
      case 'es':
        return 'Menos de 1 min';
      default:
        return 'Menos de 1 min';
    }
  }

  if (minutes === 1) {
    switch (language) {
      case 'en':
        return '1 min read';
      case 'es':
        return '1 min de lectura';
      default:
        return '1 min de leitura';
    }
  }

  switch (language) {
    case 'en':
      return `${minutes} min read`;
    case 'es':
      return `${minutes} min de lectura`;
    default:
      return `${minutes} min de leitura`;
  }
}

export function ReadingTime({
  text,
  minutes,
  wordsPerMinute = 200,
  showIcon = true,
  className = '',
}: ReadingTimeProps) {
  const readingTimeMinutes = minutes !== undefined 
    ? minutes 
    : (text ? calculateReadingTime(text, wordsPerMinute) : 0);
    
  const language = document.documentElement.lang || 'pt';
  const formattedTime = formatReadingTime(readingTimeMinutes, language);

  return (
    <div className={`flex items-center gap-2 text-sm text-slate-400 ${className}`}>
      {showIcon && <Clock className="h-4 w-4 text-[#D4AF37]" />}
      <span className="font-code text-[11px] uppercase tracking-[0.18em]">
        {formattedTime}
      </span>
    </div>
  );
}

export { calculateReadingTime, formatReadingTime };
