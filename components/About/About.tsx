'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Database, Sparkles } from 'lucide-react';
import LogoCloud from '../LogoCloud/LogoCloud';
import { useLanguage } from '@/contexts/LanguageContext';
import { partners } from '@/lib/constants';
import styles from './About.module.css';

export default function About() {
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

  const allPartners = [
    ...partners.clouds,
    ...partners.specialties,
  ];

  return (
    <section id="sobre" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.command}>cat about.txt</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('about.title')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('about.subtitle')}
          </p>
          <div className={styles.valueAnchor}>
            <span className={styles.anchorIcon}>→</span>
            <p className={styles.anchorText}>
              {t('about.value.anchor')}
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={`${styles.expertiseHeader} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.expertiseTitle}>Nossa Expertise</h3>
          </div>
          
          <div className={`${styles.textContent} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Cloud className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>{t('about.feature1.title')}</h3>
                <p className={styles.featureDescription}>
                  {t('about.feature1.description')}
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Database className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>{t('about.feature2.title')}</h3>
                <p className={styles.featureDescription}>
                  {t('about.feature2.description')}
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Sparkles className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>{t('about.feature3.title')}</h3>
                <p className={styles.featureDescription}>
                  {t('about.feature3.description')}
                </p>
              </div>
            </div>
          </div>

          <div className={`${styles.logosSection} ${isVisible ? styles.visible : ''}`}>
            <LogoCloud logos={allPartners} columns={3} className={styles.customLogoCloud} />
          </div>
        </div>
      </div>
    </section>
  );
}

