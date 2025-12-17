'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Database, Sparkles } from 'lucide-react';
import LogoCloud from '../LogoCloud/LogoCloud';
import ScanLines from '../ScanLines/ScanLines';
import { useLanguage } from '@/contexts/LanguageContext';
import { partners } from '@/lib/constants';
import styles from './About.module.css';

export default function About() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
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

  useEffect(() => {
    if (!isVisible) return;

    const fullText = t('about.title');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [isVisible, t]);

  const allPartners = [
    ...partners.clouds,
    ...partners.specialties,
  ];

  return (
    <section id="sobre" ref={sectionRef} className={styles.about}>
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <span className={styles.terminalPath}>~/vds-tech/about.ts</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>
              {displayedText}
              {showCursor && <span className={styles.cursor}>|</span>}
            </span>
          </h2>
          <div className={styles.commandLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.command}>init</span>
            <span className={styles.args}>--mode=production</span>
            <span className={styles.status}>✓</span>
          </div>
          <p className={styles.subtitle}>
            {t('about.subtitle')}
          </p>
        </div>

        <div className={styles.content}>
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

