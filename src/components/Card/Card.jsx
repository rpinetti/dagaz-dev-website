import React from 'react';
import styles from './Card.module.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  icon,
  className = '',
  onClick
}) => {
  return (
    <div className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`} onClick={onClick}>
      {(title || subtitle || icon) && (
        <div className={styles.header}>
          {icon && (
            <div className={styles.iconWrapper}>
              <img src={icon} alt={title || "Ícone do pilar"} className={styles.icon} />
            </div>
          )}
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
        </div>
      )}
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default Card;
