'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LogoCloud.module.css';

interface Logo {
  src?: string;
  alt: string;
  name: string;
  description?: string;
  type?: 'custom';
  text?: string;
  snowflakeLogo?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  columns?: number;
  className?: string;
}

export default function LogoCloud({
  logos,
  columns = 3,
  className = '',
}: LogoCloudProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const getDescription = (logo: Logo): string => {
    if (!logo.description) return '';
    // Map descriptions to translation keys
    const keyMap: Record<string, string> = {
      'Experiência completa em soluções AWS': 'partners.aws.description',
      'Especialistas em infraestrutura Azure': 'partners.azure.description',
      'Soluções escaláveis na Google Cloud': 'partners.gcp.description',
      'Super experiência em Snowflake para análise de dados': 'partners.snowflake.description',
      'Especialização em Cortex AI e machine learning': 'partners.cortex.description',
    };
    const translationKey = keyMap[logo.description];
    return translationKey ? t(translationKey) : logo.description;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.logoCloud} ${className}`}
      style={{ '--columns': columns } as React.CSSProperties}
    >
      {logos.map((logo, index) => (
        <div
          key={logo.name}
          className={`${styles.logoItem} ${isVisible ? styles.visible : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={styles.logoWrapper}>
            {logo.type === 'custom' ? (
              <div className={styles.customLogo}>
                <span className={styles.customText}>{logo.text}</span>
                {logo.snowflakeLogo && (
                  <Image
                    src={logo.snowflakeLogo}
                    alt="Snowflake"
                    width={24}
                    height={24}
                    className={styles.snowflakeIcon}
                  />
                )}
              </div>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logoImage}
              />
            )}
          </div>
          {logo.description && (
            <p className={styles.logoDescription}>{getDescription(logo)}</p>
          )}
        </div>
      ))}
    </div>
  );
}

