import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-cyan-200/25 text-cyan-100 hover:bg-cyan-300/10"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-xs uppercase font-code tracking-[0.12em]">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-[#06101b] border-white/10">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer font-code text-xs uppercase tracking-[0.12em] ${
              language === lang.code
                ? 'bg-cyan-300/20 text-cyan-100'
                : 'text-slate-300 hover:text-cyan-100'
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
