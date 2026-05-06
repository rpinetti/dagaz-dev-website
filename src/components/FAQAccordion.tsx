import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

/**
 * Componente de FAQ com acordeão interativo
 * Filosofia visual: Runic Cyber-Forge
 * - Acordeão suave com animações
 * - Suporte a múltiplos idiomas
 * - Design responsivo
 */
export function FAQAccordion({ items, title, subtitle }: FAQAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {title && (
        <div className="mb-10">
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      <Accordion type="single" collapsible className="w-full space-y-3">
        {(items || []).map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border border-border bg-card/50 transition hover:border-primary/30 hover:bg-card"
          >
            <AccordionTrigger
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="px-6 py-4 hover:no-underline group"
            >
              <div className="flex items-start gap-4 text-left">
                <div className="flex-1">
                  {item.category && (
                    <p className="font-code text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                      {item.category}
                    </p>
                  )}
                  <p className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition">
                    {item.question}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-cyan-300 flex-shrink-0 transition-transform duration-300 ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0">
              <div className="border-t border-border pt-4">
                <p className="text-base leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {items.length === 0 && (
        <div className="border border-dashed border-slate-500 rounded p-8 text-center">
          <p className="text-slate-400">Nenhuma pergunta frequente disponível no momento.</p>
        </div>
      )}
    </div>
  );
}
