import React, { useEffect, useState } from 'react';
import { useLanguageTransition } from '@/hooks/useLanguageTransition';

interface LanguageTransitionWrapperProps {
  children: React.ReactNode;
  animationType?: 'fade' | 'scale' | 'fade-slide';
}

/**
 * Componente wrapper que aplica animações de transição ao mudar de idioma.
 * Envolve o conteúdo que deve ser animado durante a mudança de idioma.
 */
export function LanguageTransitionWrapper({
  children,
  animationType = 'fade-slide',
}: LanguageTransitionWrapperProps) {
  const { isTransitioning } = useLanguageTransition();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isTransitioning) {
      // Aplicar classe de saída
      if (animationType === 'fade') {
        setAnimationClass('language-transitioning');
      } else if (animationType === 'scale') {
        setAnimationClass('language-scale-transitioning');
      } else {
        setAnimationClass('language-transitioning');
      }
    } else {
      // Aplicar classe de entrada
      if (animationType === 'fade') {
        setAnimationClass('language-entering');
      } else if (animationType === 'scale') {
        setAnimationClass('language-scale-entering');
      } else {
        setAnimationClass('language-entering');
      }
    }
  }, [isTransitioning, animationType]);

  return (
    <div className={animationClass}>
      {children}
    </div>
  );
}
