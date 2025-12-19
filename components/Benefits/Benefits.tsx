'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Zap, Lightbulb, Award, TrendingUp, CheckCircle, Shield } from 'lucide-react';
import Card from '../Card/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { benefits } from '@/lib/constants';
import styles from './Benefits.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Lightbulb,
  Award,
  TrendingUp,
  CheckCircle,
  Shield,
};

export default function Benefits() {
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
    <section id="beneficios" ref={sectionRef} className={styles.benefits}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.command}>cat benefits.txt</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('benefits.title')}</span>
            <span className={styles.fullName}>{t('benefits.fullname')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <Card
                key={benefit.key}
                variant="glass"
                className={`${styles.benefitCard} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.iconWrapper}>
                  {Icon && <Icon className={styles.icon} />}
                </div>
                <h3 className={styles.benefitTitle}>{t(`benefits.${benefit.key}.title`)}</h3>
                <p className={styles.benefitDescription}>{t(`benefits.${benefit.key}.description`)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

