import React from 'react';
import styles from './Marquee.module.css';

const Marquee = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        {/* Renderiza a lista duas vezes para garantir o efeito infinito contínuo */}
        {items.map((item, index) => (
          <span key={`original-${index}`} className={styles.marqueeItem}>
            {item}
            <span className={styles.separator}>•</span>
          </span>
        ))}
        {items.map((item, index) => (
          <span key={`clone-${index}`} className={styles.marqueeItem}>
            {item}
            <span className={styles.separator}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
