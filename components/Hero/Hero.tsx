'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '../Button/Button';
import ParticleSystem from '../ParticleSystem/ParticleSystem';
import GlitchEffect from '../GlitchEffect/GlitchEffect';
import ScanLines from '../ScanLines/ScanLines';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLanguage();
  const handleContactClick = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <ScanLines />
      <ParticleSystem />
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            <GlitchEffect intensity="medium">
              <span className={styles.titleGradient}>
                {t('hero.title.main')}
                <br />
                {t('hero.title.sub')}
              </span>
            </GlitchEffect>
            <span className={styles.titleSubtext}>
              {t('hero.subtitle.main')}
            </span>
          </h1>
          <p className={styles.subtitle}>
            {t('hero.description')}
          </p>
          <div className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleContactClick}
              className={styles.ctaButton}
            >
              {t('hero.cta')}
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
}

