import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Carousel.module.css';

const Carousel = ({ children, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.carouselWrapper}>
      {title && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.controls}>
            <button className={styles.navButton} onClick={scrollPrev} aria-label="Anterior">
              &larr;
            </button>
            <button className={styles.navButton} onClick={scrollNext} aria-label="Próximo">
              &rarr;
            </button>
          </div>
        </div>
      )}
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {/* Mapeando os children para garantir que cada um esteja dentro de um slide */}
          {React.Children.map(children, (child, index) => (
            <div className={styles.slide} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
