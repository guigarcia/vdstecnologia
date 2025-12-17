'use client';

import React, { useEffect, useRef, useState } from 'react';
import LogoCloud from '../LogoCloud/LogoCloud';
import ScanLines from '../ScanLines/ScanLines';
import { useLanguage } from '@/contexts/LanguageContext';
import { partners } from '@/lib/constants';
import styles from './Partners.module.css';

export default function Partners() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="parceiros" ref={sectionRef} className={styles.partners}>
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('partners.title')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('partners.subtitle')}
          </p>
        </div>

        <div className={styles.sections}>
          <div className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>{t('partners.clouds.title')}</h3>
            <p className={styles.sectionDescription}>
              {t('partners.clouds.description')}
            </p>
            <LogoCloud logos={partners.clouds} columns={3} />
          </div>

          <div className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>{t('partners.specialties.title')}</h3>
            <p className={styles.sectionDescription}>
              {t('partners.specialties.description')}
            </p>
            <LogoCloud logos={partners.specialties} columns={2} />
          </div>

        </div>
      </div>
    </section>
  );
}

