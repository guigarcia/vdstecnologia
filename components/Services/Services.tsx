'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Brain, Zap, Rocket } from 'lucide-react';
import Card from '../Card/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { services } from '@/lib/constants';
import styles from './Services.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Zap,
  Rocket,
};

export default function Services() {
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
    <section id="servicos" ref={sectionRef} className={styles.services}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.command}>ls services/</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('services.title')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('services.subtitle')}
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.key}
                variant="glass"
                className={`${styles.serviceCard} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.iconWrapper}>
                  {Icon && <Icon className={styles.icon} />}
                </div>
                <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                <p className={styles.serviceDescription}>{t(`services.${service.key}.description`)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

