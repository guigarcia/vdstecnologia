'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, Code, CheckCircle, Cloud } from 'lucide-react';
import Card from '../Card/Card';
import ScanLines from '../ScanLines/ScanLines';
import { useLanguage } from '@/contexts/LanguageContext';
import { processSteps } from '@/lib/constants';
import styles from './Process.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Code,
  CheckCircle,
  Cloud,
};

export default function Process() {
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
    <section id="processo" ref={sectionRef} className={styles.process}>
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('process.title')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('process.subtitle')}
          </p>
        </div>

        <div className={styles.timeline}>
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <div
                key={step.key}
                className={`${styles.timelineItem} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.markerNumber}>{index + 1}</div>
                  {Icon && <Icon className={styles.markerIcon} />}
                </div>
                <Card variant="glass" className={styles.stepCard}>
                  <h3 className={styles.stepTitle}>{t(`process.${step.key}.title`)}</h3>
                  <p className={styles.stepDescription}>{t(`process.${step.key}.description`)}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

