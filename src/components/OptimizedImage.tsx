import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Componente de imagem otimizado para performance.
 * Implementa lazy loading por padrão e permite futuras integrações 
 * com serviços de otimização de imagem ou formatos modernos (WebP).
 */
export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props 
}: OptimizedImageProps & { fetchPriority?: 'high' | 'low' | 'auto' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-300`}
      loading={loading}
      fetchpriority={fetchPriority as any}
      decoding="async"
      {...props}
      onLoad={(e) => {
        (e.target as HTMLImageElement).classList.add('opacity-100');
      }}
    />
  );
}
